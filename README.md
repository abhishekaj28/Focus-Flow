# FocusFlow  
Agentic AI-Powered Corporate Focus Assistant  
<br>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

FocusFlow is an Agentic AI assistant that helps working professionals maintain deep focus by intelligently filtering distractions, protecting deep-work time, and summarizing missed notifications.

---

## 🚀 Demo  
*(Demo GIF will be added soon)*  
![Demo Placeholder](./docs/demo.gif)
---

## 💡 Overview  
Modern professionals face constant interruptions from Slack, Teams, WhatsApp, email, and calendar notifications.  
These distractions break deep-work flow and lead to stress, context switching, and reduced productivity.

**FocusFlow solves this by acting as an intelligent distraction shield.**

---

## 🧠 Key Features
- **Focus Mode Toggle** — Start/stop deep-work sessions  
- **Notification Simulator** — Email, Slack, Calendar, Social pings (for demo)  
- **Agent Decision Engine**
  - Allow (urgent)  
  - Mute (low-value)  
  - Queue (review later)  
- **Focus Session Summary** — Total focus time, allowed/muted/queued breakdown  
- **Basic Deep-Work Analytics** — Top distractors, productivity pattern  
- **User Preference Learning** — Agent adapts based on corrections
  
---

## 🏗️ Architecture

**Frontend (React)** → **FastAPI Backend** → **Agent Engine (LLM + Rules)** → **Firestore (Realtime DB)**

---

## 🛠️ Tech Stack
- **Frontend:** React + Tailwind  
- **Backend:** FastAPI (Python)  
- **Agent Engine:** OpenAI / Gemini + Rule-based reasoning  
- **Database:** Firebase Firestore (Realtime)  
- **Deployment:** Firebase Hosting + Google Cloud Run

---

## 🔧 Local Development Setup
### Frontend (React)
1. Go to the frontend folder  
2. Install packages  
3. Run the development server  

``` bash
cd frontend
npm install
npm run dev
```


### Backend (FastAPI)
1. Go to the backend folder  
2. Create a virtual environment  
3. Install Python packages  
4. Run the API server  

```bash
cd backend
python -m venv venv
# macOS / Linux
source venv/bin/activate
# Windows
venv\Scripts\activate

pip install -r requirements.txt
uvicorn main:app --reload
```

---

### Environment Variables
Create a `.env` file (or use `.env.example`) with:
OPENAI_API_KEY=your_key_here
FIREBASE_CONFIG={"apiKey": "...", "authDomain": "...", "projectId": "..."}


---

### Running the Demo
1. Start both the frontend and backend  
2. Open the web UI  
3. Click **Start Focus Mode**  
4. Use the Notification Simulator to send test notifications  
5. End session → Review summary & insights  


---

## 👥 Team — Impacteers
- **Abhishek AJ** — Team Lead, Frontend, DevOps  
- **Aman** — Frontend, QA  
- **Aditya** — ML & Agent Logic  
- **Ananya** — Backend & Integrations

---

## 🤝 Contributing
We follow a simple workflow to keep development smooth:

1. Create a new branch:  
   `feature/<your-feature-name>`
2. Commit changes with clear messages  
3. Open a Pull Request to the `main` branch  
4. Add a short description of the change  
5. Include testing steps if applicable

---

## 📜 License
This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for more details.






