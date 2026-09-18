import React from 'react'
import { User, Mail, Calendar, TrendingUp, Target, Check, Pencil } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { materials } from '../data/materials'
import { Card, PageHeader, Badge, ProgressBar } from '../components/ui'

function Profile() {
  const { user, topicProgress, quizResults, achievements, streak, updateProfile } = useApp()
  const [editing, setEditing] = React.useState(false)
  const [name, setName] = React.useState(user?.name || '')

  const completed = materials.filter(m => topicProgress[m.id]?.completed).length
  const overall = Math.round((completed / materials.length) * 100)

  const quizScores = Object.values(topicProgress).filter(tp => tp.quizScore !== undefined).map(tp => tp.quizScore!)
  const quizAvg = quizScores.length ? Math.round(quizScores.reduce((a, b) => a + b) / quizScores.length) : 0

  const totalQuestions = materials.reduce((acc, m) => acc + m.subTopics.length, 0)
  const doneQuestions = materials.reduce((acc, m) => acc + (topicProgress[m.id]?.subTopicsCompleted.length || 0), 0)

  const earnedCount = achievements.filter(a => a.earned).length
  const initials = user?.name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()

  const saveName = () => {
    updateProfile(name)
    setEditing(false)
  }

  return (
    <div>
      <PageHeader title="Profile" subtitle="Informasi akun dan ringkasan belajar kamu" />

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 text-center h-fit">
          <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-300 mx-auto mb-3">
            {initials}
          </div>
          {editing ? (
            <div className="space-y-2 mb-2">
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="glass-input text-sm text-center"
                placeholder="Nama baru"
              />
              <div className="flex gap-2 justify-center">
                <button onClick={saveName} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium">
                  <Check className="w-4 h-4" /> Simpan
                </button>
                <button onClick={() => setEditing(false)} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm">
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
              {user?.isDemo && <Badge tone="amber" >Demo Account</Badge>}
            </div>
          )}
          <button onClick={() => setEditing(true)} className="inline-flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            <Pencil className="w-3.5 h-3.5" /> Edit Profile
          </button>

          <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{streak}</p>
              <p className="text-xs text-gray-500">Streak (hari)</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{user ? new Date(user.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' }) : '-'}</p>
              <p className="text-xs text-gray-500">Tergabung</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Ringkasan Belajar</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-gray-500">Progress Keseluruhan</span>
                  <span className="font-bold text-gray-900 dark:text-white">{overall}%</span>
                </div>
                <ProgressBar value={overall} />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-gray-500">Materi</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{doneQuestions}/{totalQuestions} submateri · {completed}/{materials.length} materi</span>
                </div>
                <ProgressBar value={Math.round((doneQuestions / totalQuestions) * 100)} color="bg-blue-500" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-gray-500">Rata-rata Quiz</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{quizAvg}%</span>
                </div>
                <ProgressBar value={quizAvg} color="bg-green-500" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Quiz dikerjakan</span>
                <span className="font-semibold text-gray-900 dark:text-white">{quizResults.length} quiz</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Badge terkumpul</span>
                <span className="font-semibold text-gray-900 dark:text-white">{earnedCount}/{achievements.length}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Detail Akun</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500 w-28 shrink-0">Nama</span>
                <span className="text-gray-900 dark:text-white font-medium">{user?.name}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500 w-28 shrink-0">Email</span>
                <span className="text-gray-900 dark:text-white font-medium">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500 w-28 shrink-0">Terdaftar</span>
                <span className="text-gray-900 dark:text-white font-medium">{user ? new Date(user.createdAt).toLocaleDateString('id-ID', { dateStyle: 'long' }) : '-'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500 w-28 shrink-0">Level</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {overall >= 10 ? '💡 Pemula Logika' : overall >= 40 ? '🧩 PseudoExplorer' : overall >= 80 ? '🚀 PseudoMaster' : '🌱 Pemula'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Target className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500 w-28 shrink-0">Tujuan</span>
                <span className="text-gray-900 dark:text-white font-medium">Memahami dasar pemrograman & pseudocode</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile