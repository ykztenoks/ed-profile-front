import React, { useContext } from 'react'
import { SessionContext } from '../Contexts/SessionContext'
import { Navigate } from 'react-router-dom'

export default function ProfilePage() { 
const { token } = useContext(SessionContext)
console.log(token, '🪙')
if (!token) {
    return <p>Loading...</p>
}

  return (
    <div>Profile Page</div>
  )
}
