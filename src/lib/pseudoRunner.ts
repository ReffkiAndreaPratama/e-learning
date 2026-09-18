export interface ExecutionResult {
  output: string
  error: boolean
  errorMessage?: string
}

const MAX_OUTPUT_LINES = 200
const MAX_LOOP_ITERATIONS = 2000

const BREAK = Symbol('break')
const CONTINUE = Symbol('continue')
class ReturnSignal { value: unknown; constructor(value: unknown) { this.value = value } }

let CURRENT_OUT: string[] = []

const OUT_FNS = ['tulis', 'cetak', 'write', 'output']
const IN_FNS = ['baca', 'read', 'input']
const ALIAS_FNS: Record<string, string> = {
  bulat: 'round', akar: 'sqrt', pangkat: 'pow',
}

function isOpenJk(t: string) { return /^(jika|if)\b/.test(t) }
function isCloseJk(t: string) { return /^(akhirjika|endif|end\s+if)\b/.test(t) }
function isElse(t: string) { return /^(selainnya|lainnya|else)\b/.test(t) }
function isOpenVt(t: string) { return /^(untuk|for)\b\s/.test(t) }
function isCloseVt(t: string) { return /^(akhiruntuk|endfor|end\s+for)\b/.test(t) }
function isOpenSm(t: string) { return /^(selama|while)\b\s/.test(t) }
function isCloseSm(t: string) { return /^(akhirsementara|endwhile|end\s+while)\b/.test(t) }
function isOpenFn(t: string) { return /^(fungsi|function)\b\s/.test(t) }
function isCloseFn(t: string) { return /^(akhirfungsi|endfunction|end\s+function)\b/.test(t) }

function isBlankLine(t: string): boolean { return t === '' || t.startsWith('#') || t.startsWith('//') }

function isNoopLine(t: string): boolean {
  if (t === 'deklarasi' || t === 'algoritma' || t === 'begin' || t === 'akhir') return true
  if (t === 'end' || t === 'endprogram' || t === 'end.' || t === 'end;') return true
  if (/^program\b/.test(t)) return true
  if (/^konstanta\b/.test(t)) return true
  if (/^var\b/.test(t)) return true
  if (/^[A-Za-z_][A-Za-z0-9_]*(\s*,\s*[A-Za-z_][A-Za-z0-9_]*)*\s*:\s*[A-Za-z_][A-Za-z0-9_]*$/.test(t)) return true
  return false
}

export function executeCode(code: string): ExecutionResult {
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
    return { output: out.join('\n'), error: true, errorMessage: e instanceof Error ? e.message : 'Terjadi error pada kode' }
  }
}

function stripComment(line: string): string {
  let depth = 0, inQ: string | null = null
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if ((c === '"' || c === "'") && line[i - 1] !== '\\') {
      inQ = inQ === c ? null : c
      continue
    }
    if (inQ) continue
    if (c === '(' || c === '[' || c === '{') depth++
    else if (c === ')' || c === ']' || c === '}') depth--
    else if (depth === 0 && (c === '#' || (c === '/' && line[i + 1] === '/'))) {
      return line.slice(0, i).trimEnd()
    }
  }
  return line.trimEnd()
}

function execBlock(lines: string[], start: number, end: number, vars: Record<string, unknown>, out: string[]): void {
  let i = start
  while (i < end) {
    const t = stripComment(lines[i]).trim()
    if (isBlankLine(t) || isNoopLine(t)) { i++; continue }
    i = execStatement(lines, t, i, vars, out)
  }
}

function scanEnd(lines: string[], from: number, open: (t: string) => boolean, close: (t: string) => boolean): number {
  let depth = 0
  for (let i = from; i < lines.length; i++) {
    const t = lines[i].trim()
    if (isBlankLine(t) || isNoopLine(t)) continue
    if (open(t)) depth++
    else if (close(t)) {
      if (depth === 0) return i + 1
      depth--
    }
  }
  return lines.length
}

