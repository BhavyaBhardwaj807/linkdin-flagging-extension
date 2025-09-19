📌 LinkedIn Flagging & Reputation Extension

This project is a Chrome browser extension + Node.js backend that helps flag fake jobs, scammy messages, and unprofessional behavior on LinkedIn.
It includes a reputation score system, reporting templates, and mentor tips powered by Gemini AI.

🚀 Features

Flag Profiles/Posts → Report scam jobs, spam, or flirty/unprofessional messages.

Screenshot Evidence Upload → Users attach screenshots + text when flagging.

Reputation Score System → Tracks user trust level.

Templates → Quick “Networking Invite” / “Job Inquiry” messages.

Mentor Mode → AI-powered LinkedIn mentor tips (via Gemini AI).

📂 File Structure
linkedin-flagging-extension/
│
├── backend/                         # Node.js server (handles flags, scores, AI calls)(for admin)
│   ├── server.js                    # Express backend
│   ├── package.json                 # Backend dependencies
│   ├── serviceAccountKey.json       # Firebase Admin SDK key (keep secret)
│   └── .env                         # API keys (Gemini, Firebase, etc.)
│
├── extension/                       # Chrome Extension code
│   ├── manifest.json                # Extension config
│   ├── popup.html                   # UI for extension popup
│   ├── popup.js                     # Frontend logic (calls backend, UI handlers)
│   ├── styles.css                   # Styling for popup
│   ├── background.js                # Extension background logic
│   └── icons/
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
│
└── README.md   

⚙️ Setup Instructions
1️⃣ Backend Setup

Navigate to backend:

cd backend


Install dependencies:

npm install


Create .env file:

GOOGLE_API_KEY=your_gemini_api_key


Place your Firebase serviceAccountKey.json file in backend folder.

Run backend server:

node server.js


✅ Should start at: http://localhost:3000

2️⃣ Extension Setup

Go to Chrome → Extensions → Manage Extensions.

Enable Developer Mode (toggle top-right).

Click Load unpacked and select the extension/ folder.

Extension should now appear in your toolbar.

3️⃣ Usage

Open the extension popup.

Check Reputation → Enter LinkedIn profile URL.

Flag User → Paste content, add screenshot, select reason, click submit.

Mentor Mode → Enter your score and click Get Mentor Tips.

Templates → Quick copy networking/job messages.

🔐 Security Notes

Your Gemini API Key must be kept private → safest if used in backend only.

Do NOT commit serviceAccountKey.json or .env to GitHub.

If you use Gemini from frontend (popup.js), whitelist domain in manifest.json:

"permissions": [
  "https://generativelanguage.googleapis.com/*"
]
