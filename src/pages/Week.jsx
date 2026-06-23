import { HABITS } from '../habits'
import { getStore, todayKey } from '../store'

const TOTAL = HABITS.length
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

export default function Week() {
  const s = getStore()
  const tk = todayKey()

  const weeks = []
  for (let w = 3; w >= 0; w--) {
    const days = []
    for (let d = 0; d < 7; d++) {
      const date = new Date()
      date.setDate(date.getDate() - (w * 7) - (6 - d))
      const key = date.toISOString().slice(0, 10)
      const count = Object.keys(s[key] || {}).length
      const isFuture = date > new Date()
      const isToday = key === tk
      days.push({ date, key, count, isFuture, isToday })
    }
    weeks.push(days)
  }

  return (
    <div className="px-4 py-4">
      <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">Last 4 weeks</h2>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 mb-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAY_NAMES.map(d => (
            <div key={d} className="text-center text-xs text-gray-400 dark:text-gray-500 font-medium">{d}</div>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
            {week.map((day, di) => (
              <DayCell key={di} day={day} total={TOTAL} />
            ))}
          </div>
        ))}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800" />
            <span className="text-xs text-gray-400">None</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-emerald-200 dark:bg-emerald-800" />
            <span className="text-xs text-gray-400">Partial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-emerald-500" />
            <span className="text-xs text-gray-400">Full day</span>
          </div>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">This week detail</h3>
      <div className="space-y-2">
        {weeks[weeks.length - 1].filter(d => !d.isFuture).map((day, i) => {
          const pct = Math.round((day.count / TOTAL) * 100)
          return (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${day.isToday ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    {DAY_NAMES[day.date.getDay()]} {day.date.getDate()}
                  </span>
                  {day.isToday && <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-full font-medium">Today</span>}
                </div>
                <span className="text-xs text-gray-400">{day.count}/{TOTAL}</span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DayCell({ day, total }) {
  const pct = total > 0 ? day.count / total : 0
  let bg = 'bg-gray-100 dark:bg-gray-800'
  if (!day.isFuture && day.count > 0) {
    if (pct === 1) bg = 'bg-emerald-500'
    else if (pct >= 0.5) bg = 'bg-emerald-300 dark:bg-emerald-700'
    else bg = 'bg-emerald-100 dark:bg-emerald-900'
  }
  return (
    <div className={`aspect-square rounded-md ${bg} ${day.isToday ? 'ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-gray-900' : ''} flex items-center justify-center`}>
      {day.isToday && <span className="text-white text-xs font-bold" style={{fontSize:'8px'}}>{day.date.getDate()}</span>}
    </div>
  )
}
