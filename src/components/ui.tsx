import React from 'react'

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-card rounded-2xl ${className}`}>
      {children}
    </div>
  )
}

export function ProgressBar({ value, className = '', color = 'bg-gradient-to-r from-indigo-500 to-violet-500' }: { value: number; className?: string; color?: string }) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={`w-full h-2 bg-gray-200/70 dark:bg-gray-700/60 rounded-full overflow-hidden ${className}`}>
      <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${clamped}%` }} />
    </div>
  )
}

export function Badge({ children, tone = 'gray' }: { children: React.ReactNode; tone?: 'gray' | 'green' | 'blue' | 'amber' | 'red' | 'purple' }) {
  const tones: Record<string, string> = {
    gray: 'bg-gray-500/10 text-gray-600 dark:bg-gray-400/10 dark:text-gray-300',
    green: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',
    blue: 'bg-blue-500/10 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300',
    amber: 'bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',
    red: 'bg-red-500/10 text-red-700 dark:bg-red-400/10 dark:text-red-300',
    purple: 'bg-violet-500/10 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-current/10 backdrop-blur ${tones[tone]}`}>
      {children}
    </span>
  )
}

export function CodeBlock({ code }: { code: string; language?: string }) {
  const [copied, setCopied] = React.useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div className="relative group">
      <pre className="bg-[#0d1117]/95 text-gray-100 rounded-xl p-4 text-sm font-mono overflow-x-auto leading-relaxed border border-white/10 shadow-lg shadow-black/20">
        <code>
          {code.split('\n').map((line, i) => (
            <span key={i} className={`block ${line.trim().startsWith('#') ? 'text-gray-500 italic' : ''}`}>
              <span className="select-none text-gray-600 inline-block w-7 text-right pr-3">{i + 1}</span>
              {line || ' '}
            </span>
          ))}
        </code>
      </pre>
      <button
        onClick={copy}
        className="absolute top-2 right-2 text-xs text-gray-400 hover:text-white bg-white/10 border border-white/10 backdrop-blur rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? 'Disalin!' : 'Salin'}
      </button>
    </div>
  )
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: { icon?: React.ReactNode; title: string; description: string; actionLabel?: string; onAction?: () => void }) {
  return (
    <div className="text-center py-12">
      {icon && <div className="mx-auto w-14 h-14 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur flex items-center justify-center text-gray-400 dark:text-gray-300 mb-3 shadow-lg shadow-indigo-500/5">{icon}</div>}
      <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">{description}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="mt-4 inline-flex items-center px-4 py-2 rounded-lg btn-primary text-white text-sm font-medium">
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white/40 dark:bg-white/10 rounded-xl ${className}`} />
  )
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function StatCard({ icon, label, value, sub, tone = 'indigo' }: { icon: React.ReactNode; label: string; value: string; sub?: string; tone?: 'indigo' | 'green' | 'amber' | 'blue' | 'purple' }) {
  const tones: Record<string, string> = {
    indigo: 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300',
    green: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300',
    amber: 'bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300',
    blue: 'bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300',
    purple: 'bg-violet-500/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300',
  }
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur border border-white/40 dark:border-white/10 ${tones[tone]}`}>{icon}</div>
      </div>
    </div>
  )
}