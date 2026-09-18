import { Link } from 'react-router-dom'
import { ClipboardList, ArrowRight } from 'lucide-react'
import { QuizRunner } from '../components/QuizRunner'
import { pretestQuestions } from '../data/quizzes'

function Pretest() {
  return (
    <QuizRunner
      questions={pretestQuestions}
      type="pretest"
      title="Pretest"
      subtitle="Kerjakan 10 soal dasar pemrograman untuk mengukur kemampuan awalmu sebelum belajar."
    />
  )
}

export function PretestDone({ score }: { score: number }) {
  return (
    <div className="text-center py-10 max-w-2xl mx-auto">
      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mx-auto mb-4">
        <ClipboardList className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pretest Selesai!</h2>
      <p className="text-5xl font-extrabold text-gray-900 dark:text-white mt-4">{score}%</p>
      <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">Beberapa konsep yang perlu kamu perhatikan untuk meningkatkan pemahamanmu.</p>
      <Link to="/materi" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
        Mulai Pembelajaran <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

export default Pretest