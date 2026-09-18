import React from 'react'
import { MessagesSquare, Bot, Search, Trash2, Download, CalendarDays, User } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Card, PageHeader, Badge, EmptyState } from '../components/ui'

function AILog() {
  const { aiConversations, aiMessages, clearChat } = useApp()
  const [query, setQuery] = React.useState('')
  const [view, setView] = React.useState<'chat' | 'log'>('chat')

  const userMessages = aiMessages.filter(m => m.role === 'user')

  const filteredConversations = aiConversations.filter(c =>
    c.question.toLowerCase().includes(query.toLowerCase())
  )

  const topicCounts = aiConversations.reduce<Record<string, number>>((acc, c) => {
    acc[c.topic] = (acc[c.topic] || 0) + 1
    return acc
  }, {})

  const fmt = (iso: string) => new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })

  const exportJson = () => {
    const payload = {
      app: 'PseudoLearn AI',
      feature: 'AI Tutor Usage Log',
      summary: {
        totalConversations: aiConversations.length,
        totalUserMessages: userMessages.length,
        totalMessages: aiMessages.length,
        topics: topicCounts,
      },
      conversations: aiConversations,
      messages: aiMessages,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pylearn-ai-log-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <PageHeader
        title="AI Usage Log"
        subtitle="Riwayat percakapan dengan AI Tutor untuk keperluan evaluasi dan penelitian"
        action={
          <button onClick={exportJson} disabled={aiMessages.length === 0} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-40">
            <Download className="w-4 h-4" /> Ekspor JSON
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Percakapan</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{aiConversations.length}</p>
              <p className="text-xs text-gray-400 mt-1">Pertanyaan yang diajukan pengguna</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center">
              <MessagesSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Pesan</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{aiMessages.length}</p>
              <p className="text-xs text-gray-400 mt-1">{userMessages.length} dari pengguna · {aiMessages.length - userMessages.length} dari AI</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center">
              <Bot className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Topik Terbanyak</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2 truncate">
                {Object.entries(topicCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'}
              </p>
              <p className="text-xs text-gray-400 mt-1">{Object.keys(topicCounts).length} topik berbeda</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
              <Search className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {aiMessages.length === 0 && aiConversations.length === 0 ? (
        <Card>
          <EmptyState
            icon={<MessagesSquare className="w-7 h-7" />}
            title="Belum ada percakapan"
            description="Mulai bertanya kepada AI Tutor di halaman AI Tutor, dan riwayat percakapan Anda akan tercatat di sini."
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Log percakapan */}
          <Card className="p-6 lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <MessagesSquare className="w-5 h-5 text-indigo-500" />
                <h2 className="font-semibold text-gray-900 dark:text-white">Riwayat Percakapan</h2>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setView('chat')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${view === 'chat' ? 'bg-indigo-600 text-white' : 'bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 text-gray-500'}`}
                >
                  Pesan
                </button>
                <button
                  onClick={() => setView('log')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${view === 'log' ? 'bg-indigo-600 text-white' : 'bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 text-gray-500'}`}
                >
                  Log Kompak
                </button>
              </div>
            </div>

            {view === 'log' ? (
              <div>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Cari pertanyaan..."
                    className="glass-input pl-9 pr-3 text-sm"
                  />
                </div>
                {filteredConversations.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-8">Tidak ada percakapan yang cocok.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-800 text-left text-xs text-gray-400">
                          <th className="py-2 pr-3 font-medium">Pertanyaan</th>
                          <th className="py-2 pr-3 font-medium">Topik</th>
                          <th className="py-2 font-medium">Waktu</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredConversations.map((c, i) => (
                          <tr key={i} className="border-b border-gray-50 dark:border-gray-800/50 last:border-0">
                            <td className="py-2.5 pr-3 text-gray-700 dark:text-gray-200">{c.question}</td>
                            <td className="py-2.5 pr-3"><Badge tone="purple">{c.topic}</Badge></td>
                            <td className="py-2.5 text-gray-400">{fmt(c.timestamp)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                {aiMessages.map(m => (
                  <div key={m.id} className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : ''}`}>
                    {m.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center shrink-0">
                        <Bot className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                      </div>
                    )}
                    <div className={`max-w-[85%] rounded-xl px-3.5 py-2 text-xs leading-relaxed whitespace-pre-wrap ${m.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-white/80 dark:bg-white/10 backdrop-blur text-gray-700 dark:text-gray-200 border border-white/40 dark:border-white/10 rounded-bl-sm'}`}>
                      <p className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
                        {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                        {m.role === 'user' ? 'Pengguna' : 'AI Tutor'} · {fmt(m.timestamp)}
                      </p>
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Statistik per topik */}
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-indigo-500" />
                  <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Statistik per Topik</h2>
                </div>
              </div>
              {Object.keys(topicCounts).length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">Belum ada data.</p>
              ) : (
                <div className="space-y-2.5">
                  {Object.entries(topicCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([topic, count]) => {
                      const max = Math.max(...Object.values(topicCounts))
                      return (
                        <div key={topic}>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-600 dark:text-gray-300">{topic}</span>
                            <Badge tone="gray">{count}×</Badge>
                          </div>
                          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(count / max) * 100}%` }} />
                          </div>
                        </div>
                      )
                    })}
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Kontrol Data</h2>
              <div className="space-y-2 text-xs text-gray-500">
                <p className="flex items-center gap-2"><CalendarDays className="w-3.5 h-3.5" /> Data tersimpan lokal di browser ini.</p>
                <p className="flex items-center gap-2"><Bot className="w-3.5 h-3.5" /> Log meliputi pertanyaan, jawaban AI, dan waktu.</p>
              </div>
              <button
                onClick={clearChat}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 text-sm font-medium hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4" /> Hapus Log & Pesan
              </button>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default AILog