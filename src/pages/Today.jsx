import { useState, useEffect } from 'react'
import { HABITS, SECTIONS } from '../habits'
import { getTodayDone, toggleHabit, resetToday, calcStreak } from '../store'

const SECTION_LABELS = { morning: 'Morning', office: 'Office', evening: 'Evening' }
const TOTAL = HABITS.length

export default function Today() {
  const [done, setDone] = useState(getTodayDone())

  const refresh = () => setDone(getTodayDone())

  const handleToggle = (id) => {
    toggleHabit(id)
    refresh()
  }

  const count = Object.keys(done).length
  const pct = Math.round((count / TOTAL) * 100)
  const streak = calcStreak(TOTAL)
  const allDone = count === TOTAL

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[72px] text-right">
          {count} / {TOTAL} done
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatCard label="Today" value={`${pct}%`} sub="complete" color="emerald" />
        <StatCard label="Streak" value={streak} sub="days" color="orange" />
        <StatCard label="Remaining" value={TOTAL - count} sub="habits" color="gray" />
      </div>

      {allDone && (
        <div className="mb-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 text-center">
          <p className="text-emerald-700 dark:text-emerald-300 font-medium text-sm">Full day complete! Streak extended.</p>
        </div>
      )}

      {SECTIONS.map(section => {
        const habits = HABITS.filter(h => h.section === section)
        const sectionDone = habits.filter(h => done[h.id]).length
        return (
          <div key={section} className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {SECTION_LABELS[section]}
              </span>
              <span className="text-xs text-gray-400">{sectionDone}/{habits.length}</span>
            </div>
            <div className="space-y-2">
              {habits.map(h => (
                <HabitRow key={h.id} habit={h} checked={!!done[h.id]} onToggle={() => handleToggle(h.id)} />
              ))}
            </div>
          </div>
        )
      })}

      <button
        onClick={() => { resetToday(); refresh() }}
        className="w-full mt-2 py-2.5 text-sm text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        Reset today
      </button>
    </div>
  )
}

function HabitRow({ habit, checked, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all active:scale-98 ${
        checked
          ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800'
          : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800'
      }`}
    >
      <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
        checked
          ? 'bg-emerald-500 border-emerald-500 text-white'
          : 'border-gray-300 dark:border-gray-600'
      }`}>
        {checked && <span className="text-xs font-bold">✓</span>}
      </div>
      <span className="text-lg">{habit.icon}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${checked ? 'text-emerald-800 dark:text-emerald-200 line-through opacity-70' : 'text-gray-900 dark:text-gray-100'}`}>
          {habit.label}
        </p>
        <p className={`text-xs ${checked ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}`}>
          {habit.time}
        </p>
      </div>
    </button>
  )
}

function StatCard({ label, value, sub, color }) {
  const colors = {
    emerald: 'text-emerald-600 dark:text-emerald-400',
    orange:  'text-orange-500 dark:text-orange-400',
    gray:    'text-gray-600 dark:text-gray-400',
  }
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-3 text-center">
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{label}</p>
      <p className={`text-xl font-semibold ${colors[color]}`}>{value}</p>
      <p className="text-xs text-gray-400 dark:text-gray-500">{sub}</p>
    </div>
  )
}
