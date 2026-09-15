import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  BookOpen,
  Bot,
  Timer,
  BarChart3,
} from 'lucide-react'
import type { QuizQuestion, QuizResult } from '../types'
import { useApp } from '../context/AppContext'
import { materials } from '../data/materials'
import { analyzeQuizFeedback } from '../lib/aiTutor'
import { Card, Badge, ProgressBar, CodeBlock } from '../components/ui'

interface QuizRunnerProps {
  questions: QuizQuestion[]
  topicId?: string
  type: 'quiz' | 'pretest' | 'posttest'
  title: string
  subtitle: string
  options?: { showTimer?: boolean }
}

type Phase = 'intro' | 'working' | 'result'

const PASSING_GRADE = 70

export function QuizRunner({ questions, topicId, type, title, subtitle }: QuizRunnerProps) {
  const navigate = useNavigate()
  const { saveQuizResult } = useApp()

  const [phase, setPhase] = React.useState<Phase>('intro')
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [answers, setAnswers] = React.useState<number[]>([])
  const [selected, setSelected] = React.useState<number | null>(null)
  const [reviewMode, setReviewMode] = React.useState(false)
  const [timeStart] = React.useState(() => Date.now())
  const [elapsed, setElapsed] = React.useState(0)
  const [result, setResult] = React.useState<QuizResult | null>(null)

  React.useEffect(() => {
    if (phase !== 'working') return
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - timeStart) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [phase, timeStart])

  const question = questions[currentIndex]
  const answeredCount = answers.filter(a => a !== -1).length

  const startQuiz = () => {
    setAnswers(new Array(questions.length).fill(-1))
    setCurrentIndex(0)
    setSelected(-1)
    setPhase('working')
    window.scrollTo(0, 0)
  }

  const selectAnswer = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    setAnswers(prev => {
      const copy = [...prev]
      copy[currentIndex] = idx
      return copy
    })
  }

  const next = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1)
      setSelected(-1)
    } else {
      submit()
    }
    window.scrollTo(0, 0)
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1)
      setSelected(answers[currentIndex - 1])
    }
  }

  const submit = () => {
    const correct = questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0)
    const wrong = questions.length - correct
    const score = Math.round((correct / questions.length) * 100)
    const res: QuizResult = {
      id: `${type}-${Date.now()}`,
      topicId,
      type,
      score,
      totalQuestions: questions.length,
      correctAnswers: correct,
      wrongAnswers: wrong,
      answers: [...answers],
      completedAt: new Date().toISOString(),
      timeSpent: Math.floor((Date.now() - timeStart) / 1000),
    }
    setResult(res)
    saveQuizResult(res)

    // Identify weak topics based on wrong answers
    if (wrong > 0 && topicId) {
      // Trigger AI feedback analysis via normalization below
      localStorage.setItem('pylearn_last_weak', JSON.stringify({
        topicId,
        wrongQuestionIds: questions.filter((_, i) => answers[i] !== questions[i].correctIndex).map(q => q.id),
      }))
    }
    setPhase('result')
    window.scrollTo(0, 0)
  }

  const restart = () => {
    setPhase('intro')
    setResult(null)
    setReviewMode(false)
    setAnswers([])
    setCurrentIndex(0)
    setSelected(null)
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}m ${sec.toString().padStart(2, '0')}s`
  }

  /* ===== INTRO ===== */
  if (phase === 'intro') {
    const topicInfo = topicId ? materials.find(m => m.id === topicId) : null
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className="text-sm text-gray-500 mt-2 mb-6">{subtitle}</p>

          {topicInfo && <Badge tone="blue">{topicInfo.icon} {topicInfo.title}</Badge>}

          <div className="grid grid-cols-3 gap-3 my-6">
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{questions.length}</p>
              <p className="text-xs text-gray-500">Soal</p>
            </div>
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{PASSING_GRADE}%</p>
              <p className="text-xs text-gray-500">Passing Grade</p>
            </div>
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">10</p>
              <p className="text-xs text-gray-500">Menit</p>
            </div>
          </div>

          <div className="text-left bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 rounded-xl p-4 mb-6">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Aturan:</p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Jawab setiap soal sesuai pemahamanmu</li>
              <li>• Tidak ada jawaban otomatis dilewati (boleh kembali ke soal sebelumnya)</li>
              <li>• Nilai dihitung otomatis setelah submit</li>
              <li>• Hasil disimpan ke progress belajarmu</li>
            </ul>
          </div>

          <button onClick={startQuiz} className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
            Mulai {title} <ArrowRight className="w-4 h-4" />
          </button>
        </Card>
      </div>
    )
  }

  /* ===== RESULT ===== */
  if (phase === 'result' && result) {
    const passed = result.score >= PASSING_GRADE

    // AI feedback analysis
    let feedbackMessage = ''
    let recommendations: string[] = []
    if (type === 'quiz' && topicId) {
      const topicName = materials.find(m => m.id === topicId)?.title || ''
      const wrongCount = result.wrongAnswers
      if (wrongCount === 0) {
        feedbackMessage = 'Sempurna! Kamu menguasai materi ini dengan sangat baik. 🎉'
        recommendations = ['Lanjut ke materi berikutnya', 'Coba kerjakan soal di halaman Latihan']
      } else {
        const { message, recommendations: recs } = analyzeQuizFeedback([topicName], result.score)
        feedbackMessage = message
        recommendations = recs
      }
    }

    return (
      <div className="max-w-3xl mx-auto">
        {!reviewMode ? (
          <>
            <Card className={`p-8 text-center ${passed ? 'border-green-200 dark:border-green-900' : 'border-amber-200 dark:border-amber-900'}`}>
              <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${passed ? 'bg-green-100 dark:bg-green-950' : 'bg-amber-100 dark:bg-amber-950'}`}>
                <Trophy className={`w-8 h-8 ${passed ? 'text-green-600' : 'text-amber-500'}`} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hasil {title}</h2>
              <p className="text-sm text-gray-500 mt-1 mb-4">{topicId ? materials.find(m => m.id === topicId)?.title : subtitle}</p>

              <div className="my-6">
                <div className={`text-6xl font-extrabold ${passed ? 'text-green-600' : 'text-amber-500'}`}>{result.score}%</div>
                <Badge tone={passed ? 'green' : 'amber'}>{passed ? '✅ Lulus' : 'Belum Lulus'}</Badge>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold text-green-600">{result.correctAnswers}</p>
                  <p className="text-xs text-gray-500">Benar</p>
                </div>
                <div className="bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold text-red-500">{result.wrongAnswers}</p>
                  <p className="text-xs text-gray-500">Salah</p>
                </div>
                <div className="bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatTime(result.timeSpent || 0)}</p>
                  <p className="text-xs text-gray-500">Waktu</p>
                </div>
              </div>
            </Card>

            {/* AI Feedback */}
            {type === 'quiz' && topicId && (
              <Card className="p-6 mt-4 border-purple-200 dark:border-purple-900">
                <div className="flex items-center gap-2 mb-3">
                  <Bot className="w-5 h-5 text-purple-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">AI Feedback</h3>
                  <Badge tone="purple">Analisis Otomatis</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{feedbackMessage}</p>
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Rekomendasi:</p>
                  <ul className="space-y-1.5">
                    {recommendations.map((r, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => navigate(`/materi/${topicId}`)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">
                    <BookOpen className="w-4 h-4" /> Pelajari {topicId.split('-').map(c => c[0]).join('').toUpperCase().slice(0, 4)} Materi
                  </button>
                  <button onClick={() => navigate('/ai-tutor')} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
                    <Bot className="w-4 h-4" /> Tanya AI Tutor
                  </button>
                </div>
              </Card>
            )}

            {/* Pretest/Posttest comparison */}
            {type === 'posttest' && (
              <Card className="p-6 mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Perbandingan Pretest vs Posttest</h3>
                </div>
                <ExistingComparison />
                <p className="text-xs text-gray-400 mt-4">*Hasil ini adalah contoh evaluasi pengguna yang diuji (data demo), bukan bukti kausal eksperimental.</p>
              </Card>
            )}

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <button onClick={() => setReviewMode(true)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur border border-white/40 dark:border-white/10 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-white/80 dark:hover:bg-white/10">
                Review Answers
              </button>
              <button onClick={restart} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">
                <RotateCcw className="w-4 h-4" /> Ulangi Quiz
              </button>
              {(type === 'quiz' || type === 'pretest') && (
                <button onClick={() => navigate('/quiz')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur border border-white/40 dark:border-white/10 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-white/80 dark:hover:bg-white/10">
                  Materi Berikutnya
                </button>
              )}
              <button onClick={() => navigate('/dashboard')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-semibold hover:bg-gray-200">
                Ke Dashboard
              </button>
            </div>
          </>
        ) : (
          <ReviewAnswers questions={questions} answers={result.answers} onBack={() => setReviewMode(false)} />
        )}
      </div>
    )
  }

  /* ===== WORKING ===== */
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Badge tone="blue">Question {currentIndex + 1} of {questions.length}</Badge>
        <span className="flex items-center gap-1.5 text-sm text-gray-500"><Timer className="w-4 h-4" /> {formatTime(elapsed)}</span>
      </div>

      <ProgressBar value={(answeredCount / questions.length) * 100} className="mb-6" />

      <Card className="p-6 sm:p-8">
        <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
          <span className="mr-2 text-indigo-500 font-bold">{currentIndex + 1}.</span>
          {question.question}
        </p>

        {question.codeSnippet && (
          <div className="mt-4">
            <CodeBlock code={question.codeSnippet} />
          </div>
        )}

        <div className="mt-6 space-y-3">
          {question.options.map((opt, idx) => {
            const isSelected = selected === idx
            return (
              <button
                key={idx}
                onClick={() => selectAnswer(idx)}
                disabled={selected !== null}
                className={`w-full text-left flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50'
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30'
                } ${selected !== null ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0 ${
                  isSelected ? 'bg-indigo-500 text-white' : 'bg-white/60 dark:bg-white/10 backdrop-blur border border-white/40 dark:border-white/10 text-gray-500 dark:text-gray-300'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">{opt}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:hover:text-gray-500"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>
          <button
            onClick={next}
            disabled={selected === null}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-40"
          >
            {currentIndex === questions.length - 1 ? 'Submit Quiz' : 'Next'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Card>
    </div>
  )
}

function ReviewAnswers({ questions, answers, onBack }: { questions: QuizQuestion[]; answers: number[]; onBack: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Review Jawaban</h2>
        <button onClick={onBack} className="text-sm text-indigo-600 hover:underline">← Kembali ke Hasil</button>
      </div>
      <div className="space-y-4">
        {questions.map((q, i) => {
          const userAnswer = answers[i]
          const correct = userAnswer === q.correctIndex
          return (
            <Card key={q.id} className="p-5">
              <div className="flex items-start gap-3">
                {correct ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{q.question}</p>
                  {q.codeSnippet && <CodeBlock code={q.codeSnippet} />}
                  <div className="mt-3 space-y-1.5 text-sm">
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="text-gray-400">Jawabanmu: </span>
                      <span className={correct ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>{(q.options[userAnswer] ?? '-')}</span>
                    </p>
                    {!correct && (
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="text-gray-400">Jawaban benar: </span>
                        <span className="text-green-600 font-medium">{q.options[q.correctIndex]}</span>
                      </p>
                    )}
                    <p className="text-gray-500 mt-2 bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 rounded-lg p-3 text-xs">{q.explanation}</p>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function ExistingComparison() {
  const { pretestResult, posttestResult } = useApp()
  const pretest = pretestResult?.score ?? 0
  const posttest = posttestResult?.score ?? 0
  const increase = posttest - pretest

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 items-end mb-4">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Pretest</p>
          <div className="flex items-end justify-center h-32">
            <div className="w-20 bg-gray-300 dark:bg-gray-600 rounded-t-lg relative" style={{ height: `${pretest}%`, minHeight: '8px' }}>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-bold text-gray-700 dark:text-gray-200">{pretest}%</span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Posttest</p>
          <div className="flex items-end justify-center h-32">
            <div className="w-20 bg-indigo-500 rounded-t-lg relative" style={{ height: `${posttest}%`, minHeight: '8px' }}>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-bold text-indigo-600 dark:text-indigo-400">{posttest}%</span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Peningkatan</p>
          <div className="flex items-center justify-center h-32">
            <div className={`text-2xl font-extrabold ${increase >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {increase >= 0 ? '+' : ''}{increase} poin
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizRunner