# FocusFlow

**Prioritize focus, not noise.**

FocusFlow is a hackathon-origin prototype of a focus-session app that sorts incoming notifications into "allowed" and "deferred" while you work, and shows a summary when the session ends. The React frontend in this repository is a working UI demo that runs entirely in the browser: authentication, notifications and the AI assistant are simulated with hardcoded data and timers. A separate FastAPI backend prototype (with a Gemini-based summarizer) exists only inside `focusflow.zip` and is **not wired to the frontend**.

## Status

| Area | Status | Notes |
| --- | --- | --- |
| Focus session start/stop, live timer | Works | Persists across reloads via `localStorage` |
| Settings toggles (dark mode, break reminders, strict mode, AI mode) | Works | Saved to `localStorage`; auto dark mode, 25-minute reminder toast and strict mode affect the UI |
| Session summary screen | Partly mock | Counts are real for the session; the per-app breakdown (Slack/Email/Calendar/Social) is a fixed 50/30/20 split of the total, not real data |
| Incoming notifications during focus | Mock | A fixed list of 6 sample notifications is replayed on a timer; no real notification source |
| Allow/defer decisions | Mock | Statuses are hardcoded per sample notification; the "AI" setting only changes the label text (and allows messages containing "urgent", which none of the samples do) |
| AI chat assistant | Mock | Replies are picked at random from 5 canned strings after a fake delay; no model is called |
| Login / Sign up / "Sign in with Google" | Mock | No credentials are checked; a fake user is stored in `localStorage`. No Firebase or any auth service in the code |
| FastAPI backend | Not in the repo tree | Prototype is only in `focusflow.zip` (see below); not integrated |
| Firebase | Not implemented | No Firebase code or dependency in this repo |
| Real notification capture, cross-device sync, deployment | Planned / not started | |

### About the backend in `focusflow.zip`

The archive contains a small FastAPI app: `POST /api/notify` (rule-based ALLOW/QUEUE decision, in-memory queue) and `GET /api/summary` (summarizes queued notifications with Google Gemini, falling back to a plain count if the call fails). It reads `GEMINI_API_KEY` from the environment. The archive's own `README.txt` mentions CORS, but `main.py` in the archive does not configure it. The frontend never calls these endpoints. The archive has not been tested as part of this README.

## Tech stack (from `package.json`)

React 18, TypeScript, Vite 7 (SWC), Tailwind CSS 3, shadcn/ui (Radix UI primitives), Framer Motion, React Router 6, TanStack Query (set up but unused for data fetching), React Hook Form, Zod, Recharts, Sonner, lucide-react. Dev tooling: ESLint 9, `lovable-tagger`.

## Run locally

Requires Node.js and npm.

```bash
npm install
npm run dev      # dev server, http://localhost:8080
npm run build    # production build into dist/
npm run preview  # serve the production build
npm run lint     # ESLint
```

`npm install && npm run build` was run successfully while preparing this README.

## Project structure

```
src/
  pages/                 Index, Login, SignUp, NotFound
  components/FocusFlow/  Dashboard, sidebar, timer, notification list, summary, settings, AI chat
  components/ui/         shadcn/ui components
  context/               Focus, Notification, Settings, Auth state (React context + localStorage)
  hooks/                 useFocusTimer, toast, mobile detection
focusflow.zip            Unintegrated FastAPI backend prototype
```

## Known limitations

- All data is simulated; nothing reads real notifications from any app or device.
- Auth is fake and provides no security. Do not treat any login as real.
- Login pages and the dashboard use two different `localStorage` auth mechanisms (`isAuthenticated` vs `focusflow_user`), so signed-in state can be inconsistent.
- The "Notification Rules" setting is stored but has no effect on behavior.
- No tests are present.

## Team

Built by a team; contributors per the git history:

- AJ Abhishek
- ananyap2024
- aman1011019
- Aditya Mishra

## License

See [LICENSE](LICENSE).
