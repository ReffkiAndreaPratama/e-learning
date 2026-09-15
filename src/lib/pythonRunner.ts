export interface ExecutionResult {
  output: string
  error: boolean
  errorMessage?: string
}

const MAX_OUTPUT_LINES = 200
const MAX_LOOP_ITERATIONS = 1000

const BREAK = Symbol('break')
const CONTINUE = Symbol('continue')
class ReturnSignal { value: unknown; constructor(value: unknown) { this.value = value } }

let CURRENT_OUT: string[] = []

export function executePython(code: string): ExecutionResult {
  const out: string[] = []
  const vars: Record<string, unknown> = {}
  CURRENT_OUT = out

  try {
    const lines = code.replace(/\t/g, '  ').split('\n')
    execBlock(lines, 0, lines.length, vars, out)
    return { output: out.join('\n'), error: false }
  } catch (e) {
    if (e === BREAK || e === CONTINUE) {
      return { output: out.join('\n'), error: false }
    }
    return { output: out.join('\n'), error: true, errorMessage: e instanceof Error ? e.message : 'Terjadi error' }
  }
}

function indentOf(line: string): number { const m = line.match(/^ */); return m ? m[0].length : 0 }
function isBlank(line: string): boolean { return line.trim() === '' || line.trim().startsWith('#') }

function collectBody(lines: string[], headerIdx: number, headerIndent: number): [number, number] {
  let k = headerIdx + 1
  while (k < lines.length && (isBlank(lines[k]) || indentOf(lines[k]) > headerIndent)) k++
  return [headerIdx + 1, k]
}

function skipBlanks(lines: string[], i: number): number {
  while (i < lines.length && isBlank(lines[i])) i++
  return i
}

function execBlock(lines: string[], start: number, end: number, vars: Record<string, unknown>, out: string[]): void {
  let i = start
  while (i < end) {
    const ln = lines[i]
    if (isBlank(ln)) { i++; continue }
    i = execStatement(lines, i, end, vars, out)
  }
}

function execStatement(lines: string[], i: number, end: number, vars: Record<string, unknown>, out: string[]): number {
  const line = lines[i].trim()

  if (line === 'break') throw BREAK
  if (line === 'continue') throw CONTINUE
  const returnM = line.match(/^return\s*(.*)$/)
  if (returnM && line.startsWith('return')) {
    throw new ReturnSignal(returnM[1].trim() ? evalExpr(returnM[1].trim(), vars) : undefined)
  }

  const ind = indentOf(lines[i])

  const chain = tryParseIfChain(lines, i, ind, end)
  if (chain) {
    const chosen = chain.branches.find(b => b.kind === 'else' || evalCondition(b.cond!, vars))
    if (chosen) {
      execBlock(lines, chosen.bodyStart, chosen.bodyEnd, vars, out)
    }
    return chain.end
  }

  if (line.startsWith('for ')) {
    const m = line.match(/^for\s+(\w+)\s+in\s+(.+)\s*:$/)
    if (m) {
      const vname = m[1]
      const iterable = resolveIterable(m[2].trim(), vars)
      const [bStart, bEnd] = collectBody(lines, i, ind)
      let count = 0
      for (const item of iterable) {
        if (count++ > MAX_LOOP_ITERATIONS) throw new Error('Loop terlalu banyak iterasi')
        vars[vname] = item
        try {
          execBlock(lines, bStart, bEnd, vars, out)
        } catch (e) {
          if (e === BREAK) break
          if (e === CONTINUE) continue
          throw e
        }
        if (out.length > MAX_OUTPUT_LINES) break
      }
      return bEnd
    }
  }

  if (line.startsWith('while ')) {
    const m = line.match(/^while\s+(.+)\s*:$/)
    if (m) {
      const cond = m[1]
      const [bStart, bEnd] = collectBody(lines, i, ind)
      let count = 0
      while (evalCondition(cond, vars)) {
        if (count++ > MAX_LOOP_ITERATIONS) throw new Error('Infinite loop terdeteksi!')
        try {
          execBlock(lines, bStart, bEnd, vars, out)
        } catch (e) {
          if (e === BREAK) break
          if (e === CONTINUE) { continue }
          throw e
        }
        if (out.length > MAX_OUTPUT_LINES) break
      }
      return bEnd
    }
  }

  if (line.startsWith('def ')) {
    const m = line.match(/^def\s+(\w+)\s*\(\s*([^)]*)\s*\)\s*:$/)
    if (m) {
      const [bStart, bEnd] = collectBody(lines, i, ind)
      const bodyLines = lines.slice(bStart, bEnd)
      const minIndent = bodyLines
        .filter(l => !isBlank(l))
        .reduce((min, l) => Math.min(min, indentOf(l)), Infinity)
      const dedented = bodyLines.map(l => l.slice(minIndent))
      vars[m[1]] = { type: 'function', params: m[2].split(',').map(s => s.trim()).filter(Boolean), body: dedented }
      return bEnd
    }
  }

  execLine(line, vars, out)
  return i + 1
}

