export const HABITS = [
  { id: 'wake',     section: 'morning', label: 'Wake up quietly',         time: '6:00 AM',               icon: '☀️' },
  { id: 'run',      section: 'morning', label: 'Morning run',             time: '6:15 – 6:45 AM',        icon: '🏃' },
  { id: 'ready',    section: 'morning', label: 'Shower + get ready',      time: '6:45 – 7:00 AM',        icon: '🚿' },
  { id: 'leave',    section: 'morning', label: 'Leave by 7:15 AM',        time: 'Arrive office 7:30 AM', icon: '🚗' },
  { id: 'plan',     section: 'office',  label: 'Plan the day at desk',    time: '7:30 – 8:00 AM',        icon: '📋' },
  { id: 'lunch',    section: 'office',  label: 'Lunch away from desk',    time: '12:00 – 1:00 PM',       icon: '🥗' },
  { id: 'eod',      section: 'office',  label: 'EOD wrap up + clean exit',time: '4:30 – 4:45 PM',        icon: '✅' },
  { id: 'toddler1', section: 'evening', label: 'Toddler time — part 1',   time: '5:00 – 5:15 PM',        icon: '👧' },
  { id: 'workout',  section: 'evening', label: 'Evening workout',         time: '5:30 – 6:30 PM',        icon: '💪' },
  { id: 'toddler2', section: 'evening', label: 'Toddler time — part 2',   time: '6:45 – 7:30 PM',        icon: '👧' },
  { id: 'netxcel',  section: 'evening', label: 'NetXcel / project work',  time: '7:30 – 8:00 + 8:45 PM', icon: '💻' },
  { id: 'dinner',   section: 'evening', label: 'Dinner with family',      time: '8:00 – 8:45 PM',        icon: '❤️' },
  { id: 'journal',  section: 'evening', label: 'Journal + plan tomorrow', time: '9:30 – 9:50 PM',        icon: '📓' },
  { id: 'clothes',  section: 'evening', label: 'Lay out clothes',         time: '9:50 PM',               icon: '👔' },
  { id: 'sleep',    section: 'evening', label: 'In bed by 10:00 PM',      time: '8 hrs → wake 6:00 AM',  icon: '😴' },
]

export const SECTIONS = ['morning', 'office', 'evening']

export const NOTIFICATIONS = [
  { id: 'n_wake',     hour: 6,  min: 0,  title: 'Good morning!',        body: 'Time to wake up quietly and start your day.' },
  { id: 'n_run',      hour: 6,  min: 15, title: 'Run time 🏃',           body: '30 min easy pace — back before the house wakes.' },
  { id: 'n_toddler1', hour: 17, min: 0,  title: 'Toddler time 👧',       body: 'You\'re home — 15 min with her before anything else.' },
  { id: 'n_wind',     hour: 21, min: 30, title: 'Wind down',             body: 'Journal + plan tomorrow. Lay out clothes.' },
  { id: 'n_sleep',    hour: 21, min: 55, title: 'Bed in 5 min 😴',       body: 'Close the laptop. 8 hrs starts now.' },
]
