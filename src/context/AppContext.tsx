import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { AIMessage, QuizResult, User, UserState } from '../types'
import { materials } from '../data/materials'
import { hashPassword, isHashed, verifyPassword } from '../lib/crypto'

const STORAGE_KEY = 'pylearn_ai_state_v1'

const defaultAchievements = [
  { id: 'first-lesson', name: 'First Lesson', description: 'Menyelesaikan materi pertama', icon: '🎯', earned: false },
  { id: 'streak', name: 'Learning Streak', description: 'Belajar 3 hari berturut-turut', icon: '🔥', earned: false },
  { id: 'perfect-quiz', name: 'Perfect Quiz', description: 'Mendapat nilai 100 di quiz', icon: '💯', earned: false },
  { id: 'pseudo-beginner', name: 'PseudoBeginner', description: 'Menyelesaikan 4 materi', icon: '💡', earned: false },
  { id: 'ai-explorer', name: 'AI Explorer', description: 'Bertanya kepada AI Tutor 10 kali', icon: '🤖', earned: false },
  { id: 'playground-master', name: 'Playground Master', description: 'Menjalankan kode di playground', icon: '💻', earned: false },
]

interface AppContextType extends UserState {
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  loginDemo: () => void
  logout: () => void
  completeSubTopic: (topicId: string, subTopicId: string) => void
  markTopicDone: (topicId: string) => void
  recordExercise: (exerciseId: string, answer: number, correct: boolean, topicId: string) => void
  saveQuizResult: (result: QuizResult, wrongTopicIds?: string[]) => void
  addAIMessage: (message: string, role: 'user' | 'assistant') => void
  clearChat: () => void
  setCurrentTopic: (topicId: string) => void
  setDarkMode: (on: boolean) => void
  resetProgress: () => void
  updateProfile: (name: string) => void
  recordPlaygroundRun: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

function loadState(): UserState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        ...emptyState(),
        ...parsed,
        achievements: defaultAchievements.map(da => {
          const existing = (parsed.achievements || []).find((a: typeof da) => a.id === da.id)
          return existing ? { ...da, ...existing } : da
        }),
      }
    }
  } catch (e) {
    console.warn('Gagal memuat state:', e)
  }
  return emptyState()
}

function emptyState(): UserState {
  return {
    user: null,
    isAuthenticated: false,
    topicProgress: {},
    quizResults: [],
    exerciseResults: [],
    pretestResult: null,
    posttestResult: null,
    aiMessages: [],
    aiConversations: [],
    achievements: defaultAchievements,
    darkMode: false,
    currentTopic: 'pengenalan-python',
    streak: 0,
    lastStudyDate: '',
  }
}

