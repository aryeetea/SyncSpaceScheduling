# 🌸 Sync Space

A beautiful group scheduling app with a peaceful anime lo-fi aesthetic. Find the perfect time for everyone to meet.

![Sync Space](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=400&fit=crop)

---

## ✨ Features

- 🏠 **Beautiful Glass UI** - Bubblegum pink glass cards with holographic effects
- 📅 **Interactive Calendar** - Click-and-drag to mark your weekly availability
- 👥 **Group Collaboration** - Create or join groups with simple codes
- 🎯 **Smart Suggestions** - Automatically find the best meeting times
- 💾 **Auto-Save** - Changes save instantly, no need to click save
- 🔄 **Real-Time Sync** - Updates every 5 seconds across all users
- 📋 **Copy from Last Week** - Reuse your previous schedule
- 🎭 **Calm Animations** - Peaceful, gentle interactions throughout
- 🌙 **Anime Aesthetic** - Inspired by late-night study scenes

---

## 🚀 Quick Start

### 1️⃣ Setup Supabase Database (Required!)

**👉 Follow: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**

You need to create a database table before deploying. Takes 2 minutes.

### 2️⃣ Deploy to Vercel

**👉 Follow: [DEPLOYMENT.md](./DEPLOYMENT.md)**

Deploy via GitHub or Vercel CLI. Takes 5 minutes.

### 3️⃣ Test Your App

**👉 Follow: [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)**

Complete checklist to ensure everything works.

---

## 📖 Documentation

| File | Description |
|------|-------------|
| [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) | Step-by-step checklist with testing |
| [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) | Database setup and configuration |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deploy to Vercel instructions |

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS v4
- **Backend**: Supabase Edge Functions (Deno + Hono)
- **Database**: Supabase PostgreSQL (key-value store)
- **Hosting**: Vercel
- **Font**: Hangyaku (Google Fonts)
- **Icons**: Lucide React

---

## 🎨 Design Philosophy

Sync Space is designed to feel like **working quietly together in the same anime world**, during a peaceful evening. Every interaction is:

- 🌸 **Soft** - No harsh colors or jarring effects
- 🌙 **Calm** - Slow, gentle animations (300-400ms)
- 📋 **Organized** - Clear visual hierarchy and layout
- 💆 **Emotionally Gentle** - Supportive language, no stress

---

## 🎭 Animations

- **Homepage**: Gentle float, breathing glow, crystal shimmer
- **Calendar**: Staggered slide-up, pulsing status dots
- **Glass Cards**: Subtle shimmer overlay, smooth transforms
- **Interactions**: 300-400ms transitions for peaceful feel

---

## 🔐 Environment Variables

Required for deployment:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_DB_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
```

Find these in: Supabase Dashboard → Settings → API & Database

---

## 📊 How It Works

1. **Group Leader** creates a group and gets a code (e.g., SYNC-ABC123)
2. **Members** join using the code
3. **Everyone** marks their availability on the weekly calendar
4. **System** automatically highlights the best meeting times
5. **Real-time sync** keeps everyone updated

---

## 🎯 Use Cases

- 📚 **Study Groups** - Find time to study together
- 💼 **Team Meetings** - Schedule team syncs
- 🎮 **Gaming Sessions** - Plan multiplayer sessions
- ☕ **Friend Hangouts** - Coordinate meetups
- 🏃 **Fitness Buddies** - Schedule workout times

---

## 🌟 Key Components

### HomePage
- Glass card with crystal text effect
- Create group or join group options
- Animated modal for joining

### GroupRoom
- 7-day weekly calendar (Monday-Sunday)
- Time blocks: 9 AM - 5 PM (configurable)
- Three availability states:
  - 🟢 Available (in person)
  - 🔵 Available (remote)
  - 🔴 Busy

### BestTimesSummary
- Shows best day with most availability
- Lists top 5 meeting times
- Displays percentage of members available

### MemberList
- Color-coded avatar circles
- Shows current user with "(you)" label
- Minimal glass card design

---

## 🔄 Data Flow

```
Frontend (React) 
    ↓ API calls
Supabase Edge Functions (Hono server)
    ↓ Database queries
PostgreSQL (kv_store_090a6328 table)
```

Data is stored with these key patterns:
- `group:SYNC-ABC123` → Group metadata
- `group:SYNC-ABC123:members` → Member list
- `group:SYNC-ABC123:member:uuid:availability` → Weekly schedule

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Failed to fetch group data" | Create database table (see SUPABASE_SETUP.md) |
| "relation does not exist" | Run CREATE TABLE SQL in Supabase |
| "Invalid API key" | Check environment variables |
| Calendar doesn't save | Verify SUPABASE_SERVICE_ROLE_KEY |
| No real-time sync | Check browser console for errors |

---

## 📝 License

This project was created with Figma Make.

---

## 🎉 Credits

- **Design**: Inspired by Japanese slice-of-life anime
- **Background**: Custom anime lo-fi study room image
- **Font**: Hangyaku by Google Fonts
- **Icons**: Lucide React

---

## 💖 Built With

Made with love using [Figma Make](https://figma.com) ✨

---

**Start scheduling peacefully** 🌸🌙

Create beautiful shared schedules in a calm, stress-free environment.
