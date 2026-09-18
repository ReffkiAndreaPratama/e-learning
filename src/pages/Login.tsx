import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BrainCircuit, LogIn, UserPlus, AlertCircle, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext'

function Login() {
  const { login, loginDemo } = useApp()
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const em = email.trim()
    if (!em || !password) {
      setError('Email dan password wajib diisi.')
      return
    }
    if (!login(em, password)) {
      setError('Email atau password salah. Coba gunakan Login Demo jika belum daftar.')
      return
    }
    navigate('/dashboard')
  }

  const handleDemo = () => {
    loginDemo()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-[26rem] h-[26rem] rounded-full bg-indigo-400/25 dark:bg-indigo-500/20 blur-3xl" style={{ animation: 'float-blob 16s ease-in-out infinite' }} />
        <div className="absolute bottom-0 right-0 w-[24rem] h-[24rem] rounded-full bg-violet-400/25 dark:bg-violet-500/20 blur-3xl" style={{ animation: 'float-blob 20s ease-in-out infinite reverse' }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-cyan-400/15 dark:bg-cyan-500/10 blur-3xl" style={{ animation: 'float-blob 22s ease-in-out infinite' }} />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-indigo-500/30">
            <BrainCircuit className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Selamat Datang Kembali!</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Masuk untuk melanjutkan pembelajaran pemrograman</p>
        </div>

        <div className="glass-strong rounded-3xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="glass-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="glass-input"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-sm border border-red-500/20">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-primary text-white font-semibold"
            >
              <LogIn className="w-4 h-4" /> Login
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300/50 dark:border-gray-600/40" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-400 glass-strong px-3 rounded-full w-fit mx-auto">atau</div>
          </div>

          <button
            onClick={handleDemo}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:opacity-90 hover:-translate-y-0.5 transition-all"
          >
            <Sparkles className="w-4 h-4" /> Login Demo
          </button>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2 text-center">Demo akun dengan data contoh untuk presentasi &amp; eksplorasi semua fitur.</p>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Belum punya akun?{' '}
          <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
            Daftar <UserPlus className="w-3.5 h-3.5 inline" />
          </Link>
        </p>
        <p className="text-center mt-4">
          <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">← Kembali ke Beranda</Link>
        </p>
      </div>
    </div>
  )
}

export default Login