import { useState, useEffect } from 'react'
import Today from './pages/Today'
import Week from './pages/Week'
import Stats from './pages/Stats'
import { scheduleNotifications, requestPermission } from './notifications'

const TABS = [
  { id: 'today', label: 'Today', icon: '✓' },
  { id: 'week',  label: 'Week',  icon: '◼' },
  { id: 'stats', label: 'Stats', icon: '▲' },
]

export default function App() {
  const [tab, setTab] = useState('today')
  const [notifAsked, setNotifAsked] = useState(false)

  useEffect(() => {
    const asked = localStorage.getItem('notif_asked')
    if (!asked) {
      setTimeout(async () => {
        const granted = await requestPermission()
        if (granted) scheduleNotifications()
        localStorage.setItem('notif_asked', '1')
        setNotifAsked(true)
      }, 2000)
    } else if (Notification?.permission === 'granted') {
      scheduleNotifications()
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 pt-12 pb-3 safe-top">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Habits</h1>
            <p className="text-xs text-gray-400 dark:text-gray-500">{new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })}</p>
          </div>
          <span className="text-2xl">🔥</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-lg mx-auto">
          {tab === 'today' && <Today />}
          {tab === 'week'  && <Week />}
          {tab === 'stats' && <Stats />}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex safe-bottom">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex flex-col items-center py-3 gap-0.5 text-xs font-medium transition-colors ${
              tab === t.id
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            <span className="text-base">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
