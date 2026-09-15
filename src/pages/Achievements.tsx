import { useApp } from '../context/AppContext'
import { Card, PageHeader, ProgressBar, Badge } from '../components/ui'
import { Lock } from 'lucide-react'

const badgeStyle: Record<string, string> = {
  '🎯': 'bg-green-100 dark:bg-green-950',
  '🔥': 'bg-orange-100 dark:bg-orange-950',
  '💯': 'bg-yellow-100 dark:bg-yellow-950',
  '🐍': 'bg-blue-100 dark:bg-blue-950',
  '🤖': 'bg-purple-100 dark:bg-purple-950',
  '💻': 'bg-indigo-100 dark:bg-indigo-950',
}

function Achievements() {
  const { achievements, streak, aiConversations } = useApp()

  const earnedCount = achievements.filter(a => a.earned).length

  return (
    <div>
      <PageHeader
        title="Achievements"
        subtitle="Kumpulkan badge dengan menyelesaikan pencapaian belajar"
      />

      {earnedCount > 0 && (
        <div className="flex items-center gap-3 mb-6">
          <Badge tone="purple">🎖️ {earnedCount}/{achievements.length} badge terkumpul</Badge>
          <span className="text-xs text-gray-500">Streak: <strong>{streak} hari</strong> · AI: <strong>{aiConversations.length} tanya</strong></span>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map(a => (
          <Card key={a.id} className={`p-6 ${a.earned ? 'border-green-300 dark:border-green-800' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${a.earned ? badgeStyle[a.icon] : 'bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 grayscale'}`}>
                {a.earned ? a.icon : <Lock className="w-5 h-5 text-gray-400" />}
              </div>
              {a.earned && <Badge tone="green">Earned</Badge>}
            </div>
            <h3 className={`font-semibold ${a.earned ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>{a.name}</h3>
            <p className={`text-sm mt-1 ${a.earned ? 'text-gray-500' : 'text-gray-400'}`}>{a.description}</p>

            {a.maxProgress && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{Math.min(a.progress ?? 0, a.maxProgress)}/{a.maxProgress}</span>
                </div>
                <ProgressBar
                  value={((a.progress ?? 0) / a.maxProgress) * 100}
                  color={a.earned ? 'bg-green-500' : 'bg-gray-400'}
                />
              </div>
            )}

            {a.earned && a.earnedAt && (
              <p className="text-xs text-gray-400 mt-3">Diraih pada {new Date(a.earnedAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Achievements