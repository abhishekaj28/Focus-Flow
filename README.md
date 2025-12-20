🚀 FocusFlow — Prioritize Focus. Not Noise.

FocusFlow is a modern productivity application designed to help users stay in deep work by intelligently prioritizing notifications instead of blindly blocking them.
Built with a premium, calm, and minimal UI, FocusFlow feels like a real, shipped SaaS product — not a prototype.

“We don’t block notifications. We prioritize them.”

📌 Problem Statement

In a world of constant digital interruptions, users struggle to stay focused without completely disconnecting.
Existing solutions either block everything or overwhelm users with noise, leading to missed important messages and reduced productivity.

💡 Solution

FocusFlow intelligently manages interruptions by:

Detecting when the user is in focus mode

Classifying notifications as Allowed, Muted, or Queued

Delivering only what truly matters in real time

Providing clear summaries and insights after each session

This ensures deep work without anxiety.

✨ Key Features
🧠 Smart Focus Sessions

One-tap Start Focus Session

Large, distraction-free session timer

Clear status indicator: Focus Mode ON

Minimal controls (Pause / End)

🔔 Intelligent Notification Handling

Notifications categorized as:

✅ Allowed (Urgent & important)

🔕 Muted (Non-essential)

⏳ Queued (For later)

Live notification feed with visual tags

Smooth animations and clean icons

📊 Session Summary & Analytics

Total focus time

Count of Allowed / Muted / Queued notifications

Simple, low-noise charts

AI-generated session summary (mocked for MVP)

🎨 Premium UI/UX

Dark-mode first

Calm, minimal, professional design

Soft shadows, rounded cards, subtle gradients

Smooth micro-interactions using animations

🧱 App Structure
Mobile App Navigation

Bottom Tab Navigation:

Dashboard

Focus

Notifications

Summary

Settings

Core Screens

Dashboard (Hero + CTA)

Focus Session Screen (Main experience)

Live Notifications Feed

Summary & Analytics

Settings

🎨 Design System
Color Palette
Purpose	Color
Background	#0B0F14
Primary Accent	#4F8CFF
Success / Allowed	#22C55E
Muted / Blocked	#64748B
Queued / Pending	#F59E0B
Text Primary	#E5E7EB
Text Secondary	#9CA3AF
Typography

Font: Inter / SF Pro / Geist

H1: 42–48px (Desktop), 28–32px (Mobile), SemiBold

H2: 24–28px, Medium

Body: 14–16px, Regular

Micro text: 12px

No decorative fonts

Premium = boring + clean

🛠 Tech Stack
Frontend

React / Next.js (Web)

React Native / Expo (Mobile)

Tailwind CSS / NativeWind

Framer Motion / Reanimated (Animations)

State & Data

Mock data for MVP

Backend integration ready (agent-based architecture planned)

Tooling

Vite

npm / pnpm

ESLint + Prettier

📂 Project Setup
Prerequisites

Node.js LTS (18.x or 20.x)

npm or pnpm

Git

⚠️ Important:
Do NOT keep the project inside OneDrive.
Always place it in a local folder like C:\dev\focusflow.

Installation
git clone <repo-url>
cd focusflow
npm install
npm run dev


Or (recommended on Windows):

pnpm install
pnpm dev

🧪 Known Issues & Fixes
Sonner / Vite Error (Windows)

If you encounter:

Unterminated string literal (sonner/dist/index.mjs)


✅ Fix:

Move project out of OneDrive

Clean install dependencies

Pin Sonner version:

npm install sonner@1.4.1

🎯 MVP Scope (Hackathon)

Focus Session flow

Notification classification (mocked)

Live notification feed

Summary dashboard

Polished UI with animations

Mobile-first experience

Judges forgive mock backends.
Judges don’t forgive bad UI.

📈 Future Enhancements

Agentic AI for real notification classification

OS-level notification integration

Personalized focus insights

Calendar & Slack integrations

Cloud sync and user accounts

👥 Team & Roles

(Can be updated based on final team composition)

Frontend: UI, animations, responsiveness

Backend (planned): Agent logic & prioritization

Design: UX consistency & polish

Product: Flow & usability decisions

🏁 Final Goal

FocusFlow aims to be a calm, trustworthy, premium productivity app that users would actually pay for — helping them stay focused without disconnecting from what matters.