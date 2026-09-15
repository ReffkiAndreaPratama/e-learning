import { Link } from 'react-router-dom'
import { Clock, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { materials } from '../data/materials'
import { Card, Badge, ProgressBar, PageHeader } from '../components/ui'

function Materials() {
  const { topicProgress, setCurrentTopic } = useApp()

  return (
    <div>
      <PageHeader
        title="Materi Python"
        subtitle="Alur belajar dari dasar hingga struktur data"
      />

      <div className="grid gap-5">
        {materials.map(m => {
          const tp = topicProgress[m.id]
          const pct = tp ? Math.round((tp.subTopicsCompleted.length / m.subTopics.length) * 100) : 0
          return (
            <Link
              key={m.id}
              to={`/materi/${m.id}`}
              onClick={() => setCurrentTopic(m.id)}
              className="block"
            >
              <Card className="p-5 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-800 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 flex items-center justify-center text-3xl bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 rounded-2xl group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/50 transition-colors shrink-0">
                    {m.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-400">MATERI {String(m.number).padStart(2, '0')}</span>
                      <Badge tone={m.difficulty === 'Beginner' ? 'green' : 'purple'}>{m.difficulty}</Badge>
                      {tp?.completed && <Badge tone="green">Selesai</Badge>}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">{m.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{m.description}</p>
                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                      <span className="flex items-center gap-1.5 text-xs text-gray-500"><Clock className="w-3.5 h-3.5" /> {m.estimatedMinutes} menit</span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="mr-1">Progress:</span>
                        <span className="w-32"><ProgressBar value={pct} /></span>
                        {pct}%
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 mt-2 group-hover:text-indigo-500 transition-colors shrink-0" />
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Materials