function execStatement(lines: string[], line: string, i: number, vars: Record<string, unknown>, out: string[]): number {

  if (line === 'keluar' || line === 'break') throw BREAK
  if (line === 'lanjut' || line === 'continue') throw CONTINUE
  const retM = line.match(/^(?:kembalikan|return)\s+(.+)$/)
  if (retM) throw new ReturnSignal(evalExpr(retM[1].trim(), vars))

  // jika / if ... [selainnya] ... akhirjika
  const jk = line.match(/^jika\s+(.+?)(?:\s+maka)?\s*$/) || (line.startsWith('if ') ? line.replace(/\s+then\s*$/, '').match(/^if\s+(.+)$/) : null)
  if (jk) {
    const cond = jk[1].trim()
    const end = scanEnd(lines, i + 1, isOpenJk, isCloseJk)
    let elseIdx = -1, depth = 0
    for (let k = i + 1; k < end; k++) {
      const t = lines[k].trim()
      if (isBlankLine(t) || isNoopLine(t)) continue
      if (isOpenJk(t)) depth++
      else if (isCloseJk(t)) depth--
      else if (depth === 0 && isElse(t)) { elseIdx = k; break }
    }
    const thenEnd = elseIdx === -1 ? end - 1 : elseIdx
    if (evalCondition(cond, vars)) {
      execBlock(lines, i + 1, thenEnd, vars, out)
    } else if (elseIdx !== -1) {
      execBlock(lines, elseIdx + 1, end - 1, vars, out)
    }
    return end
  }

  // untuk / for v <- a sampai b [langkah n | menurun] ... akhiruntuk
  let work = line
  let step = 1
  const menurunFront = work.match(/^(?:untuk|for)\s+(\w+)\s*(?:<-|:=)\s+(.+?)\s+menurun\s+(?:sampai|hingga|to)\s+/)
  if (menurunFront) {
    step = -1
    work = work.replace(/\s+menurun\s+(?:sampai|hingga|to)\s+/, ' sampai ')
  }
  const vt = work.match(/^(?:untuk|for)\s+(\w+)\s*(?:<-|:=)\s*(.+?)\s+(?:sampai|hingga|to)\s+(.+)$/)
  if (vt) {
    const vname = vt[1]
    const startVal = Number(evalExpr(vt[2].trim(), vars)) || 0
    let rest = vt[3].trim()
    const stM = rest.match(/^(.+?)\s+(?:langkah|step)\s+(-?\d+)\s*$/)
    const meM = rest.match(/^(.+?)\s+menurun\s*$/)
    if (stM) { rest = stM[1].trim(); step = parseInt(stM[2], 10) }
    else if (meM) { rest = meM[1].trim(); step = -1 }
    const endVal = Number(evalExpr(rest, vars)) || 0
    if (step === 0) step = 1
    const blockEnd = scanEnd(lines, i + 1, isOpenVt, isCloseVt)
    let count = 0
    let v = startVal
    while (step > 0 ? v <= endVal : v >= endVal) {
      if (count++ > MAX_LOOP_ITERATIONS) throw new Error('Loop terlalu banyak iterasi (maks 2000)')
      vars[vname] = v
      try {
        execBlock(lines, i + 1, blockEnd - 1, vars, out)
      } catch (e) {
        if (e === BREAK) break
        if (e === CONTINUE) { v += step; continue }
        throw e
      }
      if (out.length > MAX_OUTPUT_LINES) break
      v += step
    }
    return blockEnd
  }

  // selama / while ... akhirsementara
  const sm = line.match(/^(?:selama|while)\s+(.+)$/)
  if (sm) {
    const cond = sm[1].trim()
    const blockEnd = scanEnd(lines, i + 1, isOpenSm, isCloseSm)
    let count = 0
    while (evalCondition(cond, vars)) {
      if (count++ > MAX_LOOP_ITERATIONS) throw new Error('Loop tak terbatas terdeteksi!')
      try {
        execBlock(lines, i + 1, blockEnd - 1, vars, out)
      } catch (e) {
        if (e === BREAK) break
        if (e === CONTINUE) continue
        throw e
      }
      if (out.length > MAX_OUTPUT_LINES) break
    }
    return blockEnd
  }

  // fungsi / function ... akhirfungsi
  const fn = line.match(/^(?:fungsi|function)\s+(\w+)\s*\(\s*([^)]*)\)\s*$/)
  if (fn) {
    const blockEnd = scanEnd(lines, i + 1, isOpenFn, isCloseFn)
    vars[fn[1]] = {
      type: 'function',
      params: fn[2].split(',').map(s => s.trim()).filter(Boolean),
      body: lines.slice(i + 1, blockEnd - 1),
    }
    return blockEnd
  }

  execLine(line, vars, out)
  return i + 1
}

