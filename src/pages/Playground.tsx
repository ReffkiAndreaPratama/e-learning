import React from 'react'
import { Play, RotateCcw, Eraser, FileCode2, CheckCircle2, XCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { executeCode } from '../lib/pseudoRunner'
import { Card, PageHeader } from '../components/ui'

const defaultCode = `nama <- "Andi"
umur <- 19

tulis("Nama:", nama)
tulis("Umur:", umur)`

const examples = [
  { label: 'Hello World', code: 'tulis("Hello World")' },
  { label: 'Variabel', code: 'nama <- "Budi"\ntulis("Halo ", nama)' },
  { label: 'Perulangan', code: 'untuk i <- 1 sampai 5\ntulis(i)\nakhiruntuk' },
  { label: 'Percabangan', code: 'nilai <- 80\njika nilai >= 75 maka\ntulis("Lulus")\nselainnya\ntulis("Tidak Lulus")\nakhirjika' },
  { label: 'Fungsi', code: 'fungsi tambah(a, b)\nkembalikan a + b\nakhirfungsi\nhasil <- tambah(5, 3)\ntulis(hasil)' },
  { label: 'Array', code: 'buah <- ["apel", "mangga", "jeruk"]\nuntuk i <- 1 sampai panjang(buah)\ntulis(buah[i])\nakhiruntuk' },
]

function Playground() {
  const [code, setCode] = React.useState(defaultCode)
  const [result, setResult] = React.useState<{ output: string; error: boolean; errorMessage?: string; running: boolean } | null>({ output: '', error: false, running: false })
  const { recordPlaygroundRun } = useApp()

  const run = () => {
    setResult({ output: '', error: false, running: true })
    setTimeout(() => {
      const res = executeCode(code)
      setResult({ output: res.output, error: res.error, errorMessage: res.errorMessage, running: false })
      recordPlaygroundRun()
    }, 600)
  }

  const reset = () => {
    setCode(defaultCode)
    setResult({ output: '', error: false, running: false })
  }

  const clear = () => {
    setCode('')
    setResult({ output: '', error: false, running: false })
  }

  const loadExample = (c: string) => {
    setCode(c)
    setResult({ output: '', error: false, running: false })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const target = e.target as HTMLTextAreaElement
      const start = target.selectionStart
      const end = target.selectionEnd
      const newCode = code.substring(0, start) + '    ' + code.substring(end)
      setCode(newCode)
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4
      }, 0)
    }
    if (((e.ctrlKey || e.metaKey) && e.key === 'Enter')) {
      e.preventDefault()
      run()
    }
  }

  const lineCount = code.split('\n').length

  return (
    <div>
      <PageHeader
        title="Pseudo Playground"
        subtitle="Coba dan jalankan kode pseudocode (bahasa deskriptif) langsung di browser. Tekan Ctrl+Enter untuk menjalankan."
      />

      {/* Examples */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 self-center"><FileCode2 className="w-3.5 h-3.5" /> Contoh kode:</span>
        {examples.map(ex => (
          <button
            key={ex.label}
            onClick={() => loadExample(ex.code)}
            className="px-3 py-1.5 rounded-lg bg-white/70 dark:bg-white/10 backdrop-blur border border-white/40 dark:border-white/10 text-xs font-medium text-gray-600 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 transition-colors"
          >
            {ex.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Editor */}
        <Card className="overflow-hidden lg:sticky lg:top-6 self-start">
          <div className="flex items-center justify-between px-4 py-2.5 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-3 text-xs text-gray-300 font-mono">kode.pseudo</span>
            </div>
            <span className="text-xs text-gray-500">{lineCount} baris</span>
          </div>
          <div className="relative bg-gray-900">
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              rows={16}
              placeholder={`# Tulis kode pseudocode di sini\ntulis("Halo dunia!")`}
              className="w-full bg-gray-900 text-gray-100 font-mono text-sm p-4 pl-5 resize-y min-h-[320px] focus:outline-none leading-relaxed"
              style={{ tabSize: 4 }}
            />
            <div className="pointer-events-none absolute left-0 top-4 bottom-4 w-4 text-right pr-1 text-gray-700 font-mono text-sm leading-relaxed hidden"></div>
          </div>
          <div className="p-3 bg-gray-800 flex items-center gap-2 flex-wrap">
            <button
              onClick={run}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
            >
              <Play className="w-4 h-4" /> Run Code
            </button>
            <button onClick={reset} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700 text-gray-200 text-sm font-medium hover:bg-gray-600 transition-colors">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button onClick={clear} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700 text-gray-200 text-sm font-medium hover:bg-gray-600 transition-colors">
              <Eraser className="w-4 h-4" /> Clear
            </button>
            <span className="ml-auto text-xs text-gray-500">Ctrl+Enter = Run</span>
          </div>
        </Card>

        {/* Output */}
        <Card className="overflow-hidden">
          <div className="px-4 py-2.5 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
            <span className="text-xs text-gray-300 font-medium">Output</span>
            {result?.running ? (
              <span className="text-[11px] text-amber-400 animate-pulse">menjalankan...</span>
            ) : result && (result.output || result.error) ? (
              result.error
                ? <span className="flex items-center gap-1 text-[11px] text-red-400"><XCircle className="w-3.5 h-3.5" /> Error</span>
                : <span className="flex items-center gap-1 text-[11px] text-green-400"><CheckCircle2 className="w-3.5 h-3.5" /> Selesai</span>
            ) : null}
          </div>
          <div className="bg-[#0f1115] min-h-[320px]">
            {result?.running ? (
              <div className="p-5 font-mono text-sm text-gray-500 leading-relaxed">
                <span className="animate-pulse">Menjalankan kode...</span>
              </div>
            ) : result && (result.output || result.error) ? (
              <div className="p-5">
                {result.error ? (
                  <div>
                    <div className="flex items-center gap-2 text-red-500 text-sm font-medium mb-2">
                      <XCircle className="w-4 h-4" /> Terdapat kesalahan pada kode
                    </div>
                    <pre className="text-red-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">{result.errorMessage || 'Syntax Error'}</pre>
                  </div>
                ) : (
                  <pre className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">{result.output || '(tidak ada output)'}</pre>
                )}
              </div>
            ) : (
              <div className="p-5 text-sm text-gray-600 font-mono">
                <p className="text-gray-700">&gt; Output akan tampil di sini...</p>
                <p className="text-gray-600 mt-2">Coba contoh berikut:</p>
                <pre className="mt-2 text-blue-400 bg-gray-900 rounded-lg p-3">{defaultCode}</pre>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Status */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
          Runtime: PseudoCode Simulator (aman, berjalan di browser)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
          Mendukung: tulis, variabel, jika/selainnya, untuk/selama, fungsi, array
        </span>
      </div>
    </div>
  )
}

export default Playground