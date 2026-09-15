import React from 'react'
import { Bot, Send, RotateCcw, Sparkles, Lightbulb, Puzzle, Bug, FileText, Search, Code2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getTutorResponse, getTopicContextName } from '../lib/aiTutor'
import { Card, Badge } from '../components/ui'

type Tab = 'chat' | 'explainer' | 'generator'

const quickPrompts = [
  { icon: Lightbulb, label: 'Jelaskan dengan sederhana', text: 'Jelaskan dengan sederhana apa itu variabel' },
  { icon: Puzzle, label: 'Berikan contoh', text: 'Berikan contoh kode percabangan if elif else' },
  { icon: Bug, label: 'Bantu cari error', text: 'Kode saya error, bagaimana cara debugging di Python?' },
  { icon: FileText, label: 'Buat latihan', text: 'Berikan latihan soal perulangan' },
  { icon: Search, label: 'Berikan hint', text: 'Berikan hint untuk memahami fungsi' },
]

function AITutor() {
  const { aiMessages, addAIMessage, clearChat, currentTopic, user } = useApp()
  const [input, setInput] = React.useState('')
  const [typing, setTyping] = React.useState(false)
  const [tab, setTab] = React.useState<Tab>('chat')
  const chatRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
  }, [aiMessages, typing])

  const handleSend = async (text?: string) => {
    const message = (text ?? input).trim()
    if (!message || typing) return
    setInput('')
    addAIMessage(message, 'user')
    setTyping(true)
    const contextTopic = currentTopic

    // small delay to simulate AI thinking
    await new Promise(r => setTimeout(r, 800))
    const response = await getTutorResponse(message, contextTopic)
    addAIMessage(response, 'assistant')
    setTyping(false)
  }

  const topicName = getTopicContextName(currentTopic)

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-180px)] min-h-[600px]">
      {/* Chat */}
      <Card className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                <Bot className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white leading-none">AI Tutor</h2>
              <p className="text-xs text-gray-500 mt-1">Online · Tanyakan apa saja tentang Python</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {topicName && <Badge tone="purple">Konteks: {topicName}</Badge>}
            <button onClick={clearChat} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
          {aiMessages.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center mx-auto mb-3">
                <Bot className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="font-medium text-gray-700 dark:text-gray-200">Halo, {user?.name}! 👋</p>
              <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">Saya AI Tutor PyLearn. Silakan bertanya tentang konsep Python, minta latihan, atau minta bantuan debugging.</p>
            </div>
          )}

          {aiMessages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center mr-2 shrink-0">
                  <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-sm'
                    : 'bg-white/80 dark:bg-white/10 backdrop-blur border border-white/40 dark:border-white/10 text-gray-700 dark:text-gray-200 rounded-bl-sm'
                }`}
              >
                {renderMarkdown(msg.content, msg.role === 'assistant')}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center mr-2 shrink-0">
                <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="bg-white/80 dark:bg-white/10 backdrop-blur border border-white/40 dark:border-white/10 rounded-2xl px-4 py-3 flex items-center gap-1.5">
                <span className="typing-dot w-2 h-2 rounded-full bg-purple-400 inline-block" />
                <span className="typing-dot w-2 h-2 rounded-full bg-purple-400 inline-block" />
                <span className="typing-dot w-2 h-2 rounded-full bg-purple-400 inline-block" />
              </div>
            </div>
          )}
        </div>

        {/* Quick prompts */}
        <div className="px-4 pt-3 flex gap-2 overflow-x-auto scrollbar-hide border-t border-white/40 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur">
          {quickPrompts.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q.text)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 transition-colors shrink-0"
            >
              <q.icon className="w-3.5 h-3.5" /> {q.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-white/60 dark:bg-white/5 backdrop-blur border-t border-white/40 dark:border-white/10">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              rows={2}
              placeholder="Tanyakan tentang Python..."
              className="flex-1 glass-input resize-none text-sm"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || typing}
              className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-40 shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[11px] text-gray-400 mt-1.5">AI Tutor menjelaskan dengan bahasa sederhana &amp; contoh. Untuk kode lebih detail gunakan Code Explainer di bawah.</p>
        </div>
      </Card>

      {/* Tabs for explainer & generator */}
      <div className="lg:w-80 flex flex-col gap-4">
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur rounded-2xl border border-white/40 dark:border-white/10 shadow-sm p-1.5 flex gap-1">
          {(['chat', 'explainer', 'generator'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                tab === t ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {t === 'chat' ? 'Chat' : t === 'explainer' ? 'Code Explainer' : 'Generator'}
            </button>
          ))}
        </div>

        {tab === 'explainer' && <CodeExplainer />}
        {tab === 'generator' && <QuestionGenerator onGenerate={(q) => { setTab('chat'); handleSend(q) }} />}
      </div>
    </div>
  )
}

function renderInlineText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  const boldRe = /\*\*(.+?)\*\*/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = boldRe.exec(text)) !== null) {
    if (m.index > last) parts.push(<span key={k++}>{text.slice(last, m.index)}</span>)
    parts.push(<strong key={k++} className="font-semibold">{m[1]}</strong>)
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(<span key={k++}>{text.slice(last)}</span>)
  return <>{parts}</>
}

function renderMarkdown(content: string, canRender: boolean) {
  if (!canRender) return <>{content}</>

  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let codeBuffer: string[] = []
  let inCode = false
  let liBuffer: string[] = []
  let key = 0

  const flushList = () => {
    if (liBuffer.length > 0) {
      elements.push(
        <ul key={'ul' + key++} className="list-disc pl-5 space-y-1 my-2">
          {liBuffer.map((item, i) => (
            <li key={i}>{renderInlineText(item)}</li>
          ))}
        </ul>
      )
      liBuffer = []
    }
  }

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (inCode) {
        elements.push(
          <pre key={'pre' + key++} className="bg-gray-900 text-gray-100 rounded-lg p-3 text-xs font-mono my-2 overflow-x-auto">
            {codeBuffer.join('\n')}
          </pre>
        )
        codeBuffer = []
        inCode = false
      } else {
        flushList()
        inCode = true
      }
      continue
    }
    if (inCode) {
      codeBuffer.push(line)
      continue
    }
    if (line.trim() === '') {
      flushList()
      continue
    }
    if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
      liBuffer.push(line.trim().slice(2))
      continue
    }
    flushList()
    if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={'p' + key++} className="font-semibold my-1.5">{renderInlineText(line)}</p>
      )
    } else {
      elements.push(
        <p key={'p' + key++} className="my-0.5">{renderInlineText(line)}</p>
      )
    }
  }
  if (inCode) {
    elements.push(
      <pre key={'pre' + key++} className="bg-gray-900 text-gray-100 rounded-lg p-3 text-xs font-mono my-2 overflow-x-auto">
        {codeBuffer.join('\n')}
      </pre>
    )
  }
  flushList()

  return <>{elements}</>
}

function CodeExplainer() {
  const { addAIMessage, currentTopic } = useApp()
  const [code, setCode] = React.useState(`for i in range(5):
    print(i)`)
  const [explaining, setExplaining] = React.useState(false)

  const explainCode = async (text?: string) => {
    const codeInput = (text ?? code).trim()
    if (!codeInput || explaining) return
    setExplaining(true)
    const prompt = `Jelaskan kode ini baris per baris:\n\n${codeInput}\n\nBerikan: 1. Konsep yang digunakan 2. Penjelasan tiap baris 3. Alur eksekusi 4. Output yang dihasilkan 5. Kesalahan yang umum`
    addAIMessage(`Jelaskan kode ini:\n\n${codeInput}`, 'user')
    await new Promise(r => setTimeout(r, 600))
    const response = await getTutorResponse(prompt, currentTopic?.length ? currentTopic : '')
    addAIMessage(response, 'assistant')
    setExplaining(false)
  }

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <Code2 className="w-4 h-4 text-indigo-500" />
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">AI Code Explainer</h3>
      </div>
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        rows={8}
        spellCheck={false}
        placeholder={'for i in range(5):\n    print(i)'}
        className="w-full px-3 py-2.5 rounded-xl bg-gray-900 text-gray-100 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={() => explainCode()}
        disabled={explaining || !code.trim()}
        className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-40"
      >
        {explaining ? 'Menganalisis...' : 'Jelaskan Kode Ini'} <Sparkles className="w-4 h-4" />
      </button>
      <p className="text-[11px] text-gray-400 mt-2">Hasil penjelasan akan dikirim ke chat AI Tutor.</p>
    </Card>
  )
}

function QuestionGenerator({ onGenerate }: { onGenerate: (q: string) => void }) {
  const [topic, setTopic] = React.useState('perulangan')
  const [difficulty, setDifficulty] = React.useState('mudah')
  const [count, setCount] = React.useState(5)
  const [generated, setGenerated] = React.useState(false)

  const topicLabels: Record<string, string> = {
    'variabel-tipe-data': 'Variabel & Tipe Data',
    operator: 'Operator',
    percabangan: 'Percabangan (if-else)',
    perulangan: 'Perulangan (loop)',
    fungsi: 'Fungsi',
    'list-dictionary': 'List & Dictionary',
  }

  const generate = () => {
    const label = topicLabels[topic] || topic
    setGenerated(true)
    const q = `Buat ${count} soal ${difficulty} tentang ${label} beserta jawaban singkatnya. Pilih salah satu tipe: pilihan ganda atau benar/salah.`
    onGenerate(q)
  }

  React.useEffect(() => {
    if (generated) {
      const t = setTimeout(() => setGenerated(false), 3000)
      return () => clearTimeout(t)
    }
  }, [generated])

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-purple-500" />
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">AI Question Generator</h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Topik</label>
          <select
            value={topic}
            onChange={e => setTopic(e.target.value)}
            className="glass-input text-sm"
          >
            {Object.entries(topicLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Kesulitan</label>
          <div className="flex gap-1.5">
            {['mudah', 'sedang', 'sulit'].map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  difficulty === d ? 'bg-indigo-600 text-white' : 'bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 text-gray-500'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Jumlah Soal</label>
          <div className="flex gap-1.5">
            {[3, 5, 10].map(n => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  count === n ? 'bg-indigo-600 text-white' : 'bg-white/60 dark:bg-white/5 backdrop-blur border border-white/40 dark:border-white/10 text-gray-500'
                }`}
              >
                {n} soal
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700"
        >
          <Sparkles className="w-4 h-4" /> Generate Soal
        </button>
        {generated && (
          <p className="text-xs text-green-600 text-center animate-pulse">Soal sedang dibuat lewat AI Tutor...</p>
        )}
      </div>
    </Card>
  )
}

export default AITutor