function execLine(line: string, vars: Record<string, unknown>, out: string[]): void {
  const outM = matchCall(line, OUT_FNS)
  if (outM) { out.push(evalPrintArgs(outM.args, vars)); return }

  const itemAssignM = line.match(/^(\w+)\[(.+)\]\s*(?:<-|:=)\s*(.+)$/)
  if (itemAssignM) {
    const [, objName, keyExpr, valExpr] = itemAssignM
    const obj = vars[objName]
    const key = evalExpr(keyExpr, vars)
    const val = evalExpr(valExpr.trim(), vars)
    if (!Array.isArray(obj)) throw new Error(`Variabel '${objName}' bukan array`)
    const idx = Number(key)
    if (idx < 1 || idx > obj.length) throw new Error(`Indeks [${key}] di luar jangkauan array`)
    obj[idx - 1] = val
    return
  }

  const assignM = line.match(/^(\w+)\s*(?:<-|:=)\s*(.+)$/)
  if (assignM) { vars[assignM[1]] = evalExpr(assignM[2].trim(), vars); return }

  const callM = matchCall(line, [])
  if (callM) { callFunction(callM.name, callM.args, vars); return }
}

function matchCall(line: string, names: string[]): { name: string; args: string } | null {
  const m = line.match(/^((?:\w+\.)*\w+)\s*\(/)
  if (!m) return null
  let depth = 0, closeIdx = -1
  for (let i = 0, inQ: string | null = null; i < line.length; i++) {
    const c = line[i]
    if ((c === '"' || c === "'") && line[i - 1] !== '\\') inQ = inQ === c ? null : c
    if (inQ) continue
    if (c === '(') depth++
    else if (c === ')') {
      depth--
      if (depth === 0) { closeIdx = i; break }
    }
  }
  if (closeIdx === -1) return null
  if (line.slice(closeIdx + 1).trim() !== '') return null
  const name = m[1].trim()
  if (names.length && !names.includes(name)) return null
  return { name, args: line.slice(m[0].length, closeIdx) }
}

function splitTopLevel(args: string): string[] {
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
  let end = '', sep = ' ', clean = args
  const endM = clean.match(/,\s*end\s*=\s*["'](.*)["']\s*$/)
  if (endM) { end = endM[1].replace(/\\n/g, '\n'); clean = clean.replace(/,\s*end\s*=\s*["'].*["']\s*$/, '') }
  const sepM = clean.match(/,\s*sep\s*=\s*["'](.*)["']\s*$/)
  if (sepM) { sep = sepM[1]; clean = clean.replace(/,\s*sep\s*=\s*["'].*["']\s*$/, '') }
  return splitTopLevel(clean).map(p => formatValue(evalExpr(p.trim(), vars))).join(sep) + end
}

function formatValue(val: unknown): string {
  if (typeof val === 'boolean') return val ? 'true' : 'false'
  if (val === null || val === undefined) return 'null'
  if (Array.isArray(val)) return '[' + val.map(formatValue).join(', ') + ']'
  if (typeof val === 'object') {
    return '{' + Object.entries(val as Record<string, unknown>).map(([k, v]) => `${k}: ${formatValue(v)}`).join(', ') + '}'
  }
  return String(val)
}

// ---------------- Ekspresi (recursive descent) ----------------

const BIN_OPS_BY_LEVEL: string[][] = [
  ['atau', 'or'],
  ['dan', 'and'],
  ['==', '!=', '<>', '<=', '>=', '=', '<', '>'],
  ['+', '-'],
  ['*', '/', '%', 'div', 'mod'],
  ['**'],
]

function isWordOp(op: string): boolean { return /^[a-zA-Z]+$/.test(op) }

function findFirstOp(e: string, ops: string[]): { op: string; idx: number } | null {
  let depth = 0, inQ: string | null = null
  for (let i = 0; i < e.length; i++) {
    const c = e[i]
    if ((c === '"' || c === "'") && e[i - 1] !== '\\') inQ = inQ === c ? null : c
    if (inQ) continue
    if (c === '(' || c === '[' || c === '{') { depth++; continue }
    if (c === ')' || c === ']' || c === '}') { depth--; continue }
    if (depth !== 0 || i === 0) continue
    for (const op of ops) {
      if (e.slice(i, i + op.length) !== op) continue
      if (op === '*' && (e[i - 1] === '*' || e[i + 1] === '*')) continue
      if (isWordOp(op)) {
        const before = e[i - 1]
        const after = e[i + op.length] || ''
        if (/[A-Za-z0-9_]/.test(before) || /[A-Za-z0-9_]/.test(after)) continue
        return { op, idx: i }
      }
      return { op, idx: i }
    }
  }
  return null
}

function evalExpr(expr: string, vars: Record<string, unknown>): unknown {
  return evalLevel(expr.trim(), 0, vars)
}

function evalLevel(e: string, level: number, vars: Record<string, unknown>): unknown {
  const nk = e.match(/^(?:tidak|not)\s+(.+)$/)
  if (nk) return !evalLevel(nk[1].trim(), level, vars)
  if (level >= BIN_OPS_BY_LEVEL.length) return evalPrimary(e, vars)

  const found = findFirstOp(e, BIN_OPS_BY_LEVEL[level])
  if (!found) return evalLevel(e, level + 1, vars)

  let left = evalLevel(e.slice(0, found.idx).trim(), level + 1, vars)
  let rest = e.slice(found.idx + found.op.length)
  let op = found.op
  for (;;) {
    const nxt = findFirstOp(rest, BIN_OPS_BY_LEVEL[level])
    if (!nxt) {
      left = applyOp(op, left, evalLevel(rest.trim(), level + 1, vars))
      break
    }
    const right = evalLevel(rest.slice(0, nxt.idx).trim(), level + 1, vars)
    left = applyOp(op, left, right)
    rest = rest.slice(nxt.idx + nxt.op.length)
    op = nxt.op
  }
  return left
}

function applyOp(op: string, a: unknown, b: unknown): unknown {
  switch (op) {
    case 'atau': case 'or': return Boolean(a) || Boolean(b)
    case 'dan': case 'and': return Boolean(a) && Boolean(b)
    case '==': case '=': return a === b
    case '!=': case '<>': return a !== b
    case '<=': return (a as never) <= (b as never)
    case '>=': return (a as never) >= (b as never)
    case '<': return (a as never) < (b as never)
    case '>': return (a as never) > (b as never)
    case '+':
      if (typeof a === 'string' || typeof b === 'string') return String(a) + String(b)
      return Number(a) + Number(b)
    case '-': return Number(a) - Number(b)
    case '*':
      if (typeof a === 'number' && typeof b === 'number') return a * b
      return Number(a) * Number(b)
    case '/': return Number(a) / Number(b)
    case '%': case 'mod': return Number(a) % Number(b)
    case 'div': return Math.floor(Number(a) / Number(b))
    case '**': return Math.pow(Number(a), Number(b))
  }
  return a
}

function isStringLit(e: string): boolean {
  const c = e[0]
  if (c !== '"' && c !== "'") return false
  if (!e.endsWith(c)) return false
  return !e.slice(1, -1).includes(c)
}

function evalPrimary(e: string, vars: Record<string, unknown>): unknown {
  if (e.startsWith('-') && e.length > 1) return -Number(evalPrimary(e.slice(1).trim(), vars))
  if (isStringLit(e)) return e.slice(1, -1)
  if (e === 'benar' || e === 'true') return true
  if (e === 'salah' || e === 'false') return false
  if (e === 'kosong' || e === 'null' || e === 'None') return null
  if (/^-?\d+(\.\d+)?$/.test(e)) return Number(e)
  if (e.startsWith('[') && e.endsWith(']')) {
    const inner = e.slice(1, -1).trim()
    return inner ? splitTopLevel(inner).map(s => evalExpr(s.trim(), vars)) : []
  }
  if (isBalancedParens(e)) return evalExpr(e.slice(1, -1), vars)

  const idxChain = e.match(/^(\w+)((?:\[[^\]]+\])+)$/)
  if (idxChain) {
    let obj: unknown = vars[idxChain[1]]
    const chain = idxChain[2]
    const groupRe = /\[([^\]]+)\]/g
    let m: RegExpExecArray | null
    while ((m = groupRe.exec(chain)) !== null) {
      const key = evalExpr(m[1].trim(), vars)
      if (Array.isArray(obj)) {
        const idx = Number(key)
        if (idx < 1 || idx > obj.length) throw new Error(`Indeks [${key}] di luar jangkauan array`)
        obj = obj[idx - 1]
      } else if (typeof obj === 'string') {
        const idx = Number(key)
        if (idx < 1 || idx > obj.length) throw new Error(`Indeks [${key}] di luar jangkauan string`)
        obj = obj[idx - 1]
      } else {
        throw new Error(`Nilai sebelum [${key}] bukan array`)
      }
    }
    return obj
  }

  const fnM = matchCall(e, [])
  if (fnM) {
    if (OUT_FNS.includes(fnM.name)) return undefined
    return callFunction(fnM.name, fnM.args, vars)
  }

  if (vars[e] !== undefined) return vars[e]

  throw new Error(`Variabel '${e}' belum terdefinisi`)
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
  const val = evalExpr(cond, vars)
  if (val === null || val === undefined) return false
  if (val === '') return false
  return Boolean(val)
}

function callFunction(fname0: string, argsRaw: string, vars: Record<string, unknown>): unknown {
  const fname = ALIAS_FNS[fname0] || fname0
  const args = argsRaw.trim()
  if (OUT_FNS.includes(fname0)) return evalPrintArgs(args, vars)
  if (IN_FNS.includes(fname0)) return ''
  if (fname === 'panjang' || fname === 'len') {
    const v = evalExpr(args, vars)
    if (Array.isArray(v)) return v.length
    if (typeof v === 'string') return v.length
    return 0
  }
  if (fname === 'int') { const v = evalExpr(args, vars); return v === '' ? 0 : parseInt(String(v), 10) || 0 }
  if (fname === 'float') return parseFloat(String(evalExpr(args, vars))) || 0
  if (fname === 'str') {
    const v = evalExpr(args, vars)
    if (typeof v === 'boolean') return v ? 'true' : 'false'
    return String(v)
  }
  if (fname === 'bool') return Boolean(evalExpr(args, vars))
  if (fname === 'abs') return Math.abs(Number(evalExpr(args, vars)))
  if (fname === 'round') return Math.round(Number(evalExpr(args, vars)))
  if (fname === 'sqrt') return Math.sqrt(Number(evalExpr(args, vars)))
  if (fname === 'pow') {
    const p = splitTopLevel(args).map(a => Number(evalExpr(a.trim(), vars)))
    return Math.pow(p[0] || 0, p[1] || 0)
  }
  if (fname === 'min' || fname === 'max') {
    const vals = splitTopLevel(args).flatMap(a => {
      const v = evalExpr(a.trim(), vars)
      return Array.isArray(v) ? v : [v]
    })
    return fname === 'min' ? Math.min(...vals.map(Number)) : Math.max(...vals.map(Number))
  }
  if (fname === 'sum') { const v = evalExpr(args, vars); return Array.isArray(v) ? v.reduce((a, b) => a + Number(b), 0) : 0 }

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
  throw new Error(`Fungsi '${fname0}' tidak dikenal`)
}