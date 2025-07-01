import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authcontext/index'
import { doSignOut } from '../firebase/auth'

const Navbar = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
        <nav className="flex flex-row justify-between items-center w-full z-20 fixed top-0 left-0 h-16 px-8 border-b border-gray-800 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg">
            <Link
                to={'/'} className="text-2xl font-bold text-white tracking-wide select-none"
                ><div >
                ChatWithAi
            </div></Link>
            <div className="flex gap-x-6 items-center">
                {userLoggedIn ? (
                    <button
                        onClick={() => { doSignOut().then(() => { navigate('/login') }) }}
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200 shadow"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link
                            className="px-4 py-2 rounded-lg bg-transparent border border-blue-500 text-blue-400 font-semibold hover:bg-blue-500 hover:text-white transition duration-200"
                            to={'/login'}
                        >
                            Login
                        </Link>
                        <Link
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200 shadow"
                            to={'/signup'}
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar