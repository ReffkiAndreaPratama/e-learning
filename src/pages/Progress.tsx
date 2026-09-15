import { Link } from 'react-router-dom'
import { BarChart3, BookOpen, Target, AlertTriangle, Bot, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { materials } from '../data/materials'
import { exercises } from '../data/exercises'
import { Card, ProgressBar, PageHeader, Badge, StatCard } from '../components/ui'

function Progress() {
  const { topicProgress, exerciseResults, quizResults, pretestResult, posttestResult, aiConversations } = useApp()

  const completed = materials.filter(m => topicProgress[m.id]?.completed).length
  const overallPct = Math.round((completed / materials.length) * 100)

  const quizScores = Object.values(topicProgress).filter(tp => tp.quizScore !== undefined).map(tp => tp.quizScore!)
  const quizAvg = quizScores.length ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0

  const exerciseTypes = exercises.map(e => e.id)
  const completedEx = exerciseTypes.filter(id => exerciseResults.some(r => r.exerciseId === id)).length
  const practicePct = Math.round((completedEx / exerciseTypes.length) * 100)

  const totalStudyMins = quizResults.reduce((acc, r) => acc + (r.timeSpent || 0), 0) + exerciseResults.length * 2
  const studyHours = Math.floor(totalStudyMins / 60)
  const studyMins = totalStudyMins % 60

  const weakTopic = materials
    .filter(m => topicProgress[m.id]?.quizScore !== undefined)
    .sort((a, b) => (topicProgress[a.id]!.quizScore ?? 0) - (topicProgress[b.id]!.quizScore ?? 0))[0]

  return (
    <div>
      <PageHeader
        title="Progress Belajar"
        subtitle="Pantau kemajuan belajarmu secara menyeluruh"
        action={
          <Link to="/analytics" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">
            <BarChart3 className="w-4 h-4" /> Learning Analytics
          </Link>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<TrendUpIcon />} label="Overall Progress" value={`${overallPct}%`} sub={`${completed}/${materials.length} materi`} tone="indigo" />
        <StatCard icon={<BookOpen className="w-5 h-5" />} label="Materi Selesai" value={`${completed}/${materials.length}`} sub="Dari 8 topik" tone="blue" />
        <StatCard icon={<Target className="w-5 h-5" />} label="Quiz Average" value={`${quizAvg}%`} sub={`${quizScores.length} quiz dikerjakan`} tone="green" />
        <StatCard icon={<Bot className="w-5 h-5" />} label="AI Tutor" value={`${aiConversations.length} tanya`} sub="Konsultasi belajar" tone="purple" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Overall progress */}
          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Ringkasan</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10">
                <p className="text-xl font-bold text-gray-900 dark:text-white">{studyHours}h {studyMins}m</p>
                <p className="text-xs text-gray-500 mt-1">Total Waktu Belajar</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10">
                <p className="text-xl font-bold text-gray-900 dark:text-white">{exerciseResults.length}</p>
                <p className="text-xs text-gray-500 mt-1">Soal Dikerjakan</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10">
                <p className="text-xl font-bold text-gray-900 dark:text-white">{quizResults.length + (pretestResult ? 1 : 0) + (posttestResult ? 1 : 0)}</p>
                <p className="text-xs text-gray-500 mt-1">Total Quiz</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10">
                <p className="text-xl font-bold text-green-600">{practicePct}%</p>
                <p className="text-xs text-gray-500 mt-1">Latihan Dikerjakan</p>
              </div>
            </div>

            {weakTopic && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">Weak Topic terdeteksi</p>
                  <p className="text-sm text-amber-600 dark:text-amber-400 mt-0.5">
                    Nilai quiz terendah kamu di <strong>{weakTopic.title}</strong> ({topicProgress[weakTopic.id]?.quizScore}%). Disarankan mengulang materi ini.
                  </p>
                  <Link to={`/materi/${weakTopic.id}`} className="mt-2 inline-flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400">
                    Pelajari kembali <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </Card>

          {/* Per topic */}
          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Progress per Topik</h2>
            <div className="space-y-4">
              {materials.map(m => {
                const tp = topicProgress[m.id]
                const subPct = tp ? Math.round((tp.subTopicsCompleted.length / m.subTopics.length) * 100) : 0
                const exDone = exercises.filter(e => e.topicId === m.id && exerciseResults.some(r => r.exerciseId === e.id)).length
                const exTotal = exercises.filter(e => e.topicId === m.id).length
                const exPct = exTotal ? Math.round((exDone / exTotal) * 100) : 0
                return (
                  <div key={m.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span>{m.icon}</span>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{m.title}</span>
                        {tp?.completed && <Badge tone="green">selesai</Badge>}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 shrink-0">
                        <span>Sub: {subPct}%</span>
                        <span>·</span>
                        <span>Latihan: {exPct}%</span>
                        {tp?.quizScore !== undefined && (
                          <>
                            <span>·</span>
                            <span className={tp.quizScore >= 70 ? 'text-green-600 font-semibold' : 'text-amber-500 font-semibold'}>
                              Quiz: {tp.quizScore}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <ProgressBar value={Math.round((subPct + exPct) / 2)} className="h-1.5" />
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Pretest vs posttest */}
          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Evaluasi Pretest vs Posttest</h2>
            <div className="grid grid-cols-3 gap-4 items-end">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">Pretest</p>
                <div className="flex items-end justify-center h-28">
                  <div className="w-16 bg-gray-300 dark:bg-gray-600 rounded-t-lg relative" style={{ height: `${pretestResult?.score || 0}%`, minHeight: '6px' }}>
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-700 dark:text-gray-200">{pretestResult?.score || 0}%</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">Posttest</p>
                <div className="flex items-end justify-center h-28">
                  <div className="w-16 bg-indigo-500 rounded-t-lg relative" style={{ height: `${posttestResult?.score || 0}%`, minHeight: '6px' }}>
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-indigo-600 dark:text-indigo-400">{posttestResult?.score || 0}%</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">Peningkatan</p>
                <p className="text-2xl font-extrabold text-green-600">
                  {pretestResult && posttestResult ? `+${posttestResult.score - pretestResult.score} poin` : '—'}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">*Data merupakan hasil evaluasi pengguna pada sampel yang diuji (data demo), bukan bukti kausal eksperimental.</p>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Weak topics list */}
          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Weak Topics</h2>
            {weakTopic ? (
              <div className="space-y-3">
                {materials
                  .filter(m => topicProgress[m.id]?.quizScore !== undefined && topicProgress[m.id]!.quizScore! < 80)
                  .map(m => (
                    <Link key={m.id} to={`/materi/${m.id}`} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" /> {m.title}
                      <span className="ml-auto font-semibold text-amber-500">{topicProgress[m.id]?.quizScore}%</span>
                    </Link>
                  ))}
                {materials.filter(m => topicProgress[m.id]?.quizScore !== undefined && topicProgress[m.id]!.quizScore! < 80).length === 0 && (
                  <p className="text-sm text-gray-500">Tidak ada topik lemah. Bagus! 👏</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Belum ada data quiz. Kerjakan quiz untuk melihat analisis topik lemahmu.</p>
            )}
          </Card>

          {/* Recent quiz results */}
          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Riwayat Quiz</h2>
            {quizResults.length === 0 && !pretestResult && !posttestResult ? (
              <p className="text-sm text-gray-500">Belum ada quiz yang dikerjakan.</p>
            ) : (
              <div className="space-y-2">
                {pretestResult && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Pretest</span>
                    <Badge tone="blue">{pretestResult.score}%</Badge>
                  </div>
                )}
                {posttestResult && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Posttest</span>
                    <Badge tone="blue">{posttestResult.score}%</Badge>
                  </div>
                )}
                {quizResults.map(r => {
                  const m = materials.find(m => m.id === r.topicId)
                  return (
                    <div key={r.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 truncate mr-2">{m ? m.title : 'Quiz'}</span>
                      <span className={r.score >= 70 ? 'text-green-600 font-semibold' : 'text-amber-500 font-semibold'}>{r.score}%</span>
                    </div>
                  )
                })}
              </div>
            )}
          </Card>

          {/* Practice progress */}
          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Latihan Dikerjakan</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">{completedEx}/{exerciseTypes.length} soal</span>
              <span className="text-sm font-semibold text-indigo-600">{practicePct}%</span>
            </div>
            <ProgressBar value={practicePct} />
          </Card>
        </div>
      </div>
    </div>
  )
}

function TrendUpIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941" />
    </svg>
  )
}

export default Progress