function tryParseIfChain(lines: string[], i: number, ind: number, _end: number): { branches: Array<{ kind: string; cond: string | null; bodyStart: number; bodyEnd: number }>; end: number } | null {
  const head = lines[i].trim()
  const headM = head.match(/^if\s+(.+)\s*:$/)
  if (!headM) return null
  const branches: Array<{ kind: string; cond: string | null; bodyStart: number; bodyEnd: number }> = []
  let k = i
  let isStart = true
  while (k < lines.length) {
    const cur = skipBlanks(lines, k)
    if (cur >= lines.length || indentOf(lines[cur]) !== ind) break
    const t = lines[cur].trim()
    if (isStart && t.match(/^if\s+.+\s*:$/)) {
      const m = t.match(/^if\s+(.+)\s*:$/)!
      const [bS, bE] = collectBody(lines, cur, ind)
      branches.push({ kind: 'if', cond: m[1], bodyStart: bS, bodyEnd: bE })
      k = bE
      isStart = false
      continue
    }
    const elifM = t.match(/^elif\s+(.+)\s*:$/)
    if (elifM && !isStart) {
      const [bS, bE] = collectBody(lines, cur, ind)
      branches.push({ kind: 'elif', cond: elifM[1], bodyStart: bS, bodyEnd: bE })
      k = bE
      continue
    }
    if (t.match(/^else\s*:$/) && !isStart) {
      const [bS, bE] = collectBody(lines, cur, ind)
      branches.push({ kind: 'else', cond: null, bodyStart: bS, bodyEnd: bE })
      k = bE
      break
    }
    break
  }
  if (!branches.length) return null
  return { branches, end: k }
}

