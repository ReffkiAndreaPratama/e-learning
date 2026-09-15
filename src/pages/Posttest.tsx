import { QuizRunner } from '../components/QuizRunner'
import { posttestQuestions } from '../data/quizzes'

function Posttest() {
  return (
    <QuizRunner
      questions={posttestQuestions}
      type="posttest"
      title="Posttest"
      subtitle="Kerjakan 10 soal setelah menyelesaikan materi untuk melihat peningkatan pemahamanmu."
      options={{ showTimer: true }}
    />
  )
}

export default Posttest