interface AppProviderProps {
  children: React.ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, setState] = useState<UserState>(() => loadState())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [state.darkMode])

  const updateToday = (s: UserState): UserState => {
    const today = new Date().toISOString().split('T')[0]
    if (s.lastStudyDate === today) return s
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    const streak = s.lastStudyDate === yesterday ? s.streak + 1 : 1
    return { ...s, streak, lastStudyDate: today }
  }

  const login = (email: string, password: string): boolean => {
    const emailTrimmed = email.trim().toLowerCase()
    const users = JSON.parse(localStorage.getItem('pylearn_ai_users') || '[]') as User[]
    const matched = users.find(u => u.email.toLowerCase() === emailTrimmed)
    if (!matched) return false
    const passwords = JSON.parse(localStorage.getItem('pylearn_ai_passwords') || '{}') as Record<string, string>
    const stored = passwords[matched.id]
    if (typeof stored !== 'string' || stored === '') return false
    if (isHashed(stored)) {
      if (!verifyPassword(password, stored)) return false
    } else {
      if (stored !== password) return false
      passwords[matched.id] = hashPassword(password)
      localStorage.setItem('pylearn_ai_passwords', JSON.stringify(passwords))
    }
    setState(prev => ({ ...prev, user: matched, isAuthenticated: true }))
    return true
  }

  const register = (name: string, email: string, password: string): boolean => {
    const nameClean = name.trim().slice(0, 60)
    const emailClean = email.trim().toLowerCase().slice(0, 120)
    if (!nameClean || !emailClean) return false
    const users = JSON.parse(localStorage.getItem('pylearn_ai_users') || '[]') as User[]
    if (users.some(u => u.email.toLowerCase() === emailClean)) return false
    const newUser: User = { id: `u${Date.now()}`, name: nameClean, email: emailClean, createdAt: new Date().toISOString() }
    const passwords = JSON.parse(localStorage.getItem('pylearn_ai_passwords') || '{}') as Record<string, string>
    passwords[newUser.id] = hashPassword(password)
    users.push(newUser)
    localStorage.setItem('pylearn_ai_users', JSON.stringify(users))
    localStorage.setItem('pylearn_ai_passwords', JSON.stringify(passwords))
    setState(prev => ({ ...prev, user: newUser, isAuthenticated: true }))
    return true
  }

  const loginDemo = () => {
    const demoUser: User = {
      id: 'demo',
      name: 'Andi Pratama',
      email: 'demo@pseudolearn.ai',
      createdAt: new Date().toISOString(),
      isDemo: true,
    }
    setState(() => {
      const demo = emptyState()
      demo.user = demoUser
      demo.isAuthenticated = true
      demo.topicProgress = {
        'pengenalan-python': { topicId: 'pengenalan-python', subTopicsCompleted: ['apa-itu-python', 'karakteristik-python', 'struktur-program', 'fungsi-print'], exercisesCompleted: 5, exercisesCorrect: 4, quizScore: 90, lastAccessed: new Date().toISOString(), completed: true },
        'variabel-tipe-data': { topicId: 'variabel-tipe-data', subTopicsCompleted: ['pengertian-variabel', 'tipe-data', 'konversi-tipe'], exercisesCompleted: 4, exercisesCorrect: 3, quizScore: 85, lastAccessed: new Date().toISOString(), completed: true },
        operator: { topicId: 'operator', subTopicsCompleted: ['operator-aritmatika', 'operator-perbandingan', 'operator-logika'], exercisesCompleted: 4, exercisesCorrect: 3, quizScore: 80, lastAccessed: new Date().toISOString(), completed: true },
        'input-output': { topicId: 'input-output', subTopicsCompleted: ['fungsi-print-lanjutan', 'fungsi-input'], exercisesCompleted: 3, exercisesCorrect: 2, quizScore: 75, lastAccessed: new Date().toISOString(), completed: false },
        percabangan: { topicId: 'percabangan', subTopicsCompleted: ['if-else', 'elif'], exercisesCompleted: 2, exercisesCorrect: 1, quizScore: 70, lastAccessed: new Date().toISOString(), completed: false },
        perulangan: { topicId: 'perulangan', subTopicsCompleted: ['for-loop'], exercisesCompleted: 2, exercisesCorrect: 1, lastAccessed: new Date().toISOString(), completed: false },
        fungsi: { topicId: 'fungsi', subTopicsCompleted: [], exercisesCompleted: 0, exercisesCorrect: 0, lastAccessed: new Date().toISOString(), completed: false },
        'list-dictionary': { topicId: 'list-dictionary', subTopicsCompleted: [], exercisesCompleted: 0, exercisesCorrect: 0, lastAccessed: new Date().toISOString(), completed: false },
      }
      demo.pretestResult = { id: 'pretest-demo', type: 'pretest', score: 60, totalQuestions: 10, correctAnswers: 6, wrongAnswers: 4, answers: [], completedAt: new Date().toISOString() }
      demo.posttestResult = { id: 'posttest-demo', type: 'posttest', score: 85, totalQuestions: 10, correctAnswers: 8, wrongAnswers: 2, answers: [], completedAt: new Date().toISOString() }
      demo.aiMessages = [
        { id: 'm1', role: 'assistant', content: 'Halo! Saya AI Tutor. Konsep pemrograman apa yang ingin kamu pelajari?', timestamp: new Date().toISOString() },
        { id: 'm2', role: 'user', content: 'Apa perbedaan break dan continue?', timestamp: new Date().toISOString() },
        { id: 'm3', role: 'assistant', content: '**keluar** menghentikan perulangan sepenuhnya, sedangkan **lanjut** hanya melewati iterasi saat ini.\n\nContoh:\n```pseudoCode\nuntuk i <- 1 sampai 5\n  jika i = 3 maka\n    keluar      # berhenti total, hasilnya 1 2\n  akhirjika\n  tulis(i)\nakhiruntuk\n\nuntuk i <- 1 sampai 5\n  jika i = 3 maka\n    lanjut      # lewati 3, hasilnya 1 2 4 5\n  akhirjika\n  tulis(i)\nakhiruntuk\n```', timestamp: new Date().toISOString() },
      ]
      demo.aiConversations = [
        { question: 'Apa perbedaan break dan continue?', topic: 'perulangan', timestamp: new Date().toISOString() },
        { question: 'Jelaskan elif', topic: 'percabangan', timestamp: new Date().toISOString() },
        { question: 'Cara pakai dictionary', topic: 'list-dictionary', timestamp: new Date().toISOString() },
      ]
      demo.streak = 4
      demo.lastStudyDate = new Date().toISOString().split('T')[0]
      demo.achievements = defaultAchievements.map(a => {
        if (a.id === 'first-lesson') return { ...a, earned: true, earnedAt: new Date().toISOString() }
        if (a.id === 'pseudo-beginner') return { ...a, earned: true, earnedAt: new Date().toISOString() }
        if (a.id === 'ai-explorer') return { ...a, earned: true, earnedAt: new Date().toISOString(), progress: 3, maxProgress: 10 }
        return { ...a, progress: a.id === 'streak' ? 4 : a.id === 'perfect-quiz' ? 0 : a.id === 'playground-master' ? 3 : 0, maxProgress: a.id === 'streak' ? 3 : a.id === 'perfect-quiz' ? 1 : a.id === 'playground-master' ? 5 : 4 }
      })
      demo.quizResults = [
        { id: 'qz1', type: 'quiz', topicId: 'pengenalan-python', score: 90, totalQuestions: 10, correctAnswers: 9, wrongAnswers: 1, answers: [], completedAt: new Date().toISOString() },
        { id: 'qz2', type: 'quiz', topicId: 'variabel-tipe-data', score: 85, totalQuestions: 10, correctAnswers: 8, wrongAnswers: 2, answers: [], completedAt: new Date().toISOString() },
        { id: 'qz3', type: 'quiz', topicId: 'operator', score: 80, totalQuestions: 10, correctAnswers: 8, wrongAnswers: 2, answers: [], completedAt: new Date().toISOString() },
        { id: 'qz4', type: 'quiz', topicId: 'input-output', score: 75, totalQuestions: 10, correctAnswers: 7, wrongAnswers: 3, answers: [], completedAt: new Date().toISOString() },
      ]
      demo.currentTopic = 'perulangan'
      return updateToday(demo)
    })
  }

  const logout = () => {
    setState(prev => ({ ...prev, user: null, isAuthenticated: false }))
  }

  const completeSubTopic = (topicId: string, subTopicId: string) => {
    setState(prev => {
      const tp = prev.topicProgress[topicId]
      const subTopicsCompleted = tp ? [...tp.subTopicsCompleted] : []
      if (!subTopicsCompleted.includes(subTopicId)) subTopicsCompleted.push(subTopicId)
      const topic = materials.find(m => m.id === topicId)
      const done = topic ? subTopicsCompleted.length >= topic.subTopics.length : false
      return updateToday({
        ...prev,
        topicProgress: {
          ...prev.topicProgress,
          [topicId]: {
            topicId,
            subTopicsCompleted,
            exercisesCompleted: tp?.exercisesCompleted ?? 0,
            exercisesCorrect: tp?.exercisesCorrect ?? 0,
            quizScore: tp?.quizScore,
            lastAccessed: new Date().toISOString(),
            completed: done,
          },
        },
        currentTopic: topicId,
      })
    })
  }

  const markTopicDone = (topicId: string) => {
    setState(prev => {
      const topic = materials.find(m => m.id === topicId)
      const tp = prev.topicProgress[topicId]
      const subTopicsCompleted = topic ? topic.subTopics.map(s => s.id) : (tp?.subTopicsCompleted ?? [])
      return updateToday({
        ...prev,
        topicProgress: {
          ...prev.topicProgress,
          [topicId]: {
            topicId,
            subTopicsCompleted,
            exercisesCompleted: tp?.exercisesCompleted ?? 0,
            exercisesCorrect: tp?.exercisesCorrect ?? 0,
            quizScore: tp?.quizScore,
            lastAccessed: new Date().toISOString(),
            completed: true,
          },
        },
        currentTopic: topicId,
      })
    })
  }

  const recordExercise = (exerciseId: string, answer: number, correct: boolean, topicId: string) => {
    setState(prev => {
      const tp = prev.topicProgress[topicId]
      return updateToday({
        ...prev,
        exerciseResults: [...prev.exerciseResults, { exerciseId, answer, correct, topicId, timestamp: new Date().toISOString() }],
        topicProgress: {
          ...prev.topicProgress,
          [topicId]: {
            topicId,
            subTopicsCompleted: tp?.subTopicsCompleted ?? [],
            exercisesCompleted: (tp?.exercisesCompleted ?? 0) + 1,
            exercisesCorrect: (tp?.exercisesCorrect ?? 0) + (correct ? 1 : 0),
            quizScore: tp?.quizScore,
            lastAccessed: new Date().toISOString(),
            completed: tp?.completed ?? false,
          },
        },
        currentTopic: topicId,
      })
    })
  }

  const saveQuizResult = (result: QuizResult, _wrongTopicIds: string[] = []) => {
    setState(prev => {
      const next = { ...prev }
      const outdatedAchievements = prev.achievements.map(a => ({ ...a }))

      if (result.type === 'pretest') {
        next.pretestResult = result
      } else if (result.type === 'posttest') {
        next.posttestResult = result
      } else if (result.type === 'quiz' && result.topicId) {
        const tp = prev.topicProgress[result.topicId]
        next.topicProgress = {
          ...prev.topicProgress,
          [result.topicId]: {
            topicId: result.topicId,
            subTopicsCompleted: tp?.subTopicsCompleted ?? [],
            exercisesCompleted: tp?.exercisesCompleted ?? 0,
            exercisesCorrect: tp?.exercisesCorrect ?? 0,
            quizScore: result.score,
            lastAccessed: new Date().toISOString(),
            completed: true,
          },
        }
        if (result.score === 100) {
          const pa = outdatedAchievements.find(a => a.id === 'perfect-quiz')
          if (pa) { pa.earned = true; pa.earnedAt = new Date().toISOString(); pa.progress = 1; pa.maxProgress = 1 }
        }
      }

      const completedCount = materials.filter(m => (next.topicProgress[m.id])?.completed).length
      if (completedCount >= 4) {
        const pa = outdatedAchievements.find(a => a.id === 'pseudo-beginner')
        if (pa) { pa.earned = true; pa.earnedAt = new Date().toISOString(); pa.progress = 4; pa.maxProgress = 4 }
      }
      if (completedCount >= 1) {
        const first = outdatedAchievements.find(a => a.id === 'first-lesson')
        if (first) { first.earned = true; first.earnedAt = new Date().toISOString(); first.progress = 1; first.maxProgress = 1 }
      }

      // Streak achievement
      if (prev.streak >= 3) {
        const sa = outdatedAchievements.find(a => a.id === 'streak')
        if (sa && !sa.earned) { sa.earned = true; sa.earnedAt = new Date().toISOString() }
      }

      const aiExplorer = outdatedAchievements.find(a => a.id === 'ai-explorer')
      if (aiExplorer && prev.aiConversations.length >= 10 && !aiExplorer.earned) {
        aiExplorer.earned = true
        aiExplorer.earnedAt = new Date().toISOString()
        aiExplorer.progress = 10
        aiExplorer.maxProgress = 10
      }

      return updateToday({
        ...next,
        achievements: outdatedAchievements.map(a => {
          if (a.id === 'streak') { a.progress = prev.streak; a.maxProgress = 3 }
          if (a.id === 'ai-explorer') a.progress = prev.aiConversations.length
          return a
        }),
      } as UserState)
    })
  }

  const addAIMessage = (message: string, role: 'user' | 'assistant') => {
    setState(prev => {
      const msg: AIMessage = { id: `am${Date.now()}`, role, content: message, timestamp: new Date().toISOString() }
      const aiExplorer = prev.achievements.map(a => ({ ...a }))
      if (role === 'user') {
        const conv = { question: message, topic: prev.currentTopic, timestamp: new Date().toISOString() }
        const conversations = [...prev.aiConversations, conv]
        const exp = aiExplorer.find(a => a.id === 'ai-explorer')
        if (exp && conversations.length >= 10 && !exp.earned) {
          exp.earned = true
          exp.earnedAt = new Date().toISOString()
          exp.progress = 10
          exp.maxProgress = 10
        }
        return updateToday({ ...prev, aiMessages: [...prev.aiMessages, msg], aiConversations: conversations, achievements: aiExplorer })
      }
      return { ...prev, aiMessages: [...prev.aiMessages, msg] }
    })
  }

  const clearChat = () => setState(prev => ({ ...prev, aiMessages: [] }))

  const setCurrentTopic = (topicId: string) => setState(prev => ({ ...prev, currentTopic: topicId }))

  const setDarkMode = (on: boolean) => setState(prev => ({ ...prev, darkMode: on }))

  const resetProgress = () => {
    setState(prev => ({
      ...prev,
      topicProgress: {},
      quizResults: [],
      exerciseResults: [],
      pretestResult: null,
      posttestResult: null,
      aiConversations: [],
      achievements: defaultAchievements,
      streak: 0,
      lastStudyDate: '',
    }))
  }

  const updateProfile = (name: string) => {
    setState(prev => prev.user ? { ...prev, user: { ...prev.user, name } } : prev)
  }

  const recordPlaygroundRun = () => {
    setState(prev => {
      const pa = prev.achievements.map(a => ({ ...a }))
      const pg = pa.find(a => a.id === 'playground-master')
      if (pg) {
        pg.progress = (pg.progress ?? 0) + 1
        pg.maxProgress = 5
        if (pg.progress >= 5 && !pg.earned) { pg.earned = true; pg.earnedAt = new Date().toISOString() }
      }
      return { ...prev, achievements: pa }
    })
  }

  const value = useMemo(() => ({
    ...state,
    login,
    register,
    loginDemo,
    logout,
    completeSubTopic,
    markTopicDone,
    recordExercise,
    saveQuizResult,
    addAIMessage,
    clearChat,
    setCurrentTopic,
    setDarkMode,
    resetProgress,
    updateProfile,
    recordPlaygroundRun,
  }), [state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}