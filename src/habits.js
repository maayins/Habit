export const HABITS = [
  { id: 'wake',     section: 'morning', label: 'Wake up quietly',          time: '6:00 AM',                icon: '☀️',  notifHour: 6,  notifMin: 0  },
  { id: 'run',      section: 'morning', label: 'Morning run',              time: '6:15 – 6:45 AM',         icon: '🏃',  notifHour: 6,  notifMin: 15 },
  { id: 'ready',    section: 'morning', label: 'Shower + get ready',       time: '6:45 – 7:00 AM',         icon: '🚿',  notifHour: 6,  notifMin: 45 },
  { id: 'leave',    section: 'morning', label: 'Leave by 7:15 AM',         time: 'Arrive office 7:30 AM',  icon: '🚗',  notifHour: 7,  notifMin: 15 },
  { id: 'plan',     section: 'office',  label: 'Plan the day at desk',     time: '7:30 – 8:00 AM',         icon: '📋',  notifHour: 7,  notifMin: 30 },
  { id: 'lunch',    section: 'office',  label: 'Lunch away from desk',     time: '12:00 – 1:00 PM',        icon: '🥗',  notifHour: 12, notifMin: 0  },
  { id: 'eod',      section: 'office',  label: 'EOD wrap up + clean exit', time: '4:30 – 4:45 PM',         icon: '✅',  notifHour: 16, notifMin: 30 },
  { id: 'toddler1', section: 'evening', label: 'Toddler time — part 1',    time: '5:00 – 5:15 PM',         icon: '👧',  notifHour: 17, notifMin: 0  },
  { id: 'workout',  section: 'evening', label: 'Evening workout',          time: '5:30 – 6:30 PM',         icon: '💪',  notifHour: 17, notifMin: 30 },
  { id: 'toddler2', section: 'evening', label: 'Toddler time — part 2',    time: '6:45 – 7:30 PM',         icon: '👧',  notifHour: 18, notifMin: 45 },
  { id: 'netxcel',  section: 'evening', label: 'NetXcel / project work',   time: '7:30 – 8:00 + 8:45 PM',  icon: '💻',  notifHour: 19, notifMin: 30 },
  { id: 'dinner',   section: 'evening', label: 'Dinner with family',       time: '8:00 – 8:45 PM',         icon: '❤️',  notifHour: 20, notifMin: 0  },
  { id: 'journal',  section: 'evening', label: 'Journal + plan tomorrow',  time: '9:30 – 9:50 PM',         icon: '📓',  notifHour: 21, notifMin: 30 },
  { id: 'clothes',  section: 'evening', label: 'Lay out clothes',          time: '9:50 PM',                icon: '👔',  notifHour: 21, notifMin: 50 },
  { id: 'sleep',    section: 'evening', label: 'In bed by 10:00 PM',       time: '8 hrs → wake 6:00 AM',   icon: '😴',  notifHour: 21, notifMin: 55 },
]

export const SECTIONS = ['morning', 'office', 'evening']

export const NOTIFICATIONS = [
  { id: 'wake',     hour: 6,  min: 0,  title: 'Good morning! ☀️',        body: 'Time to wake up quietly.' },
  { id: 'run',      hour: 6,  min: 15, title: 'Run time 🏃',              body: '30 min easy pace — back before the house wakes.' },
  { id: 'ready',    hour: 6,  min: 45, title: 'Shower + get ready 🚿',    body: 'Clothes laid out — quick turnaround.' },
  { id: 'leave',    hour: 7,  min: 15, title: 'Leave now 🚗',             body: '15 min drive — arrive office 7:30 AM.' },
  { id: 'plan',     hour: 7,  min: 30, title: 'Plan your day 📋',         body: 'Review priorities and clear messages.' },
  { id: 'lunch',    hour: 12, min: 0,  title: 'Lunch time 🥗',            body: 'Away from desk — full mental reset.' },
  { id: 'eod',      hour: 16, min: 30, title: 'EOD wrap up ✅',           body: 'Notes, handoffs, clean exit.' },
  { id: 'toddler1', hour: 17, min: 0,  title: 'Toddler time 👧',          body: '15 min with her — fully present.' },
  { id: 'workout',  hour: 17, min: 30, title: 'Workout time 💪',          body: '60 min strength session.' },
  { id: 'toddler2', hour: 18, min: 45, title: 'Toddler time part 2 👧',   body: 'Bath, bedtime story, wind her down.' },
  { id: 'netxcel',  hour: 19, min: 30, title: 'NetXcel time 💻',          body: 'Focused build — no context switching.' },
  { id: 'dinner',   hour: 20, min: 0,  title: 'Dinner time ❤️',           body: 'Phone down — fully present.' },
  { id: 'journal',  hour: 21, min: 30, title: 'Wind down 📓',             body: 'Journal + plan tomorrow. Lay out clothes.' },
  { id: 'clothes',  hour: 21, min: 50, title: 'Lay out clothes 👔',       body: 'Set yourself up for a smooth morning.' },
  { id: 'sleep',    hour: 21, min: 55, title: 'Bed in 5 min 😴',          body: 'Close the laptop. 8 hrs starts now.' },
]
