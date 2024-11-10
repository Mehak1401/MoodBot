import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()

    return (
        <div className="flex bg-transparent">
            {/* Sidebar with transparent background and white border */}
            <div className="w-16 bg-transparent border-r-2 border-white fixed top-0 left-0 h-full flex flex-col items-center py-4 backdrop-blur-lg">
                <Link to={'/login'} className='text-sm text-white-600 flex items-center justify-center mb-4'>
                    <FaSignInAlt size={20} />
                </Link>
                <Link to={'/register'} className='text-sm text-white-600 flex items-center justify-center mb-4'>
                    <FaUserPlus size={20} />
                </Link>
                {userLoggedIn && (
                    <button 
                        onClick={() => { 
                            doSignOut().then(() => { 
                                navigate('/login') 
                            }) 
                        }} 
                        className='text-sm text-white-600 flex items-center justify-center'>
                        <FaSignOutAlt size={20} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default Header
