import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Home,
  BookOpen,
  Terminal,
  Edit3,
  Target,
  Bot,
  BarChart3,
  Trophy,
  User,
  Settings,
  ClipboardCheck,
  MessagesSquare,
  LogOut,
  Menu,
  X,
  BrainCircuit,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/materi', label: 'Materi', icon: BookOpen },
  { to: '/playground', label: 'Playground', icon: Terminal },
  { to: '/latihan', label: 'Latihan', icon: Edit3 },
  { to: '/quiz', label: 'Quiz', icon: Target },
  { to: '/ai-tutor', label: 'AI Tutor', icon: Bot },
  { to: '/progress', label: 'Progress', icon: BarChart3 },
  { to: '/achievements', label: 'Achievements', icon: Trophy },
  { to: '/evaluasi', label: 'Evaluasi', icon: ClipboardCheck },
  { to: '/ai-log', label: 'AI Log', icon: MessagesSquare },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Pengaturan', icon: Settings },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { user, logout, isAuthenticated } = useApp()
  const navigate = useNavigate()

  if (!isAuthenticated || !user) {
    return <>{children}</>
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const initials = user.name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="min-h-screen">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-16 w-96 h-96 rounded-full bg-indigo-400/20 dark:bg-indigo-500/20 blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 -right-24 w-[28rem] h-[28rem] rounded-full bg-violet-400/20 dark:bg-violet-500/15 blur-3xl" style={{ animation: 'float-blob 14s ease-in-out infinite' }} />
        <div className="absolute bottom-0 left-1/3 w-[22rem] h-72 rounded-full bg-cyan-400/15 dark:bg-cyan-500/10 blur-3xl" style={{ animation: 'float-blob 18s ease-in-out infinite reverse' }} />
      </div>

      {/* Sidebar desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden lg:flex flex-col glass-nav ${collapsed ? 'w-20' : 'w-64'}`}
      >
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-gray-100 dark:border-gray-800 ${collapsed ? 'justify-center px-0' : ''}`}>
          {!collapsed && (
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-gray-900 dark:text-white leading-none">PyLearn AI</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Interactive Learning</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center mx-auto">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        <nav className="flex-1 py-4 px-3 overflow-y-auto scrollbar-hide space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  collapsed ? 'justify-center px-0' : ''
                } ${
                  isActive
                    ? 'bg-indigo-100/80 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200 backdrop-blur border border-indigo-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-white/5'
                }`
              }
              title={item.label}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100 dark:border-gray-800">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center font-semibold text-indigo-600 dark:text-indigo-300 text-xs shrink-0">
              {initials}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                <button onClick={handleLogout} className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 flex items-center gap-1">
                  <LogOut className="w-3 h-3" /> Keluar
                </button>
              </div>
            )}
            {collapsed && (
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-500">
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="mt-3 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex items-center gap-1 w-full"
            >
              <Menu className="w-3.5 h-3.5" /> Ciutkan
            </button>
          )}
        </div>
      </aside>

      {/* Topbar mobile */}
      <header className="sticky top-0 z-40 lg:hidden glass-nav px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <BrainCircuit className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900 dark:text-white text-sm">PyLearn AI</span>
        </div>
        <button onClick={() => setMobileOpen(true)} className="text-gray-600 dark:text-gray-300">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 glass-strong shadow-2xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <BrainCircuit className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white">PyLearn AI</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="border-t border-gray-100 dark:border-gray-800 mt-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center font-semibold text-indigo-600 text-xs">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                  <button onClick={handleLogout} className="text-xs text-gray-500 flex items-center gap-1">
                    <LogOut className="w-3 h-3" /> Keluar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className={`transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-7xl mx-auto pb-24 lg:pb-8">{children}</div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden glass-nav px-2 py-1.5 flex justify-around">
        {navItems.slice(0, 5).map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-1 px-2 rounded-md text-[10px] ${
                isActive ? 'text-indigo-600 dark:text-indigo-300' : 'text-gray-500'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label.split(' ')[0]}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}