function execLine(line: string, vars: Record<string, unknown>, out: string[]): void {
  if (!line || line.startsWith('#')) return

  const printM = balancedCall(line, 'print')
  if (printM) {
    out.push(evalPrintArgs(printM.args, vars))
    return
  }

  const itemAssignM = line.match(/^(\w+)\[(.+)\]\s*=\s*(.+)$/)
  if (itemAssignM) {
    const [, objName, keyExpr, valExpr] = itemAssignM
    const obj = vars[objName]
    const key = evalExpr(keyExpr, vars)
    const val = evalExpr(valExpr.trim(), vars)
    if (Array.isArray(obj)) obj[Number(key)] = val
    else if (obj && typeof obj === 'object') (obj as Record<string, unknown>)[String(key)] = val
    return
  }

  const assignM = line.match(/^(\w+)\s*=\s*(.+)$/)
  if (assignM) { vars[assignM[1]] = evalExpr(assignM[2].trim(), vars); return }

  const augM = line.match(/^(\w+)\s*([+\-*/%])\s*=\s*(.+)$/)
  if (augM) {
    const [, n, op, expr] = augM
    const val = evalExpr(expr.trim(), vars) as number
    const cur = vars[n] as number
    if (op === '+') vars[n] = cur + val
    else if (op === '-') vars[n] = cur - val
    else if (op === '*') vars[n] = cur * val
    else if (op === '/') vars[n] = cur / val
    else if (op === '%') vars[n] = cur % val
    else if (op === '**') vars[n] = Math.pow(cur, val)
    else if (op === '//') vars[n] = Math.floor(cur / val)
    return
  }

  const methodM = balancedCallMatch(line)
  if (methodM) {
    const { name, args } = methodM
    const dotM = name.match(/^(\w+)\.(\w+)$/)
    if (dotM) {
      const [, objName, method] = dotM
      const obj = vars[objName]
      const argVals = splitTopLevel(args).map(a => evalExpr(a.trim(), vars))
      if (Array.isArray(obj)) {
        switch (method) {
          case 'append': obj.push(argVals[0]); return
          case 'extend': argVals.forEach(v => { if (Array.isArray(v)) v.forEach(x => obj.push(x)); else obj.push(v) }); return
          case 'remove': {
            const idx = obj.indexOf(argVals[0])
            if (idx >= 0) obj.splice(idx, 1)
            return
          }
          case 'pop': obj.pop(); return
          case 'insert': obj.splice(argVals[0] as number, 0, argVals[1]); return
          case 'sort': obj.sort((a: unknown, b: unknown) => String(a) < String(b) ? -1 : String(a) > String(b) ? 1 : 0); return
          case 'reverse': obj.reverse(); return
          case 'clear': obj.length = 0; return
          case 'index': break
          case 'count': break
        }
      }
      if (typeof obj === 'string') {
        if (method === 'title') return
        if (method === 'lower') return
        if (method === 'upper') return
        if (method === 'strip') return
        if (method === 'replace') return
        if (method === 'join') return
        if (method === 'split') return
      }
      if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
        const dict = obj as Record<string, unknown>
        switch (method) {
          case 'keys': return
          case 'values': return
          case 'items': return
          case 'get': return
          case 'pop': delete dict[argVals[0] as string]; return
          case 'update': if (typeof argVals[0] === 'object') Object.assign(dict, argVals[0]); return
        }
      }
      return
    }
    callFunction(name, args, vars)
    return
  }
}

function balancedCall(line: string, name: string): { args: string } | null {
  const trimmed = line.trim()
  const prefix = name + '('
  if (!trimmed.startsWith(prefix)) return null
  const args = extractBalancedCallArgs(trimmed, name.length)
  if (args === null) return null
  return { args }
}

