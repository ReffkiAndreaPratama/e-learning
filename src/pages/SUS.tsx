import React from 'react'
import { ClipboardCheck, Gauge, Activity, Download, Trash2, CheckCircle2, Info } from 'lucide-react'
import { Card, PageHeader, Badge } from '../components/ui'

interface SusAnswer {
  id: number
  rating: number
}

interface SusResult {
  id: string
  answers: SusAnswer[]
  score: number
  completedAt: string
}

const SUS_STORAGE_KEY = 'pylearn_sus_results'

const questions = [
  'Saya berpikir akan menggunakan sistem ini lagi.',
  'Saya merasa sistem ini rumit untuk digunakan.',
  'Saya merasa sistem ini mudah untuk digunakan.',
  'Saya membutuhkan bantuan dari orang lain atau teknisi untuk menggunakan sistem ini.',
  'Saya merasa fitur-fitur sistem ini berjalan dengan semestinya.',
  'Saya merasa ada banyak hal yang tidak konsisten (tidak serasi) dalam sistem ini.',
  'Saya merasa orang lain akan memahami cara menggunakan sistem ini dengan cepat.',
  'Saya merasa sistem ini membingungkan.',
  'Saya merasa tidak ada hambatan dalam menggunakan sistem ini.',
  'Saya perlu membiasakan diri terlebih dahulu sebelum menggunakan sistem ini.',
]

const ratingLabels = ['Sangat Tidak Setuju', 'Tidak Setuju', 'Netral', 'Setuju', 'Sangat Setuju']

function computeSusScore(answers: SusAnswer[]): number {
  let total = 0
  for (const a of answers) {
    const contribution = a.id % 2 === 1 ? a.rating - 1 : 5 - a.rating
    total += contribution
  }
  return Math.round(total * 2.5)
}

function susCategory(score: number): { label: string; tone: 'green' | 'blue' | 'amber' | 'red' | 'purple' } {
  if (score >= 85) return { label: 'Excellent', tone: 'green' }
  if (score >= 70) return { label: 'Baik (Good)', tone: 'blue' }
  if (score >= 50) return { label: 'Cukup (Okay)', tone: 'amber' }
  if (score >= 25) return { label: 'Kurang (Poor)', tone: 'red' }
  return { label: 'Tidak Layak (Worst)', tone: 'purple' }
}

function loadResults(): SusResult[] {
  try {
    return JSON.parse(localStorage.getItem(SUS_STORAGE_KEY) || '[]') as SusResult[]
  } catch {
    return []
  }
}

