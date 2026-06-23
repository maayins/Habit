import { NOTIFICATIONS } from './habits'

const hasNotif = () => typeof Notification !== 'undefined'

export async function requestPermission() {
  if (!hasNotif()) return false
  const result = await Notification.requestPermission()
  return result === 'granted'
}

export function getNotifPermission() {
  if (!hasNotif()) return 'unsupported'
  return Notification.permission
}

export function getNotifPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem('notif_prefs') || '{}')
    const prefs = {}
    for (const n of NOTIFICATIONS) {
      prefs[n.id] = saved[n.id] !== undefined ? saved[n.id] : true
    }
    return prefs
  } catch { return Object.fromEntries(NOTIFICATIONS.map(n => [n.id, true])) }
}

export function saveNotifPrefs(prefs) {
  try { localStorage.setItem('notif_prefs', JSON.stringify(prefs)) } catch {}
}

let _timers = []

export function scheduleNotifications() {
  if (!hasNotif() || Notification.permission !== 'granted') return
  _timers.forEach(t => clearTimeout(t))
  _timers = []
  const prefs = getNotifPrefs()
  for (const n of NOTIFICATIONS) {
    if (prefs[n.id]) scheduleDaily(n)
  }
}

function scheduleDaily(n) {
  const now = new Date()
  const next = new Date()
  next.setHours(n.hour, n.min, 0, 0)
  if (next <= now) next.setDate(next.getDate() + 1)
  const delay = next - now
  const t = setTimeout(() => {
    new Notification(n.title, {
      body: n.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: n.id,
    })
    scheduleDaily(n)
  }, delay)
  _timers.push(t)
}

export function testNotification() {
  if (!hasNotif() || Notification.permission !== 'granted') return false
  new Notification('Test reminder 🔔', {
    body: 'Notifications are working!',
    icon: '/icons/icon-192.png',
  })
  return true
}
