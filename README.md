# ChatWithAi

A modern AI chat web app built with React and Firebase.

## Features

- User authentication (Email/Password & Google)
- Real-time chat powered by Firebase Realtime Database
- Responsive, mobile-friendly UI
- Persistent chat history per user
- Modern design with Tailwind CSS

## Tech Stack

- [React]
- [Firebase (Auth, Realtime Database, Analytics)]
- [Tailwind CSS]
- [Vite]

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AgrimGupta195/sentiAngleAi---Task.git
cd chatwithai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Create a `.env` file in the root directory and add your Firebase config:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> **Note:** Never commit your `.env` file to public repositories.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

```
src/
  components/      # Reusable UI components (Navbar, MessageInput, etc.)
  context/         # React context for authentication
  firebase/        # Firebase configuration and initialization
  pages/           # Main pages (HomePage, LoginPage, SignUpPage, ChatPage)
  App.jsx          # Main app component
  main.jsx         # Entry point
```

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