function SUS() {
  const initial: SusAnswer[] = questions.map((_, i) => ({ id: i + 1, rating: 0 }))
  const [answers, setAnswers] = React.useState<SusAnswer[]>(initial)
  const [results, setResults] = React.useState<SusResult[]>(() => loadResults())
  const [submitted, setSubmitted] = React.useState<SusResult | null>(null)

  const setRating = (id: number, rating: number) => {
    setAnswers(prev => prev.map(a => (a.id === id ? { ...a, rating } : a)))
  }

  const allFilled = answers.every(a => a.rating > 0)

  const submit = () => {
    if (!allFilled) return
    const result: SusResult = {
      id: `sus${Date.now()}`,
      answers: answers.map(a => ({ ...a })),
      score: computeSusScore(answers),
      completedAt: new Date().toISOString(),
    }
    const next = [result, ...results]
    localStorage.setItem(SUS_STORAGE_KEY, JSON.stringify(next))
    setResults(next)
    setSubmitted(result)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearHistory = () => {
    localStorage.removeItem(SUS_STORAGE_KEY)
    setResults([])
  }

  const latest = results.length > 0 ? results[0] : null
  const average = results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length) : 0

  const downloadJson = () => {
    const payload = {
      app: 'PyLearn AI',
      instrument: 'System Usability Scale (SUS)',
      results,
      average,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pylearn-sus-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const fmt = (iso: string) => new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })

  return (
    <div>
      <PageHeader
        title="Evaluasi Sistem (SUS)"
        subtitle="System Usability Scale — kuesioner standar untuk mengukur kegunaan aplikasi"
        action={
          <button onClick={downloadJson} disabled={results.length === 0} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-40">
            <Download className="w-4 h-4" /> Ekspor
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Skor Terakhir</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {latest ? latest.score : '—'}
              </p>
              {latest && <Badge tone={susCategory(latest.score).tone}><Activity className="w-3 h-3 mr-1" />{susCategory(latest.score).label}</Badge>}
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center">
              <Gauge className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Rata-rata</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{results.length ? average : '—'}</p>
              <p className="text-xs text-gray-400 mt-1">{results.length} pengisian</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Nilai Maksimal</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">100</p>
              <p className="text-xs text-gray-400 mt-1">Skor &ge; 70 dianggap dapat diterima</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {submitted && (
        <Card className="p-6 mb-6 border-green-300 dark:border-green-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">Terima kasih atas penilaian Anda!</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Skor SUS Anda: <strong>{submitted.score}</strong> dari 100 —{' '}
                <Badge tone={susCategory(submitted.score).tone}>{susCategory(submitted.score).label}</Badge>
              </p>
              <p className="text-xs text-gray-400 mt-1">Dikirim pada {fmt(submitted.completedAt)}</p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kuesioner */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <ClipboardCheck className="w-5 h-5 text-indigo-500" />
            <h2 className="font-semibold text-gray-900 dark:text-white">Kuesioner SUS</h2>
          </div>
          <p className="text-xs text-gray-500 mb-5 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" /> Beri nilai 1 (Sangat Tidak Setuju) sampai 5 (Sangat Setuju) untuk setiap pernyataan berdasarkan pengalaman menggunakan PyLearn AI.
          </p>

          <div className="space-y-5">
            {questions.map((q, idx) => {
              const a = answers[idx]
              const odd = a.id % 2 === 1
              return (
                <div key={a.id} className="pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{a.id}.</span> {q}
                    </p>
                    <Badge tone={odd ? 'blue' : 'gray'}>{odd ? 'Positif' : 'Negatif'}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[1, 2, 3, 4, 5].map(v => (
                      <button
                        key={v}
                        onClick={() => setRating(a.id, v)}
                        title={ratingLabels[v - 1]}
                        className={`w-11 h-11 rounded-xl border text-sm font-semibold transition-colors ${
                          a.rating === v
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow'
                            : 'bg-white/70 dark:bg-white/10 backdrop-blur border-gray-300 dark:border-gray-600 text-gray-500 hover:border-indigo-400'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1.5">{a.rating ? ratingLabels[a.rating - 1] : 'Pilih satu nilai'}</p>
                </div>
              )
            })}
          </div>

          <button
            onClick={submit}
            disabled={!allFilled}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-40"
          >
            <CheckCircle2 className="w-4 h-4" /> {allFilled ? 'Kirim & Hitung Skor' : `Lengkapi semua pernyataan (${answers.filter(a => a.rating > 0).length}/10)`}
          </button>

          <div className="mt-6 bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-gray-500 mb-2">Cara Menghitung Skor SUS</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Pernyataan bernomor ganjil (positif): kontribusi = <strong>nilai − 1</strong>. Pernyataan bernomor genap (negatif): kontribusi = <strong>5 − nilai</strong>.
              Jumlah seluruh kontribusi dikalikan <strong>2,5</strong> menghasilkan skor 0–100. Skor di atas 70 menunjukkan kegunaan yang dapat diterima.
            </p>
          </div>
        </Card>

        {/* Riwayat */}
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-500" />
                <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Riwayat Pengisian</h2>
              </div>
              {results.length > 0 && (
                <button onClick={clearHistory} className="text-gray-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            {results.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-6">Belum ada pengisian. Selesaikan kuesioner untuk melihat hasilnya.</p>
            ) : (
              <div className="space-y-3">
                {results.map(r => (
                  <div key={r.id} className="p-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{r.score}</p>
                      <Badge tone={susCategory(r.score).tone}>{susCategory(r.score).label}</Badge>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">{fmt(r.completedAt)}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Interpretasi Skor</h2>
            <div className="space-y-2">
              {[
                ['85 – 100', 'Excellent (Sangat Baik)'],
                ['70 – 84', 'Good (Baik)'],
                ['50 – 69', 'Okay (Cukup)'],
                ['25 – 49', 'Poor (Kurang)'],
                ['0 – 24', 'Worst (Tidak Layak)'],
              ].map(([range, label]) => (
                <div key={range} className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{label}</span>
                  <Badge tone="gray">{range}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SUS