function balancedCallMatch(line: string): { name: string; args: string } | null {
  const trimmed = line.trim()
  const m = trimmed.match(/^((?:\w+\.)*\w+)\s*\(/)
  if (!m) return null
  let depth = 0, start = m[0].length, closeIdx = -1
  for (let i = 0, inQ: string | null = null; i < trimmed.length; i++) {
    const c = trimmed[i]
    if ((c === '"' || c === "'") && trimmed[i - 1] !== '\\') {
      inQ = inQ === c ? null : c
    }
    if (inQ) continue
    if (c === '(') depth++
    else if (c === ')') {
      depth--
      if (depth === 0) { closeIdx = i; break }
    }
  }
  if (closeIdx === -1) return null
  if (trimmed.slice(closeIdx + 1).trim() !== '') return null
  return { name: m[1], args: trimmed.slice(start, closeIdx) }
}

function extractBalancedCallArgs(line: string, nameLen: number): string | null {
  let depth = 0, closeIdx = -1
  for (let i = nameLen, inQ: string | null = null; i < line.length; i++) {
    const c = line[i]
    if ((c === '"' || c === "'") && line[i - 1] !== '\\') {
      inQ = inQ === c ? null : c
    }
    if (inQ) continue
    if (c === '(') depth++
    else if (c === ')') {
      depth--
      if (depth === 0) { closeIdx = i; break }
    }
  }
  if (closeIdx === -1 || line.slice(closeIdx + 1).trim() !== '') return null
  return line.slice(nameLen + 1, closeIdx)
}

function splitTopLevel(args: string, delim?: string): string[] {
  if (delim) {
    const result: string[] = []
    let depth = 0, inQ: string | null = null, start = 0
    for (let i = 0; i < args.length; i++) {
      const c = args[i]
      if ((c === '"' || c === "'") && args[i - 1] !== '\\') inQ = inQ === c ? null : c
      if (inQ) continue
      if (c === '(' || c === '[' || c === '{') depth++
      else if (c === ')' || c === ']' || c === '}') depth--
      else if (depth === 0 && args.slice(i).startsWith(delim)) {
        result.push(args.slice(start, i))
        i += delim.length - 1
        start = i + 1
      }
    }
    result.push(args.slice(start))
    return result.filter(s => s.trim() !== '')
  }
  const parts: string[] = []
  let cur = '', depth = 0, inQ: string | null = null
  for (let i = 0; i < args.length; i++) {
    const c = args[i]
    if ((c === '"' || c === "'") && args[i - 1] !== '\\') inQ = inQ === c ? null : c
    if (inQ) { cur += c; continue }
    if (c === '(' || c === '[' || c === '{') depth++
    else if (c === ')' || c === ']' || c === '}') depth--
    if (c === ',' && depth === 0) { parts.push(cur); cur = '' }
    else cur += c
  }
  if (cur.trim()) parts.push(cur)
  return parts
}

function evalPrintArgs(args: string, vars: Record<string, unknown>): string {
  let end = '', sep = ' ', cleanArgs = args
  const endM = cleanArgs.match(/,\s*end\s*=\s*["'](.*)["']\s*$/)
  if (endM) { end = endM[1].replace(/\\n/g, '\n'); cleanArgs = cleanArgs.replace(/,\s*end\s*=\s*["'].*["']\s*$/, '') }
  const sepM = cleanArgs.match(/,\s*sep\s*=\s*["'](.*)["']\s*$/)
  if (sepM) { sep = sepM[1]; cleanArgs = cleanArgs.replace(/,\s*sep\s*=\s*["'].*["']\s*$/, '') }
  return splitTopLevel(cleanArgs).map(p => formatValue(evalExpr(p.trim(), vars))).join(sep) + end
}

function formatValue(val: unknown): string {
  if (typeof val === 'boolean') return val ? 'True' : 'False'
  if (val === null || val === undefined) return 'None'
  if (Array.isArray(val)) return '[' + val.map(nestFormat).join(', ') + ']'
  if (typeof val === 'object') {
    return '{' + Object.entries(val as Record<string, unknown>).map(([k, v]) => `"${k}": ${nestFormat(v)}`).join(', ') + '}'
  }
  return String(val)
}

function nestFormat(val: unknown): string {
  if (typeof val === 'string') return `"${val}"`
  if (typeof val === 'boolean') return val ? 'True' : 'False'
  if (val === null || val === undefined) return 'None'
  if (Array.isArray(val)) return '[' + val.map(nestFormat).join(', ') + ']'
  if (typeof val === 'object') {
    return '{' + Object.entries(val as Record<string, unknown>).map(([k, v]) => `"${k}": ${nestFormat(v)}`).join(', ') + '}'
  }
  return String(val)
}

function evalExpr(expr: string, vars: Record<string, unknown>): unknown {
  const e = expr.trim()
  if (e === '') return ''
  if ((e.startsWith('"') && e.endsWith('"')) || (e.startsWith("'") && e.endsWith("'"))) return e.slice(1, -1)
  if (e === 'True') return true
  if (e === 'False') return false
  if (e === 'None') return null
  if (isBalancedParens(e)) return evalExpr(e.slice(1, -1), vars)
  if (e.match(/^-?\d+(\.\d+)?$/)) return Number(e)
  if (e.startsWith('f"') || e.startsWith("f'")) {
    return e.slice(2, -1).replace(/\{([^}]+)\}/g, (_, inner: string) => formatValue(evalExpr(inner, vars)))
  }
  if (e.startsWith('[') && e.endsWith(']')) {
    const inner = e.slice(1, -1).trim()
    return inner ? splitTopLevel(inner).map(s => evalExpr(s.trim(), vars)) : []
  }
  if (e.startsWith('{') && e.endsWith('}')) {
    const inner = e.slice(1, -1).trim()
    const obj: Record<string, unknown> = {}
    if (inner) {
      for (const pair of splitTopLevel(inner)) {
        const sepIdx = pair.indexOf(':')
        if (sepIdx === -1) continue
        const k = pair.slice(0, sepIdx).trim()
        const v = pair.slice(sepIdx + 1).trim()
        obj[k.replace(/['"]/g, '')] = evalExpr(v, vars)
      }
    }
    return obj
  }

  const idxM = e.match(/^(\w+)\[(.+)\]$/)
  if (idxM) {
    const [, objName, keyExpr] = idxM
    const obj = vars[objName]
    const key = evalExpr(keyExpr, vars)
    if (Array.isArray(obj)) {
      const idx = key as number
      return idx < 0 ? obj[obj.length + idx] : obj[idx]
    }
    if (typeof obj === 'string') {
      const idx = key as number
      const c = obj[idx < 0 ? obj.length + idx : idx]
      return c === undefined ? '' : c
    }
    if (typeof obj === 'object' && obj !== null) return (obj as Record<string, unknown>)[String(key)]
    return undefined
  }

  const fnCallM = balancedCallMatch(e)
  if (fnCallM) return callFunction(fnCallM.name, fnCallM.args, vars)

  if (vars[e] !== undefined) {
    const v = vars[e]
    if (typeof v === 'object' && v !== null && (v as Record<string, unknown>).type === 'function') return v
    return v
  }

  if (e.includes(' and ')) { const p = splitTopLevel(e, ' and '); return p.every(x => evalExpr(x, vars) ? true : false) }
  if (e.includes(' or ')) { const p = splitTopLevel(e, ' or '); return p.some(x => evalExpr(x, vars) ? true : false) }
  if (e.startsWith('not ')) return !evalExpr(e.slice(4).trim(), vars)

  for (const op of [' == ', ' != ', ' >= ', ' <= ', ' > ', ' < ']) {
    if (e.includes(op)) {
      const p = splitTopLevel(e, op)
      if (p.length < 2) continue
      const a = evalExpr(p[0], vars) as unknown as number, b = evalExpr(p[1], vars) as unknown as number
      switch (op) {
        case ' == ': return a === b
        case ' != ': return a !== b
        case ' >= ': return a >= b
        case ' <= ': return a <= b
        case ' > ': return a > b
        case ' < ': return a < b
      }
    }
  }

  if (e.includes(' + ')) {
    const p = splitTopLevel(e, ' + ')
    if (p.length >= 2) {
      const acc = p.slice(1).reduce<unknown>((acc, part) => {
        const b = evalExpr(part.trim(), vars)
        if (typeof acc === 'string' || typeof b === 'string') return String(acc) + String(b)
        return (acc as number) + (b as number)
      }, evalExpr(p[0], vars))
      return acc
    }
  }
  if (e.includes(' - ') && !e.startsWith('-')) {
    const p = splitTopLevel(e, ' - ')
    if (p.length >= 2) {
      return p.slice(1).reduce<number>((acc, part) => acc - (evalExpr(part.trim(), vars) as number), evalExpr(p[0], vars) as number)
    }
  }
  for (const op of [' * ', ' / ', ' // ', ' % ']) {
    if (e.includes(op)) {
      const p = splitTopLevel(e, op)
      if (p.length >= 2) {
        return p.slice(1).reduce<unknown>((acc, part) => {
          const b = evalExpr(part.trim(), vars) as unknown
          if (op === ' * ') {
            if (typeof acc === 'string' && typeof b === 'number') return acc.repeat(Math.max(0, b))
            if (typeof acc === 'number' && typeof b === 'string') return b.repeat(Math.max(0, acc))
            return (acc as number) * (b as number)
          }
          if (op === ' / ') return (acc as number) / (b as number)
          if (op === ' // ') return Math.floor((acc as number) / (b as number))
          return (acc as number) % (b as number)
        }, evalExpr(p[0], vars))
      }
    }
  }
  for (const op of [' ** ']) {
    if (e.includes(op)) {
      const p = splitTopLevel(e, op)
      if (p.length < 2) continue
      return Math.pow(evalExpr(p[0], vars) as number, evalExpr(p[1], vars) as number)
    }
  }

  return e
}

function isBalancedParens(e: string): boolean {
  if (!(e.startsWith('(') && e.endsWith(')'))) return false
  let depth = 0, inQ: string | null = null
  for (let i = 0; i < e.length; i++) {
    const c = e[i]
    if ((c === '"' || c === "'") && e[i - 1] !== '\\') inQ = inQ === c ? null : c
    if (inQ) continue
    if (c === '(') depth++
    else if (c === ')') { depth--; if (depth === 0) return i === e.length - 1 }
  }
  return false
}

function evalCondition(cond: string, vars: Record<string, unknown>): boolean {
  if (cond.includes(' and ')) return cond.split(' and ').every(p => evalCondition(p.trim(), vars))
  if (cond.includes(' or ')) return cond.split(' or ').some(p => evalCondition(p.trim(), vars))
  if (cond.startsWith('not ')) return !evalCondition(cond.slice(4).trim(), vars)
  return Boolean(evalExpr(cond, vars))
}

function resolveIterable(expr: string, vars: Record<string, unknown>): unknown[] {
  const e = expr.trim()
  const rangeM = e.match(/^range\(\s*(.+)\s*\)$/)
  if (rangeM) {
    const nums = splitTopLevel(rangeM[1]).map(s => parseInt(s.trim(), 10))
    let start = 0, stop = 0, step = 1
    if (nums.length === 1) stop = nums[0]
    else if (nums.length === 2) { start = nums[0]; stop = nums[1] }
    else { start = nums[0]; stop = nums[1]; step = nums[2] }
    if (step === 0) return []
    const arr: number[] = []
    for (let v = start; step > 0 ? v < stop : v > stop; v += step) {
      arr.push(v)
      if (arr.length > MAX_LOOP_ITERATIONS) break
    }
    return arr
  }
  const val = evalExpr(e, vars)
  if (Array.isArray(val)) return val
  if (typeof val === 'string') return val.split('')
  if (typeof val === 'object' && val !== null) return Object.keys(val as Record<string, unknown>)
  return []
}

function callFunction(fname: string, argsRaw: string, vars: Record<string, unknown>): unknown {
  const args = argsRaw.trim()
  if (fname === 'print') return evalPrintArgs(args, vars)
  if (fname === 'input') return ''
  if (fname === 'type') {
    const val = evalExpr(args, vars)
    const typeMap: Record<string, string> = { string: "<class 'str'>", number: Number.isInteger(val as number) ? "<class 'int'>" : "<class 'float'>", boolean: "<class 'bool'>", object: Array.isArray(val) ? "<class 'list'>" : "<class 'dict'>" }
    return typeMap[typeof val] || "<class 'object'>"
  }
  if (fname === 'len') {
    const val = evalExpr(args, vars)
    if (Array.isArray(val)) return val.length
    if (typeof val === 'string') return val.length
    if (typeof val === 'object' && val !== null) return Object.keys(val as Record<string, unknown>).length
    return 0
  }
  if (fname === 'int') { const v = evalExpr(args, vars); return v === '' ? 0 : parseInt(String(v), 10) || 0 }
  if (fname === 'float') return parseFloat(String(evalExpr(args, vars))) || 0
  if (fname === 'str') return String(evalExpr(args, vars))
  if (fname === 'bool') return Boolean(evalExpr(args, vars))
  if (fname === 'abs') return Math.abs(evalExpr(args, vars) as number)
  if (fname === 'round') return Math.round(evalExpr(args, vars) as number)
  if (fname === 'min') return Math.min(...splitTopLevel(args).map(a => evalExpr(a.trim(), vars) as number))
  if (fname === 'max') return Math.max(...splitTopLevel(args).map(a => evalExpr(a.trim(), vars) as number))
  if (fname === 'sum') { const v = evalExpr(args, vars); return Array.isArray(v) ? v.reduce((a: number, b: unknown) => a + (b as number), 0) : 0 }

  const fn = vars[fname]
  if (fn && typeof fn === 'object' && (fn as Record<string, unknown>).type === 'function') {
    const func = fn as { type: string; params: string[]; body: string[] }
    const argVals = splitTopLevel(args).map(a => evalExpr(a.trim(), vars))
    const local: Record<string, unknown> = { ...vars }
    func.params.forEach((p, i) => { local[p] = argVals[i] })
    try {
      execBlock(func.body, 0, func.body.length, local, CURRENT_OUT)
    } catch (e) {
      if (e instanceof ReturnSignal) return e.value
      if (e === BREAK || e === CONTINUE) return undefined
      throw e
    }
    return undefined
  }
  return undefined
}
