import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Target } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { materials } from '../data/materials'
import { quizzes } from '../data/quizzes'
import { QuizRunner } from '../components/QuizRunner'
import { Card, PageHeader } from '../components/ui'

function QuizPage() {
  const location = useLocation()
  const { topicProgress } = useApp()
  const initialTopic = (location.state as { topicId?: string })?.topicId

  const [topicId, setTopicId] = React.useState<string | undefined>(initialTopic)

  if (topicId) {
    const questions = quizzes[topicId] || []
    const topic = materials.find(m => m.id === topicId)
    return (
      <QuizRunner
        questions={questions}
        topicId={topicId}
        type="quiz"
        title="Quiz"
        subtitle={`Uji pemahamanmu tentang ${topic?.title || 'materi ini'}`}
      />
    )
  }

  return (
    <div>
      <PageHeader title="Quiz" subtitle="Pilih materi untuk mengerjakan quiz. Passing grade 70%. Pilih materi lalu klik Quiz." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map(m => {
          const tp = topicProgress[m.id]
          return (
            <button
              key={m.id}
              onClick={() => setTopicId(m.id)}
              className="text-left bg-white/70 dark:bg-white/10 backdrop-blur rounded-2xl border border-white/40 dark:border-white/10 p-5 hover:border-indigo-300 dark:hover:border-indigo-800 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{m.icon}</span>
                <Target className="w-5 h-5 text-gray-300 group-hover:text-indigo-500" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{m.title}</h3>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-500">{(quizzes[m.id] || []).length} soal</span>
                {tp?.quizScore !== undefined ? (
                  <span className={`text-xs font-bold ${tp.quizScore >= 70 ? 'text-green-600' : 'text-amber-500'}`}>
                    {tp.quizScore >= 70 ? 'Lulus' : 'Ulangi'} · {tp.quizScore}%
                  </span>
                ) : (
                  <span className="text-xs text-indigo-500">Belum dikerjakan</span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <Card className="p-5 mt-6">
        <p className="text-sm text-gray-500">
          <strong className="text-gray-700 dark:text-gray-200">Catatan:</strong> Quiz berisi 10 soal pilihan ganda. Nilai minimal untuk lulus adalah 70%. Setelah selesai, kamu akan mendapat AI Feedback dan rekomendasi belajar.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link to="/latihan" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">Kerjakan latihan dulu? →</Link>
          <Link to="/pretest" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">Belum pretest? Mulai pretest →</Link>
        </div>
      </Card>
    </div>
  )
}

export default QuizPage