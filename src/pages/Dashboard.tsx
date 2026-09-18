import { Link } from 'react-router-dom'
import {
  TrendingUp,
  BookOpen,
  Target,
  Flame,
  ArrowRight,
  Bot,
  Play,
  FileEdit,
  ClipboardList,
  Terminal,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { materials } from '../data/materials'
import { Card, ProgressBar, Badge, StatCard } from '../components/ui'

function Dashboard() {
  const { user, topicProgress, pretestResult, posttestResult, streak, setCurrentTopic } = useApp()

  const overallProgress = () => {
    const total = materials.length
    const done = materials.filter(m => topicProgress[m.id]?.completed).length
    return Math.round((done / total) * 100)
  }

  const completedMaterialCount = materials.filter(m => topicProgress[m.id]?.completed).length

  const lastQuizScore = Math.max(...Object.values(topicProgress).map(tp => tp.quizScore ?? 0), 0)

  const quizMax = Object.values(topicProgress).filter(tp => tp.quizScore !== undefined).length

  const continueTopic = () => {
    const inProgress = materials.filter(m => {
      const tp = topicProgress[m.id]
      return tp && !tp.completed
    })
    if (inProgress.length > 0) return inProgress[0]
    const notStarted = materials.find(m => !topicProgress[m.id])
    return notStarted || materials[0]
  }

  const continueM = continueTopic()
  const contTp = topicProgress[continueM?.id]
  const contProgress = contTp ? Math.round((contTp.subTopicsCompleted.length / continueM.subTopics.length) * 100) : 0

  const weakTopics = materials.filter(m => {
    const tp = topicProgress[m.id]
    return tp?.quizScore !== undefined && tp.quizScore < 70
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Selamat datang, {user?.name} 👋</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Lanjutkan pembelajaran pemrograman-mu.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Progress Belajar" value={`${overallProgress()}%`} sub={`${completedMaterialCount}/${materials.length} materi`} tone="indigo" />
        <StatCard icon={<BookOpen className="w-5 h-5" />} label="Materi Selesai" value={`${completedMaterialCount}/${materials.length}`} sub="Materi Pemrograman" tone="blue" />
        <StatCard icon={<Target className="w-5 h-5" />} label="Rata-rata Quiz" value={`${quizMax > 0 ? Math.round(lastQuizScore) : 0}%`} sub="Terakhir dikerjakan" tone="amber" />
        <StatCard icon={<Flame className="w-5 h-5" />} label="Streak Belajar" value={`${streak} hari`} sub="Tetap konsisten!" tone="green" />
      </div>

      {/* Overall progress */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 dark:text-white">Progress Keseluruhan</h2>
          <span className="text-sm font-bold text-indigo-600">{overallProgress()}%</span>
        </div>
        <ProgressBar value={overallProgress()} />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>{completedMaterialCount} dari {materials.length} materi selesai</span>
          <span>{Math.round((completedMaterialCount / materials.length) * 100)}% lengkap</span>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Continue learning */}
          {continueM && (
            <Card className="p-6">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Lanjutkan Belajar</h2>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="w-14 h-14 flex items-center justify-center text-3xl bg-white/60 dark:bg-white/10 backdrop-blur border border-white/40 dark:border-white/10 rounded-xl shrink-0">
                  {continueM.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">{continueM.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Progress {contProgress}% · {contTp?.subTopicsCompleted.length}/{continueM.subTopics.length} submateri
                  </p>
                  <ProgressBar value={contProgress} className="mt-2 max-w-xs" />
                </div>
                <button
                  onClick={() => setCurrentTopic(continueM.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
                >
                  <Link to={`/materi/${continueM.id}`} className="flex items-center gap-2">Lanjutkan <ArrowRight className="w-4 h-4" /></Link>
                </button>
              </div>
            </Card>
          )}

          {/* Materials */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900 dark:text-white">Materi Pemrograman</h2>
              <Link to="/materi" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">Semua materi →</Link>
            </div>
            <div className="space-y-3">
              {materials.map(m => {
                const tp = topicProgress[m.id]
                const pct = tp ? Math.round((tp.subTopicsCompleted.length / m.subTopics.length) * 100) : 0
                return (
                  <Link
                    key={m.id}
                    to={`/materi/${m.id}`}
                    onClick={() => setCurrentTopic(m.id)}
                    className="block glass-card rounded-2xl p-4 hover:border-indigo-300/60 dark:hover:border-indigo-500/40 hover:-translate-y-0.5 hover:shadow-glass-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 flex items-center justify-center text-2xl bg-white/60 dark:bg-white/10 backdrop-blur border border-white/40 dark:border-white/10 rounded-xl shrink-0">{m.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono text-gray-400">{String(m.number).padStart(2, '0')}</span>
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{m.title}</h3>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{m.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <ProgressBar value={pct} className="max-w-[140px]" />
                          <span className="text-xs font-medium text-gray-500">{pct}%</span>
                          {tp?.completed && <Badge tone="green">Selesai</Badge>}
                          {!tp && <Badge>Belum dimulai</Badge>}
                          {tp && !tp.completed && <Badge tone="amber">Berlangsung</Badge>}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* AI Tutor promo */}
          <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-purple-600 to-indigo-600 shadow-xl shadow-purple-500/25">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-12 -right-8 w-40 h-40 rounded-full bg-white/15 blur-2xl animate-pulse-slow" />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Tutor</h3>
                <p className="text-xs text-indigo-100">Online siap membantu</p>
              </div>
            </div>
            <p className="text-sm text-indigo-50 leading-relaxed">Masih bingung dengan konsep pemrograman? Tanyakan langsung kepada AI Tutor.</p>
            <Link
              to={`/ai-tutor`}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-indigo-600 text-sm font-semibold hover:bg-indigo-50"
            >
              Tanya AI <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Recommendation */}
          {weakTopics.length > 0 && (
            <Card className="p-6">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Rekomendasi Belajar</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Disarankan mengulang materi{' '}
                <strong className="text-amber-600">{weakTopics.map(w => w.title).join(', ')}</strong> karena nilai quiz-nya masih di bawah 70%.
              </p>
              <Link to={`/materi/${weakTopics[0].id}`} className="mt-3 inline-flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                Pelajari ulang <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Card>
          )}

          {/* Test results */}
          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Hasil Evaluasi</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Pretest</span>
                <span className="font-bold text-gray-900 dark:text-white">{pretestResult ? `${pretestResult.score}%` : '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Posttest</span>
                <span className="font-bold text-gray-900 dark:text-white">{posttestResult ? `${posttestResult.score}%` : '—'}</span>
              </div>
              {pretestResult && posttestResult && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Peningkatan</span>
                  <span className="font-bold text-green-600">+{posttestResult.score - pretestResult.score} poin</span>
                </div>
              )}
            </div>
          </Card>

          {/* Quick access */}
          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Akses Cepat</h2>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/playground" className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-indigo-100/50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 transition-colors">
                <Terminal className="w-5 h-5" />
                <span className="text-xs font-medium">Playground</span>
              </Link>
              <Link to="/latihan" className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-indigo-100/50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 transition-colors">
                <FileEdit className="w-5 h-5" />
                <span className="text-xs font-medium">Latihan</span>
              </Link>
              <Link to="/quiz" className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-indigo-100/50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 transition-colors">
                <Target className="w-5 h-5" />
                <span className="text-xs font-medium">Quiz</span>
              </Link>
              <Link to="/ai-tutor" className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-indigo-100/50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 transition-colors">
                <Bot className="w-5 h-5" />
                <span className="text-xs font-medium">AI Tutor</span>
              </Link>
            </div>
          </Card>

          {/* Pretest/Posttest */}
          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Evaluasi Quick Access</h2>
            <div className="space-y-2">
              <Link to="/pretest" className="flex items-center justify-between p-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 hover:bg-indigo-100/50 dark:hover:bg-indigo-500/10 transition-colors">
                <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"><ClipboardList className="w-4 h-4 text-indigo-500" /> Pretest</span>
                <Badge tone={pretestResult ? 'green' : 'gray'}>{pretestResult ? `${pretestResult.score}%` : 'Belum'}</Badge>
              </Link>
              <Link to="/posttest" className="flex items-center justify-between p-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 hover:bg-indigo-100/50 dark:hover:bg-indigo-500/10 transition-colors">
                <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"><Play className="w-4 h-4 text-indigo-500" /> Posttest</span>
                <Badge tone={posttestResult ? 'green' : 'gray'}>{posttestResult ? `${posttestResult.score}%` : 'Belum'}</Badge>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard