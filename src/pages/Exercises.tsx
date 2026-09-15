import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, XCircle, RotateCcw, ChevronRight, Trophy, BookOpen } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { exercises } from '../data/exercises'
import { materials } from '../data/materials'
import { Card, Badge, CodeBlock, PageHeader, ProgressBar } from '../components/ui'

type Phase = 'select' | 'working' | 'done'

function Exercises() {
  const location = useLocation()
  const navigate = useNavigate()
  const { recordExercise, exerciseResults } = useApp()

  const initialTopic = (location.state as { topicId?: string })?.topicId

  const [phase, setPhase] = React.useState<Phase>(initialTopic ? 'working' : 'select')
  const [selectedTopic, setSelectedTopic] = React.useState<string>(initialTopic || 'pengenalan-python')
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [selected, setSelected] = React.useState<number | null>(null)
  const [answered, setAnswered] = React.useState(false)
  const [correctCount, setCorrectCount] = React.useState(0)

  const topicQuestions = exercises.filter(e => e.topicId === selectedTopic)
  const question = topicQuestions[currentIndex]

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopic(topicId)
    setPhase('working')
    setCurrentIndex(0)
    setSelected(null)
    setAnswered(false)
    setCorrectCount(0)
    window.scrollTo(0, 0)
  }

  const handleAnswer = (idx: number) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    const correct = idx === question.correctIndex
    if (correct) setCorrectCount(c => c + 1)
    recordExercise(question.id, idx, correct, question.topicId)
  }

  const handleNext = () => {
    if (currentIndex < topicQuestions.length - 1) {
      setCurrentIndex(i => i + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setPhase('done')
    }
    window.scrollTo(0, 0)
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSelected(null)
    setAnswered(false)
    setCorrectCount(0)
    setPhase('working')
  }

  const topic = materials.find(m => m.id === selectedTopic)

  // Select phase
  if (phase === 'select') {
    return (
      <div>
        <PageHeader title="Latihan Soal" subtitle="Pilih topik lalu kerjakan soal-soal latihan. Dapatkan feedback langsung setiap jawaban." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map(m => {
            const questions = exercises.filter(e => e.topicId === m.id)
            const doneCount = questions.filter(q => exerciseResults.some(r => r.exerciseId === q.id)).length
            const pct = Math.round((doneCount / questions.length) * 100)
            return (
              <button
                key={m.id}
                onClick={() => handleSelectTopic(m.id)}
                className="text-left bg-white/70 dark:bg-white/10 backdrop-blur rounded-2xl border border-white/40 dark:border-white/10 p-5 hover:border-indigo-300 dark:hover:border-indigo-800 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{m.icon}</span>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{m.title}</h3>
                <p className="text-xs mt-2 text-gray-500 flex items-center justify-between">
                  <span>{questions.length} soal</span>
                  {doneCount > 0 && <span className="text-indigo-500">{pct}%</span>}
                </p>
                {doneCount > 0 && <ProgressBar value={pct} className="mt-2" />}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Done phase
  if (phase === 'done') {
    const pct = Math.round((correctCount / topicQuestions.length) * 100)
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latihan Selesai!</h2>
          <p className="text-sm text-gray-500 mt-2">Topik: <strong>{topic?.title}</strong></p>

          <div className="my-6">
            <div className="flex items-center justify-center gap-6">
              <div>
                <p className="text-4xl font-extrabold text-green-600">{pct}%</p>
                <p className="text-xs text-gray-500 mt-1">Nilai</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-gray-900 dark:text-white">{correctCount}/{topicQuestions.length}</p>
                <p className="text-xs text-gray-500 mt-1">Benar</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-red-500">{topicQuestions.length - correctCount}</p>
                <p className="text-xs text-gray-500 mt-1">Salah</p>
              </div>
            </div>
            <div className="w-full max-w-xs mx-auto mt-4">
              <ProgressBar value={pct} color={pct >= 70 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'} />
            </div>
            <p className="text-sm text-gray-500 mt-3">
              {pct >= 80 ? 'Luar biasa! Pemahamanmu sangat baik. 🌟' : pct >= 60 ? 'Bagus! Sedikit lagi menuju sempurna. 💪' : 'Tetap semangat! Coba pelajari materi lalu ulangi latihan. 📚'}
          </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={handleRestart} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">
              <RotateCcw className="w-4 h-4" /> Ulangi Latihan
            </button>
            <Link to={`/materi/${selectedTopic}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur border border-white/40 dark:border-white/10 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-white/80 dark:hover:bg-white/10">
              <BookOpen className="w-4 h-4" /> Pelajari Materi
            </Link>
            <button onClick={() => navigate('/quiz', { state: { topicId: selectedTopic } })} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700">
              Lanjut Quiz <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Card>
      </div>
    )
  }

  // Working phase
  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <PageHeader
          title={`Latihan: ${topic?.title}`}
          subtitle={`${currentIndex + 1} dari ${topicQuestions.length} soal`}
          action={
            <button onClick={() => setPhase('select')} className="text-sm text-gray-500 hover:text-indigo-600">
              Ganti topik
            </button>
          }
        />

        <ProgressBar value={((currentIndex) / topicQuestions.length) * 100} className="mb-6" />

        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <Badge tone="blue">{typeLabel(question.type)}</Badge>
            <span className="text-sm text-gray-400">Soal {currentIndex + 1}/{topicQuestions.length}</span>
          </div>

          <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">{question.question}</p>

          {question.codeSnippet && (
            <div className="mt-4">
              <CodeBlock code={question.codeSnippet} />
            </div>
          )}

          <div className="mt-6 space-y-3">
            {question.options.map((opt, idx) => {
              let state = 'idle'
              if (answered) {
                if (idx === question.correctIndex) state = 'correct'
                else if (idx === selected) state = 'wrong'
                else state = 'idle'
              } else if (selected === idx) {
                state = 'selected'
              }
              const styles: Record<string, string> = {
                idle: 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30',
                selected: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50',
                correct: 'border-green-500 bg-green-50 dark:bg-green-950/30',
                wrong: 'border-red-500 bg-red-50 dark:bg-red-950/30',
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={answered}
                  className={`w-full text-left flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${styles[state]} ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0 ${
                    state === 'correct' ? 'bg-green-500 text-white' :
                    state === 'wrong' ? 'bg-red-500 text-white' :
                    state === 'selected' ? 'bg-indigo-500 text-white' :
                    'bg-white/60 dark:bg-white/10 backdrop-blur border border-white/40 dark:border-white/10 text-gray-500 dark:text-gray-300'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-200">{opt}</span>
                  {state === 'correct' && <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto shrink-0" />}
                  {state === 'wrong' && <XCircle className="w-5 h-5 text-red-500 ml-auto shrink-0" />}
                </button>
              )
            })}
          </div>

          {answered && (
            <div className={`mt-5 rounded-xl p-4 ${selected === question.correctIndex ? 'bg-green-50 dark:bg-green-950/30' : 'bg-amber-50 dark:bg-amber-950/30'}`}>
              <p className={`text-sm font-semibold mb-1 ${selected === question.correctIndex ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {selected === question.correctIndex ? '✅ Benar!' : '❌ Belum tepat.'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{question.explanation}</p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            {!answered ? (
              <p className="text-xs text-gray-400">Pilih salah satu jawaban di atas</p>
            ) : (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
              >
                {currentIndex < topicQuestions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil'} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

function typeLabel(t: string) {
  const map: Record<string, string> = {
    'multiple-choice': 'Pilihan Ganda',
    'true-false': 'Benar / Salah',
    'code-completion': 'Lengkapi Kode',
    'output-prediction': 'Tebak Output',
    debugging: 'Debugging',
  }
  return map[t] || t
}

export default Exercises