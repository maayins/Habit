const KEY = 'ht_v2'

export function getStore() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch { return {} }
}

export function saveStore(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)) } catch {}
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function getTodayDone() {
  return getStore()[todayKey()] || {}
}

export function toggleHabit(id) {
  const s = getStore()
  const key = todayKey()
  if (!s[key]) s[key] = {}
  if (s[key][id]) delete s[key][id]
  else s[key][id] = true
  saveStore(s)
}

export function resetToday() {
  const s = getStore()
  s[todayKey()] = {}
  saveStore(s)
}

export function getWeekData() {
  const s = getStore()
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    days.push({ date: d, key, done: s[key] || {}, isFuture: i < 0 })
  }
  return days
}

export function calcStreak(total) {
  const s = getStore()
  let streak = 0
  const d = new Date()
  const tk = todayKey()
  while (streak < 365) {
    const key = d.toISOString().slice(0, 10)
    const count = Object.keys(s[key] || {}).length
    if (key === tk) {
      if (count === total) streak++
    } else {
      if (count === total) streak++
      else break
    }
    d.setDate(d.getDate() - 1)
  }
  return streak
}

export function calcBestStreak(total) {
  const s = getStore()
  const keys = Object.keys(s).sort()
  let best = 0, cur = 0
  for (const k of keys) {
    if (Object.keys(s[k]).length === total) { cur++; best = Math.max(best, cur) }
    else cur = 0
  }
  return best
}

export function calcAllTimeRate(total) {
  const s = getStore()
  const keys = Object.keys(s)
  if (!keys.length) return 0
  const completed = keys.filter(k => Object.keys(s[k]).length === total).length
  return Math.round((completed / keys.length) * 100)
}

export function calcMostMissed(habits) {
  const s = getStore()
  const keys = Object.keys(s)
  if (!keys.length) return null
  const counts = {}
  for (const h of habits) counts[h.id] = 0
  for (const k of keys) {
    for (const h of habits) {
      if (!s[k][h.id]) counts[h.id]++
    }
  }
  const sorted = habits.slice().sort((a, b) => counts[b.id] - counts[a.id])
  return sorted[0]
}
