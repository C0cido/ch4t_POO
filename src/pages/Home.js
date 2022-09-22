import React from 'react'
import { useAuth } from "../context/authContext"

export default function Home() {
  const {user, logout, loading} = useAuth()
  const handleLogout = async () => {
    try {
      await logout ();
    } catch (error) {
      console.error(error.message);
    }
  }
  if (loading) return <h1> Loading.. </h1>
  return (
    <div> 
      <h1>
        Welcome {user.displayName || user.email}
      </h1>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
