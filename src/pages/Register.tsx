import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BrainCircuit, UserPlus, ArrowLeft, AlertCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

function Register() {
  const { register } = useApp()
  const navigate = useNavigate()
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirm, setConfirm] = React.useState('')
  const [error, setError] = React.useState('')

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const n = name.trim()
    const em = email.trim()
    if (!n || !em || !password || !confirm) {
      setError('Semua field wajib diisi.')
      return
    }
    if (n.length > 60) {
      setError('Nama maksimal 60 karakter.')
      return
    }
    if (!emailRe.test(em)) {
      setError('Format email tidak valid.')
      return
    }
    if (password.length < 6 || password.length > 128) {
      setError('Password harus 6–128 karakter.')
      return
    }
    if (password !== confirm) {
      setError('Konfirmasi password tidak cocok.')
      return
    }
    if (!register(n, em, password)) {
      setError('Email sudah terdaftar. Silakan login.')
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 w-[26rem] h-[26rem] rounded-full bg-violet-400/25 dark:bg-violet-500/20 blur-3xl" style={{ animation: 'float-blob 18s ease-in-out infinite' }} />
        <div className="absolute bottom-0 -left-24 w-[24rem] h-[24rem] rounded-full bg-indigo-400/25 dark:bg-indigo-500/20 blur-3xl" style={{ animation: 'float-blob 22s ease-in-out infinite reverse' }} />
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-cyan-400/15 dark:bg-cyan-500/10 blur-3xl" style={{ animation: 'float-blob 20s ease-in-out infinite' }} />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-indigo-500/30">
            <BrainCircuit className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Buat Akun Baru</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Mulai perjalanan belajarmu bersama PyLearn AI</p>
        </div>

        <div className="glass-strong rounded-3xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nama Kamu"
                className="glass-input"
              />
            </div>
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
                placeholder="Minimal 6 karakter"
                className="glass-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Konfirmasi Password</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Ulangi password"
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
              <UserPlus className="w-4 h-4" /> Daftar
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Login</Link>
        </p>
        <p className="text-center mt-4">
          <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Kembali ke Beranda
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register