import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/authcontext/index'
import Navbar from '../components/Navbar'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const HomePage = () => {
  const { userLoggedIn } = useAuth();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User UID:", user.uid);
      } else {
        console.log("User not signed in.");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
  <>
    {/* Navbar can be included here if needed */}
    <Navbar/>
    <div className='min-h-screen flex items-center justify-center flex-col bg-gray-800 text-center p-4'>
        <h1 className='text-4xl font-bold text-white'>Welcome to  ChatWithAi</h1>
        <Link to={userLoggedIn ? "/chat" : "/login"}>
            <button className='mt-4 px-9 text-xl font-bold py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-500'>
              Let's Start
            </button>
        </Link>
    </div>
    </>
  )
}

export default HomePage