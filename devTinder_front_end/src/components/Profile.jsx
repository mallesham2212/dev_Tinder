import React from 'react'
import Edit from './Edit'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector((store)=> store.user)  
  return (
    <div>
      {user  &&  <Edit user={user} />}
    </div>
  )
}

export default Profile