# 🚀 FocusFlow  
### Prioritize focus. Not noise.

FocusFlow is a modern productivity application designed to help users stay in deep work by intelligently prioritizing notifications instead of blocking them completely. The app delivers a calm, premium, and distraction-free experience that feels like a real, shipped product—not a hackathon prototype.

> **Core philosophy:**  
> We don’t block notifications. We prioritize them.

---

## 📌 Problem Statement

Digital users are constantly interrupted by notifications from multiple platforms, breaking focus and reducing productivity. Existing solutions often silence everything or overwhelm users with alerts, causing missed important messages and cognitive overload.

---

## 💡 Solution Overview

FocusFlow introduces context-aware focus sessions that intelligently manage interruptions.

During a focus session:
- Important notifications are **Allowed**
- Non-essential notifications are **Muted**
- Less-urgent notifications are **Queued**

This approach enables deep focus without disconnecting users from what truly matters.

---

## ✨ Key Features

### 🧠 Focus Sessions
- One-tap **Start Focus Session**
- Persistent focus timer (continues smoothly on revisit)
- Clear session indicator: **Focus Mode ON**
- Minimal controls (Pause / End)
- Light → Dark theme transition when session starts

### 🔔 Intelligent Notification Handling (Mocked for MVP)
- Categorization:
  - ✅ Allowed
  - 🔕 Muted
  - ⏳ Queued
- Live notification feed
- Clean visual tags and smooth animations

### 📊 Summary & Analytics
- Total focus time
- Allowed / Muted / Queued counts
- Minimal charts with low visual noise
- AI-generated session summary (mocked)

### 🎨 Premium UI & UX
- Dark-mode–first design
- Minimal, calm, professional layout
- Rounded cards, soft borders, subtle shadows
- Smooth micro-interactions
- Mobile-first navigation

---

## 🧱 App Structure

### Navigation
Bottom tab navigation:
- Dashboard
- Focus
- Notifications
- Summary
- Settings

### Core Screens
- Dashboard
- Focus Session
- Notifications Feed
- Summary & Analytics
- Settings

---

## 🎨 Design System

### Color Palette
| Purpose | Color |
|------|------|
| Background | `#0B0F14` |
| Primary Accent | `#4F8CFF` |
| Success / Allowed | `#22C55E` |
| Muted / Blocked | `#64748B` |
| Queued / Pending | `#F59E0B` |
| Text Primary | `#E5E7EB` |
| Text Secondary | `#9CA3AF` |

### Typography
- Font Family: Inter / SF Pro / Geist
- H1: 42–48px (Desktop), 28–32px (Mobile), SemiBold
- H2: 24–28px, Medium
- Body: 14–16px, Regular
- Micro text: 12px

> **Design principle:** Premium = boring + clean

---

## 🛠 Tech Stack

### Frontend
- React / Next.js (Web)
- React Native / Expo (Mobile)
- Tailwind CSS / NativeWind
- Framer Motion / Reanimated

### Tooling
- Vite
- npm / pnpm
- ESLint & Prettier
- Git & GitHub

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js LTS (18.x or 20.x)
- npm or pnpm
- Git

> ⚠️ Windows users: Do NOT place the project inside OneDrive.

### Installation
```bash
git clone <repository-url>
cd focusflow
npm install
npm run dev
