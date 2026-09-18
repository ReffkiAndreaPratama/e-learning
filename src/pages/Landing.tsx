import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  BookOpen,
  Terminal,
  Bot,
  TrendingUp,
  BrainCircuit,
  ArrowRight,
  CheckCircle2,
  Code2,
  Users,
  Zap,
  Moon,
  Sun,
} from 'lucide-react'
import { materials } from '../data/materials'

const features = [
  {
    icon: BookOpen,
    title: 'Materi Interaktif',
    desc: 'Materi pseudocode & logika pemrograman disusun bertahap dengan contoh kode, ilustrasi, dan visualisasi alur.',
    tone: 'from-blue-500 to-cyan-500 shadow-blue-500/30',
  },
  {
    icon: Terminal,
    title: 'Pseudo Playground',
    desc: 'Coba dan jalankan kode pseudocode langsung di browser tanpa perlu install apa pun.',
    tone: 'from-emerald-500 to-green-500 shadow-emerald-500/30',
  },
  {
    icon: Bot,
    title: 'AI Tutor',
    desc: 'Tutor AI siap menjawab pertanyaan, menjelaskan konsep, dan membantu debugging.',
    tone: 'from-violet-500 to-purple-500 shadow-violet-500/30',
  },
  {
    icon: TrendingUp,
    title: 'Progress Belajar',
    desc: 'Pantau kemajuan belajar, nilai quiz, dan topik yang perlu diperkuat.',
    tone: 'from-amber-500 to-orange-500 shadow-amber-500/30',
  },
]

const steps = ['Pretest', 'Materi', 'Latihan', 'Quiz', 'Posttest']

