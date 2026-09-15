export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
  isDemo?: boolean
}

export interface SubTopic {
  id: string
  title: string
  content: string
  codeExample?: string
  output?: string
  interactiveExercise?: InteractiveExercise
}

export interface InteractiveExercise {
  instruction: string
  templateCode: string
  expectedPattern: string
  hint: string
}

export interface Topic {
  id: string
  number: number
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate'
  estimatedMinutes: number
  icon: string
  subTopics: SubTopic[]
  summary: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  codeSnippet?: string
}

export interface QuizResult {
  id: string
  topicId?: string
  type: 'quiz' | 'pretest' | 'posttest'
  score: number
  totalQuestions: number
  correctAnswers: number
  wrongAnswers: number
  answers: number[]
  completedAt: string
  timeSpent?: number
}

export interface ExerciseQuestion {
  id: string
  type: 'multiple-choice' | 'true-false' | 'code-completion' | 'output-prediction' | 'debugging'
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  codeSnippet?: string
  topicId: string
}

export interface TopicProgress {
  topicId: string
  subTopicsCompleted: string[]
  exercisesCompleted: number
  exercisesCorrect: number
  quizScore?: number
  lastAccessed: string
  completed: boolean
}

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
  earnedAt?: string
  progress?: number
  maxProgress?: number
}

export interface UserState {
  user: User | null
  isAuthenticated: boolean
  topicProgress: Record<string, TopicProgress>
  quizResults: QuizResult[]
  exerciseResults: { exerciseId: string; answer: number; correct: boolean; topicId: string; timestamp: string }[]
  pretestResult: QuizResult | null
  posttestResult: QuizResult | null
  aiMessages: AIMessage[]
  aiConversations: { question: string; topic: string; timestamp: string }[]
  achievements: Achievement[]
  darkMode: boolean
  currentTopic: string
  streak: number
  lastStudyDate: string
}