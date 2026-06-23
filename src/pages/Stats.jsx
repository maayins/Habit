import { HABITS } from '../habits'
import { calcStreak, calcBestStreak, calcAllTimeRate, calcMostMissed, getStore, todayKey } from '../store'

const TOTAL = HABITS.length

export default function Stats() {
  const streak = calcStreak(TOTAL)
  const best = calcBestStreak(TOTAL)
  const rate = calcAllTimeRate(TOTAL)
  const missed = calcMostMissed(HABITS)
  const s = getStore()
  const totalDays = Object.keys(s).length
  const fullDays = Object.keys(s).filter(k => Object.keys(s[k]).length === TOTAL).length

  const habitRates = HABITS.map(h => {
    const days = Object.keys(s)
    if (!days.length) return { ...h, rate: 0 }
    const done = days.filter(k => s[k][h.id]).length
    return { ...h, rate: Math.round((done / days.length) * 100) }
  }).sort((a, b) => a.rate - b.rate)

  return (
    <div className="px-4 py-4">
      <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">Your stats</h2>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <BigStat label="Current streak" value={streak} unit="days" icon="🔥" color="orange" />
        <BigStat label="Best streak" value={best} unit="days" icon="🏆" color="yellow" />
        <BigStat label="Completion rate" value={`${rate}%`} unit="all time" icon="📈" color="emerald" />
        <BigStat label="Full days" value={fullDays} unit={`of ${totalDays} days`} icon="✅" color="blue" />
      </div>

      {missed && totalDays > 0 && (
        <div className="bg-orange-50 dark:bg-orange-950 border border-orange-100 dark:border-orange-900 rounded-xl p-3 mb-5 flex items-center gap-3">
          <span className="text-2xl">{missed.icon}</span>
          <div>
            <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-0.5">Most missed habit</p>
            <p className="text-sm font-medium text-orange-800 dark:text-orange-200">{missed.label}</p>
            <p className="text-xs text-orange-500 dark:text-orange-400">{missed.time}</p>
          </div>
        </div>
      )}

      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Habit completion rates</h3>
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800">
        {habitRates.map(h => (
          <div key={h.id} className="flex items-center gap-3 p-3">
            <span className="text-lg w-7 text-center">{h.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-700 dark:text-gray-300 truncate">{h.label}</p>
                <span className={`text-xs font-semibold ml-2 flex-shrink-0 ${h.rate >= 80 ? 'text-emerald-600 dark:text-emerald-400' : h.rate >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-500 dark:text-red-400'}`}>
                  {totalDays > 0 ? `${h.rate}%` : '--'}
                </span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-1">
                <div
                  className={`h-1 rounded-full ${h.rate >= 80 ? 'bg-emerald-500' : h.rate >= 50 ? 'bg-yellow-400' : 'bg-red-400'}`}
                  style={{ width: totalDays > 0 ? `${h.rate}%` : '0%' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalDays === 0 && (
        <div className="text-center py-8 text-gray-400 dark:text-gray-500">
          <p className="text-3xl mb-2">📊</p>
          <p className="text-sm">Stats will appear after your first day</p>
        </div>
      )}
    </div>
  )
}

function BigStat({ label, value, unit, icon, color }) {
  const colors = {
    orange:  'text-orange-500',
    yellow:  'text-yellow-500',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    blue:    'text-blue-600 dark:text-blue-400',
  }
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base">{icon}</span>
        <p className="text-xs text-gray-400 dark:text-gray-500">{label}</p>
      </div>
      <p className={`text-2xl font-semibold ${colors[color]}`}>{value}</p>
      <p className="text-xs text-gray-400 dark:text-gray-500">{unit}</p>
    </div>
  )
}
