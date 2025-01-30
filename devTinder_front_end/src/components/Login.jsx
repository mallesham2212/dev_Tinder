import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/constants';

const Login = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState("")
    const [Email, setEmail] = useState("rama@gmail.com")
    const [passWord, setPassword] = useState("Chinna@123")
    // const [Email, setEmail] = useState("")
    // const [passWord, setPassword] = useState("")
    const [firstName, setFirstName] = useState("sd");
    const [lastName, setLastName] = useState("s");
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(false)
    const handleSubmit = async () => {
        try {
            const res = await axios.post(BASE_URL + "login", {
                Email,
                passWord
            }, { withCredentials: true })
            dispatch(addUser(res.data))         
            return navigate("/feed")
        } catch (error) {
            setError(error?.response?.data || "something went wrong");
        }
    }
    const handleSignUp = async () => {
        try {
            const res = await axios.post(BASE_URL+"signup", {
                firstName,
                lastName,
                Email,
                passWord
            },{withCredentials:true})   
            if(res.status==200){             
                dispatch(addUser(res?.data?.data))
                navigate("/profile")
                setIsLogin(!isLogin)
            }      
        } catch (error) {
            setError(error?.response?.data)         
        }    
    }
    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">{isLogin ? "Login" :"Sign Up"}</h2>
                    {!isLogin && <>
                        <label className="input input-bordered flex items-center gap-2">

                            <input onChange={(e) => {
                                setFirstName(e.target.value)
                            }} type="text" className="grow" placeholder="First Name" value={firstName} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">

                            <input onChange={(e) => {
                                setLastName(e.target.value)
                            }} type="text" className="grow" placeholder="Last Name" value={lastName} />
                        </label></>}

                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input onChange={(e) => {
                            setEmail(e.target.value)
                        }} type="text" className="grow" placeholder="Email" value={Email} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input onChange={(e => {
                            setPassword(e.target.value)
                        })} type="password" className="grow" placeholder='password' value={passWord} />
                    </label>
                    {error && <p className='text-red-700'> {error} </p> }
                    <div className="card-actions justify-center">
                        {
                            !isLogin ? <button onClick={ handleSignUp } className="btn btn-primary flex align-middle">Sign In</button> : 
                            <button onClick={ handleSubmit } className="btn btn-primary flex align-middle">Login</button> 
                        }
                    </div>
                    <p onClick={()=> setIsLogin(!isLogin)} className='text-center hover:underline cursor-pointer'>{isLogin ? "don't have an account" : "existing user"}</p>

                </div>
            </div>
        </div>
    )
}



export default Login