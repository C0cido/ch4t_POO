import React from 'react'
import { useState } from 'react'

export default function Login() {
  const [user, setUser] = useState({
    email:'',
    password:''
  })
  return (
    <div>
      <form>
        <input type="email" name="email" id="email" />
        <input type="password" name="password" id="password" />
      </form>
    </div>
  )
}
