import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Target,
  Terminal,
  Bot,
  FileQuestion,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { materials } from '../data/materials'
import { executePython } from '../lib/pythonRunner'
import { Card, Badge, ProgressBar, CodeBlock } from '../components/ui'

function MaterialDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { completeSubTopic, topicProgress } = useApp()

  const topic = materials.find(m => m.id === id)

  const [activeSub, setActiveSub] = React.useState(0)
  const [practiceInput, setPracticeInput] = React.useState('')
  const [practiceResult, setPracticeResult] = React.useState<{ output: string; error: boolean } | null>(null)
  const [practiceAttempts, setPracticeAttempts] = React.useState(0)
  const [practiceSolved, setPracticeSolved] = React.useState(false)

  React.useEffect(() => {
    focusSub('#tujuan')
    setActiveSub(0)
    setPracticeResult(null)
    setPracticeSolved(false)
    setPracticeAttempts(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!topic) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">Materi tidak ditemukan.</p>
        <Link to="/materi" className="text-indigo-600 font-medium">← Kembali ke Materi</Link>
      </div>
    )
  }

  const tp = topicProgress[topic.id]
  const progressPct = tp ? Math.round((tp.subTopicsCompleted.length / topic.subTopics.length) * 100) : 0
  const subtopic = topic.subTopics[activeSub]
  const hasPrev = activeSub > 0
  const hasNext = activeSub < topic.subTopics.length - 1

  const isCompleted = (stId: string) => tp?.subTopicsCompleted.includes(stId) || false

  const focusSub = (idStr: string) => {
    setTimeout(() => {
      const el = document.getElementById(idStr)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const handlePracticeRun = () => {
    if (!practiceInput.trim()) {
      setPracticeResult({ output: '', error: true })
      return
    }
    const result = executePython(practiceInput)
    setPracticeResult({ output: result.output, error: result.error })
    setPracticeAttempts(a => a + 1)
    if (!result.error && result.output.trim().length > 0) {
      setPracticeSolved(true)
    }
  }

  const handleMarkSection = (subId: string) => {
    completeSubTopic(topic.id, subId)
    if (hasNext) {
      setActiveSub(activeSub + 1)
      focusSub('#tujuan')
    }
  }

  const goToQuiz = () => navigate('/quiz', { state: { topicId: topic.id } })

  return (
    <div>
      {/* Header */}
      <Link to="/materi" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 mb-4">
        <ChevronLeft className="w-4 h-4" /> Semua Materi
      </Link>

      <div className="flex items-start gap-4 flex-wrap mb-6">
        <div className="w-14 h-14 flex items-center justify-center text-3xl bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl shrink-0">{topic.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-400">MATERI {String(topic.number).padStart(2, '0')}</span>
            <Badge tone={topic.difficulty === 'Beginner' ? 'green' : 'purple'}>{topic.difficulty}</Badge>
            {tp?.completed && <Badge tone="green">Selesai</Badge>}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{topic.title}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{topic.description}</p>
        </div>
        <div className="w-full sm:w-48">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span><span className="font-semibold">{progressPct}%</span>
          </div>
          <ProgressBar value={progressPct} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        {/* Subtopic nav */}
        <div className="hidden lg:block">
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur rounded-2xl border border-white/40 dark:border-white/10 p-4 sticky top-6">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Daftar Submateri</p>
            <div className="space-y-1">
              <button
                onClick={() => { setActiveSub(0); focusSub('#tujuan') }}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm ${activeSub === -1 ? '' : ''} hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300`}
              >
                <Target className="w-4 h-4 text-indigo-500 shrink-0" /> Tujuan
              </button>
              {topic.subTopics.map((st, i) => (
                <button
                  key={st.id}
                  onClick={() => { setActiveSub(i); focusSub('#tujuan') }}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSub === i
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {isCompleted(st.id) ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-300 shrink-0" />
                  )}
                  <span className="truncate">{st.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          {/* Learning objectives */}
          <div id="tujuan" className="scroll-mt-24">
              <Card className="p-6 mb-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-500" /> Tujuan Pembelajaran
            </h2>
            <ul className="space-y-2">
              {topic.subTopics.map(st => (
                <li key={st.id} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                  Memahami <strong className="ml-1">{st.title.toLowerCase()}</strong>
                </li>
              ))}
            </ul>
          </Card>
          </div>

          {/* Subtopic content */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {subtopic.title}
              </h2>
              {isCompleted(subtopic.id) && <Badge tone="green">Selesai</Badge>}
            </div>

            <div className="prose-sm space-y-3">
              {subtopic.content.split('\n').map((line, i) => {
                if (line.trim() === '') return <div key={i} className="h-2" />
                if (line.trim().startsWith('# ')) {
                  return <h3 key={i} className="font-semibold text-gray-800 dark:text-gray-200 text-base mt-5">{line.trim().slice(2)}</h3>
                }
                if (line.startsWith('  ')) {
                  return (
                    <p key={i} className="pl-4 text-sm text-gray-600 dark:text-gray-400 border-l-2 border-indigo-100 dark:border-indigo-900">
                      {line.trim()}
                    </p>
                  )
                }
                if (line.trim().startsWith('1. ')) {
                  return <p key={i} className="text-sm text-gray-600 dark:text-gray-300 pl-4">{line.trim()}</p>
                }
                if (line.trim().startsWith('2. ')) {
                  return <p key={i} className="text-sm text-gray-600 dark:text-gray-300 pl-4">{line.trim()}</p>
                }
                if (line.trim().startsWith('3. ')) {
                  return <p key={i} className="text-sm text-gray-600 dark:text-gray-300 pl-4">{line.trim()}</p>
                }
                if (/^\d+\./.test(line.trim())) {
                  return <p key={i} className="text-sm text-gray-600 dark:text-gray-300 pl-4">{line.trim()}</p>
                }
                return <p key={i} className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{line}</p>
              })}
            </div>

            {subtopic.codeExample && (
              <div className="mt-5">
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> Contoh Kode
                </p>
                <CodeBlock code={subtopic.codeExample} />
                {subtopic.output && (
                  <div className="mt-2 bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1.5 font-medium">Output:</p>
                    <pre className="text-sm text-green-600 dark:text-green-400 font-mono whitespace-pre-wrap">{subtopic.output}</pre>
                  </div>
                )}
              </div>
            )}

            {/* Interactive practice */}
            {subtopic.interactiveExercise && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400">Interactive Practice</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{subtopic.interactiveExercise.instruction}</p>
                <CodeBlock code={subtopic.interactiveExercise.templateCode} />
                <p className="text-xs text-gray-400 mt-3 mb-1.5">Coba modifikasi kode di bawah lalu jalankan:</p>
                <textarea
                  value={practiceInput}
                  onChange={e => setPracticeInput(e.target.value)}
                  rows={4}
                  spellCheck={false}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-900 text-gray-100 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="nama = 'Budi'
print(f'Halo, {nama}!')"
                />
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={handlePracticeRun} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">
                    ▶ Jalankan
                  </button>
                  <button onClick={() => setPracticeInput(subtopic.interactiveExercise!.templateCode)} className="px-4 py-2 rounded-lg bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-white/80 dark:hover:bg-white/10">
                    Reset
                  </button>
                </div>
                {practiceResult && (
                  <div className={`mt-3 rounded-xl p-4 ${practiceResult.error ? 'bg-red-50 dark:bg-red-950/30' : 'bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10'}`}>
                    <p className="text-xs text-gray-500 mb-1.5">{practiceResult.error ? 'Error:' : 'Output:'}</p>
                    <pre className={`text-sm font-mono whitespace-pre-wrap ${practiceResult.error ? 'text-red-600' : 'text-green-600 dark:text-green-400'}`}>
                      {practiceResult.error ? 'Terdapat kesalahan pada kode.' : (practiceResult.output || '(tidak ada output)')}
                    </pre>
                  </div>
                )}
                {practiceAttempts >= 1 && practiceSolved && !practiceResult?.error && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 className="w-4 h-4" /> Bagus! Kode berhasil dijalankan.
                  </div>
                )}
              </div>
            )}

            {/* Mark complete */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleMarkSection(subtopic.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isCompleted(subtopic.id)
                    ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {isCompleted(subtopic.id) ? 'Submateri Selesai' : 'Tandai Selesai'}
              </button>
              {hasNext && (
                <button
                  onClick={() => { setActiveSub(activeSub + 1); focusSub('#tujuan') }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
                >
                  Lanjut ke: {topic.subTopics[activeSub + 1].title} <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </Card>

          {/* Summary */}
          <Card className="p-6 mb-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Ringkasan Materi</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{topic.summary}</p>
          </Card>

          {/* Actions */}
          <Card className="p-6 mb-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Evaluasi Pemahaman</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link to={`/latihan`} state={{ topicId: topic.id }} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors">
                <FileQuestion className="w-6 h-6 text-indigo-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Latihan</span>
              </Link>
              <button onClick={goToQuiz} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors">
                <Target className="w-6 h-6 text-indigo-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Quiz Materi</span>
              </button>
              <Link to="/ai-tutor" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors">
                <Bot className="w-6 h-6 text-purple-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Tanya AI Tutor</span>
              </Link>
            </div>
          </Card>

          {/* Prev / Next */}
          <div className="flex justify-between items-center">
            {hasPrev ? (
              <button
                onClick={() => { setActiveSub(activeSub - 1); focusSub('#tujuan') }}
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600"
              >
                <ChevronLeft className="w-4 h-4" /> {topic.subTopics[activeSub - 1].title}
              </button>
            ) : <span />}
            {!hasNext && (
              <Link
                to={tp?.completed ? '/quiz' : '/materi'}
                state={tp?.completed ? { topicId: topic.id } : undefined}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
              >
                {tp?.completed ? `Kerjakan Quiz ${topic.title}` : 'Lanjut ke Materi Berikutnya'} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            {hasNext && (
              <button
                onClick={() => { setActiveSub(activeSub + 1); focusSub('#tujuan') }}
                className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Lanjut <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="h-16" />
    </div>
  )
}

export default MaterialDetail