function Landing() {
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    setDark(!dark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={dark ? 'dark' : ''}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass-nav">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-lg">PseudoLearn <span className="text-gradient">AI</span></span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
              aria-label="Ganti tema"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Masuk
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium text-white px-4 py-2 rounded-lg btn-primary"
            >
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-24 w-[34rem] h-[34rem] rounded-full bg-indigo-400/25 dark:bg-indigo-500/20 blur-3xl" style={{ animation: 'float-blob 16s ease-in-out infinite' }} />
          <div className="absolute top-24 -right-32 w-[30rem] h-[30rem] rounded-full bg-violet-400/25 dark:bg-violet-500/20 blur-3xl" style={{ animation: 'float-blob 20s ease-in-out infinite reverse' }} />
          <div className="absolute bottom-0 left-1/3 w-[24rem] h-[24rem] rounded-full bg-cyan-400/20 dark:bg-cyan-500/15 blur-3xl" style={{ animation: 'float-blob 24s ease-in-out infinite' }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-indigo-600 dark:text-indigo-300 text-xs font-medium mb-5">
              <Zap className="w-3.5 h-3.5" /> Proyek Makul PBK/CAL
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.1]">
Belajar Pemrograman <span className="text-gradient">Lebih Interaktif</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
              Pelajari dasar pemrograman melalui pseudocode: materi interaktif, latihan langsung, quiz, dan AI Tutor yang membantu menjelaskan konsep yang belum kamu pahami.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl btn-primary text-white font-semibold"
              >
                Mulai Belajar <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass-card text-gray-700 dark:text-gray-200 font-semibold hover:-translate-y-0.5 transition-transform"
              >
                Lihat Materi
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Materi Bertahap</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> AI Tutor</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Progress Tracking</div>
            </div>
          </div>

          {/* Code illustration */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-500 opacity-20 blur-2xl rounded-3xl" />
              <div className="relative bg-[#0d1117]/95 rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5 border-b border-white/10">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-3 text-xs text-gray-400 font-mono">belajar.py</span>
                </div>
                <div className="p-5 font-mono text-sm leading-relaxed">
                  <p><span className="text-purple-400">nama</span> <span className="text-gray-400">=</span> <span className="text-green-400">"Andi"</span></p>
                  <p><span className="text-purple-400">nilai</span> <span className="text-gray-400">=</span> <span className="text-yellow-400">85</span></p>
                  <p className="mt-2"><span className="text-blue-400">if</span> <span className="text-purple-400">nilai</span> <span className="text-gray-400">&gt;=</span> <span className="text-yellow-400">75</span>:</p>
                  <p className="pl-4 text-green-400">print(f"{'Halo, {nama}, kamu LULUS!'}")</p>
                  <p className="text-gray-400"># Halo, Andi, kamu LULUS!</p>
                </div>
              </div>
              <div className="relative mt-4 grid grid-cols-3 gap-3">
                <div className="glass-card rounded-xl p-3 text-center hover:-translate-y-1 transition-transform">
                  <p className="text-2xl font-bold text-gradient">8</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Topik Materi</p>
                </div>
                <div className="glass-card rounded-xl p-3 text-center hover:-translate-y-1 transition-transform">
                  <p className="text-2xl font-bold text-gradient">45+</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Latihan</p>
                </div>
                <div className="glass-card rounded-xl p-3 text-center hover:-translate-y-1 transition-transform">
                  <p className="text-2xl font-bold text-gradient">80+</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Soal Quiz</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Kenapa Belajar dengan PseudoLearn AI?</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Metode pembelajaran yang aktif, bukan sekadar membaca</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div key={i} className="group glass-card rounded-2xl p-6 hover:-translate-y-1.5 hover:shadow-glass-lg transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.tone} shadow-lg flex items-center justify-center mb-4`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials preview */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Materi yang Dipelajari</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Dari dasar hingga struktur data (array & string)</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {materials.map(m => (
              <div key={m.id} className="glass-card rounded-2xl p-5 flex items-start gap-3 hover:border-indigo-300/60 dark:hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300">
                <div className="text-2xl">{m.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{m.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning flow */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Alur Belajar yang Jelas</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Evaluasi sebelum dan sesudah setiap materi</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className="px-4 py-2 rounded-xl glass-card text-indigo-600 dark:text-indigo-300 text-sm font-medium border-indigo-200/50 dark:border-indigo-500/20">
                  {s}
                </div>
                {i < steps.length - 1 && <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />}
              </div>
            ))}
          </div>
          <div className="mt-8 glass-card rounded-2xl p-6 flex items-start gap-4">
            <Users className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Dirancang untuk <strong>mahasiswa S1 Informatika semester awal</strong> yang baru mempelajari dasar pemrograman — fokus pada logika melalui notasi pseudocode yang mudah dipahami. Cocok untuk belajar mandiri dengan bantuan AI Tutor kapan saja.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl p-10 sm:p-14 text-center overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-600 shadow-2xl shadow-indigo-500/30">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-white/15 blur-3xl animate-pulse-slow" />
              <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-cyan-300/20 blur-3xl" style={{ animation: 'float-blob 18s ease-in-out infinite' }} />
            </div>
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Mulai Perjalanan Belajarmu 🚀</h2>
              <p className="text-indigo-100 mt-3 max-w-xl mx-auto">Bergabunglah sekarang dan pelajari dasar pemrograman dengan cara yang interaktif dan menyenangkan.</p>
              <Link to="/register" className="mt-7 inline-flex items-center gap-2 px-9 py-3.5 rounded-xl bg-white text-indigo-600 font-semibold shadow-xl hover:-translate-y-0.5 hover:bg-indigo-50 transition-all duration-200">
                Mulai Belajar <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="mt-5 text-xs text-indigo-200 flex items-center justify-center gap-2">
                <Code2 className="w-3.5 h-3.5" /> Untuk demo cepat, gunakan tombol <Link to="/login" className="underline hover:text-white">Login Demo</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-nav py-8 mt-4 dark:bg-gray-950/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">PseudoLearn AI</span> — Pengembangan Media Pembelajaran Interaktif Berbasis Web untuk Memahami Konsep Dasar Pemrograman (logika & pseudocode) dengan Dukungan AI Tutor.
          </p>
          <p className="text-xs text-gray-400 mt-2">Proyek akademik • Mata Kuliah PBK/CAL</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing