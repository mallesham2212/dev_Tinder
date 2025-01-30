import React, { useEffect } from 'react'
import Navbar from '../pages/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../utils/userSlice'
const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((store) => store.user)


    const fetchUser = async () => {
        if (user) return;
        try {
            const res = await axios.get(BASE_URL + "profile/view", { withCredentials: true }
            )
            dispatch(addUser(res.data))
        } catch (error) {
            if (error.status === 401) {
                navigate("/login")
            }         
        }
    }

    useEffect(() => {
        fetchUser()

    }, [])
    return (

        <>
            <Navbar />
            <Outlet />
        </>
    )
}
export default Body