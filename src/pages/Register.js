import React from 'react'
import { useState } from 'react'
import { useAuth }from '../context/authContext'
import { useNavigate } from 'react-router-dom';
import { Alert } from './Alert';

export default function Register() {
  const [user, setUser] = useState({
    email: '',
    password:'',
  });
  
  const { signup }= useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  };

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setError('')
    try {
      await signup(user.email, user.password)
      navigate('/');
    }catch (error){
      console.log(error.code)
      setError(error.message);
    }
  }

  return (
    <div>
      {error && <Alert message={error}/>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email"> Email </label>
          <input 
            type="email" 
            name="email" 
            placeholder=" "
              onChange={handleChange}
          />

          <label htmlFor="password"> Password </label>
          <input 
            type="password" 
            name="password" 
            placeholder="******"
            id="password"
              onChange={handleChange}
          />

          <button> Registrarse </button>
        </form>
    </div>
  )
}