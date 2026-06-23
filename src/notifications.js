import { NOTIFICATIONS } from './habits'

export async function requestPermission() {
  if (!('Notification' in window)) return false
  const result = await Notification.requestPermission()
  return result === 'granted'
}

export function scheduleNotifications() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return
  for (const n of NOTIFICATIONS) {
    scheduleDaily(n)
  }
}

function scheduleDaily(n) {
  const now = new Date()
  const next = new Date()
  next.setHours(n.hour, n.min, 0, 0)
  if (next <= now) next.setDate(next.getDate() + 1)
  const delay = next - now
  setTimeout(() => {
    new Notification(n.title, {
      body: n.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: n.id,
    })
    scheduleDaily(n)
  }, delay)
}
