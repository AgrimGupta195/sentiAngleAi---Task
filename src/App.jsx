import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Navbar from './components/Navbar' // <-- import Navbar
import { useAuth } from './context/authcontext'
import ChatPage from './pages/ChatPage'

const App = () => {
  const{userLoggedIn} = useAuth();
  return (
    <div className="bg-gray-800 min-h-screen flex flex-col">
      <Navbar /> {/* <-- Navbar always visible */}
      <div className="flex-1 flex items-center justify-center ">
        <Routes>
          <Route path="/" element={userLoggedIn ? <HomePage /> : <LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/chat" element={userLoggedIn ? <ChatPage /> : <LoginPage />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  )
}

export default App