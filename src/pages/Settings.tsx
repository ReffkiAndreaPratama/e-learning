import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Moon, Bell, Globe, RotateCcw, LogOut, Check, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Card, PageHeader } from '../components/ui'

function Settings() {
  const { darkMode, setDarkMode, resetProgress, logout, user } = useApp()
  const navigate = useNavigate()

  const [notification, setNotification] = React.useState(true)
  const [language, setLanguage] = React.useState('id')
  const [confirmReset, setConfirmReset] = React.useState(false)

  const handleReset = () => {
    setConfirmReset(false)
    resetProgress()
  }

  return (
    <div>
      <PageHeader title="Pengaturan" subtitle="Atur preferensi tampilan dan data akun" />

      <div className="space-y-4">
        {/* Appearance */}
        <Card className="p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Tampilan</h2>
          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur border border-white/40 dark:border-white/10 flex items-center justify-center">
                <Moon className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Dark Mode</p>
                <p className="text-xs text-gray-500">Mode gelap untuk kenyamanan mata</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-12 h-7 rounded-full transition-colors ${darkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${darkMode ? 'left-6' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur border border-white/40 dark:border-white/10 flex items-center justify-center">
                <Bell className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Notifikasi</p>
                <p className="text-xs text-gray-500">Notifikasi belajar dan pengingat streak</p>
              </div>
            </div>
            <button
              onClick={() => setNotification(!notification)}
              className={`relative w-12 h-7 rounded-full transition-colors ${notification ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${notification ? 'left-6' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur border border-white/40 dark:border-white/10 flex items-center justify-center">
                <Globe className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Bahasa</p>
                <p className="text-xs text-gray-500">Bahasa tampilan aplikasi</p>
              </div>
            </div>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="px-3 py-2 rounded-xl glass-input w-auto text-sm"
            >
              <option value="id">Indonesia</option>
              <option value="en">English</option>
            </select>
          </div>
        </Card>

        {/* Data */}
        <Card className="p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Data & Keamanan</h2>

          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur border border-white/40 dark:border-white/10 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Data Tersimpan</p>
                <p className="text-xs text-gray-500">Progress & hasil belajar kamu tersimpan lokal di browser</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-green-600"><Check className="w-3.5 h-3.5" /> Aktif</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur border border-white/40 dark:border-white/10 flex items-center justify-center">
                <RotateCcw className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Reset Progress</p>
                <p className="text-xs text-gray-500">Hapus semua progress, quiz, dan latihan</p>
              </div>
            </div>
            {confirmReset ? (
              <div className="flex gap-2">
                <button onClick={handleReset} className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold">Ya, reset</button>
                <button onClick={() => setConfirmReset(false)} className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs">Batal</button>
              </div>
            ) : (
              <button onClick={() => setConfirmReset(true)} className="px-4 py-2 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 text-sm font-medium hover:bg-red-100">
                Reset
              </button>
            )}
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/60 dark:bg-white/10 backdrop-blur border border-white/40 dark:border-white/10 flex items-center justify-center">
                <LogOut className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Keluar Akun</p>
                <p className="text-xs text-gray-500 text-left">Keluar dari akun {user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); navigate('/') }}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-200"
            >
              Keluar
            </button>
          </div>
        </Card>

        {/* About */}
        <Card className="p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Tentang Aplikasi</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            <strong className="text-gray-700 dark:text-gray-300">PyLearn AI</strong> — Pengembangan Media Pembelajaran Interaktif Berbasis Web untuk Memahami Konsep Dasar Pemrograman Python dengan Dukungan AI Tutor.
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Versi 1.0 · Proyek akademik Mata Kuliah Pengajaran/Pembelajaran Berbantuan Komputer (PBK/CAL)
          </p>
        </Card>
      </div>
    </div>
  )
}

export default Settings