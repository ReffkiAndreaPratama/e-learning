import { executeCode } from '../src/lib/pseudoRunner.ts'
import { materials } from '../src/data/materials.ts'
import { exercises } from '../src/data/exercises.ts'
import { quizzes } from '../src/data/quizzes.ts'

let bad = 0

// 1) materials: setiap codeExample harus error-free & output harus PERSIS
console.log('=== VALIDASI MATERIALS ===')
for (const topic of materials) {
  for (const st of topic.subTopics) {
    if (!st.codeExample) continue
    const r = executeCode(st.codeExample)
    const got = r.output.trim()
    const exp = (st.output || '').trim()
    if (r.error) {
      bad++
      console.log(`[MAT-ERR] ${topic.title} / ${st.title}\n  ${r.errorMessage}\n  code:\n${st.codeExample}`)
    } else if (got !== exp) {
      bad++
      console.log(`[MAT-MISMATCH] ${topic.title} / ${st.title}\n  exp: ${JSON.stringify(exp)}\n  got: ${JSON.stringify(got)}`)
    }
  }
}

// 2) exercises/quizzes: codeSnippet non-debugging harus jalan tanpa error
console.log('\n=== VALIDASI EXERCISES ===')
for (const q of exercises) {
  if (!q.codeSnippet || q.type === 'debugging') continue
  const r = executeCode(q.codeSnippet)
  if (r.error) {
    bad++
    console.log(`[EX-ERR] ${q.id} (${q.type}) ${r.errorMessage}\n${q.codeSnippet}`)
  }
}
console.log('\n=== VALIDASI QUIZZES ===')
for (const [k, qs] of Object.entries(quizzes)) {
  for (const q of qs) {
    if (!q.codeSnippet) continue
    const r = executeCode(q.codeSnippet)
    if (r.error) {
      bad++
      console.log(`[QZ-ERR] ${k} / ${q.id} ${r.errorMessage}\n${q.codeSnippet}`)
    }
  }
}

// 3) cari token python terlarang dalam data & lib
console.log('\n=== SCAN TOKEN PYTHON ===')
const forbidden = /\b(print\(|def |return |range\(|elif|True|False|None|type\(|\.append|\.sort|\.reverse|dict|lambda|f["']|input\()/
const files = ['src/data/materials.ts', 'src/data/exercises.ts', 'src/data/quizzes.ts', 'src/lib/aiTutor.ts']
const fs = await import('node:fs')
for (const f of files) {
  const txt = fs.readFileSync(f, 'utf8')
  const lines = txt.split('\n')
  lines.forEach((ln, i) => {
    if (forbidden.test(ln)) {
      bad++
      console.log(`[PY-TKN] ${f}:${i + 1} ${ln.trim().slice(0, 90)}`)
    }
  })
}

console.log(`\n=== HASIL: ${bad === 0 ? 'SEMUA BERSIH' : bad + ' MASALAH'} ===`)
process.exit(bad ? 1 : 0)