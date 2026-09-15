import { Link } from 'react-router-dom'
import { Clock, FileQuestion, Target, Bot, AlertTriangle, BarChart3 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { materials } from '../data/materials'
import { quizzes } from '../data/quizzes'
import { Card, PageHeader, StatCard } from '../components/ui'

function Analytics() {
  const { topicProgress, exerciseResults, quizResults, aiConversations, pretestResult, posttestResult } = useApp()

  const totalStudyHours = Math.round((quizResults.reduce((a, r) => a + (r.timeSpent || 0), 0) + exerciseResults.length * 2) / 60 * 10) / 10

  const quizCounts = Object.values(topicProgress).filter(tp => tp.quizScore !== undefined).length
  const quizAvg = (() => {
    const scores = Object.values(topicProgress).filter(tp => tp.quizScore !== undefined).map(tp => tp.quizScore!)
    if (!scores.length) return 0
    return Math.round(scores.reduce((a, b) => a + b) / scores.length)
  })()

  // Topic weakness analysis
  const topicAnalysis = materials.map(m => {
    const correctByTopic = quizzes[m.id] ? exerciseResults.filter(r => r.topicId === m.id && r.correct).length : 0
    const totalByTopic = exerciseResults.filter(r => r.topicId === m.id).length
    return {
      topic: m,
      score: topicProgress[m.id]?.quizScore,
      correct: correctByTopic,
      total: totalByTopic,
      accuracy: totalByTopic ? Math.round((correctByTopic / totalByTopic) * 100) : null,
    }
  })

  const weakest = topicAnalysis
    .filter(t => t.score !== undefined || t.accuracy !== null)
    .sort((a, b) => {
      const sa = a.score ?? a.accuracy ?? 100
      const sb = b.score ?? b.accuracy ?? 100
      return sa - sb
    })[0]

  return (
    <div>
      <PageHeader
        title="Learning Analytics"
        subtitle="Statistik dan analisis perilaku belajarmu"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Clock className="w-5 h-5" />} label="Total Study Time" value={`${totalStudyHours} jam`} sub="Waktu aktif belajar" tone="blue" />
        <StatCard icon={<FileQuestion className="w-5 h-5" />} label="Soal Dikerjakan" value={`${exerciseResults.length + quizCounts * 10}`} sub="Latihan + quiz" tone="green" />
        <StatCard icon={<Target className="w-5 h-5" />} label="Average Quiz" value={`${quizAvg}%`} sub={`${quizCounts} quiz`} tone="amber" />
        <StatCard icon={<Bot className="w-5 h-5" />} label="Pertanyaan AI Tutor" value={`${aiConversations.length}`} sub="Konsultasi belajar" tone="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Accuracy chart */}
        <Card className="p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Akurasi Latihan per Topik</h2>
          <p className="text-xs text-gray-500 mb-4">Persentase jawaban benar dari latihan yang dikerjakan</p>
          <div className="space-y-3">
            {topicAnalysis.map(({ topic, accuracy }) => (
              <div key={topic.id}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300 flex items-center gap-1.5">{topic.icon} {topic.title}</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{accuracy ?? 0}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${(accuracy ?? 0) >= 70 ? 'bg-green-500' : (accuracy ?? 0) >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${accuracy ?? 0}%` }}
                  />
                </div>
              </div>
            ))}
            {exerciseResults.length === 0 && (
              <p className="text-sm text-gray-500 pt-2">Belum ada data latihan. <Link to="/latihan" className="text-indigo-600">Mulai latihan →</Link></p>
            )}
          </div>
        </Card>

        {/* Weakest topic */}
        <Card className="p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Analisis Topik Lemah</h2>
          <p className="text-xs text-gray-500 mb-4">Identifikasi otomatis berdasarkan nilai quiz & akurasi latihan</p>
          {weakest ? (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{weakest.topic.title}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Skor terendah: <strong className="text-amber-600">{weakest.score !== undefined ? `${weakest.score}% (quiz)` : `${weakest.accuracy ?? 0}% (latihan)`}</strong>
                </p>
                <Link to={`/materi/${weakest.topic.id}`} className="mt-2 inline-block text-sm text-indigo-600 dark:text-indigo-400">Revisi materi →</Link>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Kerjakan quiz dan latihan untuk mendapatkan analisis.</p>
          )}

          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 mt-6">Aktivitas AI Tutor</h3>
          <div className="space-y-2 max-h-44 overflow-y-auto">
            {aiConversations.length === 0 ? (
              <p className="text-sm text-gray-500">Belum ada pertanyaan ke AI Tutor.</p>
            ) : (
              aiConversations.slice(-8).reverse().map((c, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10">
                  <Bot className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-700 dark:text-gray-200 truncate">{c.question}</p>
                    <p className="text-xs text-gray-400">{new Date(c.timestamp).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Pretest/Posttest comparison */}
      {(pretestResult || posttestResult) && (
        <Card className="p-6 mt-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Perbandingan Pretest vs Posttest</h2>
          <div className="grid grid-cols-3 gap-4 items-end max-w-xl">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Pretest</p>
              <div className="flex items-end justify-center h-32">
                <div className="w-20 bg-gray-300 dark:bg-gray-600 rounded-t-lg relative" style={{ height: `${pretestResult?.score || 0}%`, minHeight: '8px' }}>
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-bold text-gray-700 dark:text-gray-200">{pretestResult?.score || 0}%</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Posttest</p>
              <div className="flex items-end justify-center h-32">
                <div className="w-20 bg-indigo-500 rounded-t-lg relative" style={{ height: `${posttestResult?.score || 0}%`, minHeight: '8px' }}>
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-bold text-indigo-600 dark:text-indigo-400">{posttestResult?.score || 0}%</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Peningkatan</p>
              <p className="text-3xl font-extrabold text-green-600 mt-4">
                {pretestResult && posttestResult ? `+${posttestResult.score - pretestResult.score}` : '—'}
              </p>
              {pretestResult && posttestResult && <p className="text-xs text-gray-400">poin</p>}
            </div>
          </div>
        </Card>
      )}

      <Card className="p-5 mt-6 flex items-start gap-3">
        <BarChart3 className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
        <p className="text-sm text-gray-500">
          Catatan evaluasi: Data di atas adalah <strong>contoh hasil evaluasi kelompok pengguna yang diuji</strong>. Peningkatan skor bukan bukti kausal eksperimental; untuk klaim ilmiah diperlukan desain eksperimen terkontrol.
        </p>
      </Card>
    </div>
  )
}

export default Analytics