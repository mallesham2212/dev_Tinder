import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { removeUser } from '../../utils/userSlice';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import './style.css'

const Navbar = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user)
    const loggedIn = useSelector((store)=> store.login)
    
    const handleLogout = async () => {
        await axios.post(BASE_URL + "logout", {}, { withCredentials: true }
        )
        dispatch(removeUser());
        navigate("/login")
        
    }
    const handleNavigate = () => {
        if (isLogin) {
            setIsLogin(!isLogin)
            navigate("/login")
        }
        else {
            setIsLogin(!isLogin);
            navigate("/")
        }
    }
    const handleSignup = () => {
        navigate("/signup");
    }
    return (
        <div>
            <div id='navbar_in_main' className="navbar bg-base-300 sm:">
                <div className="flex-1">
                    <Link to="/feed" className="btn btn-ghost text-xl">devTinder</Link>
                </div>
                
              
                {user &&
                    <>
                        <div className='flex gap-2'>
                            <p id='username'>welcome {user.firstName}</p>
                        </div>

                        <div className="flex-none gap-2">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">



                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src={user.photoUrl} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li>
                                        <Link to="/profile" className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>
                                    <li><Link to="/connections" >connections</Link></li>
                                    <li><Link to="/connectionrequests">Pending Connections</Link></li>
                                    <li ><a onClick={handleLogout}>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </>}

            </div>


        </div>
    )
}

export default Navbar