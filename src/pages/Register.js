import React from 'react'
import { useState } from 'react'
import { useAuth }from '../context/authContext'
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

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
    <body className='text-center'>
      <main className='form-signin w-100 m-auto'>
        {error && <Alert message={error}/>}
          <form onSubmit={handleSubmit}>
            <h1 className='h3 mb-3 fw-normal'> Registrarse </h1>
            <div className='form-floating'>
            <input 
              type="email" 
              className='form-control'
              id='floatingInput'
              name="email" 
                onChange={handleChange}
            />
            <label for='floatingInput'> Correo Electronico </label>
            </div>
            <div className='form-floating'>
            <input 
              type="password" 
              className='form-control'
              name="password" 
              id="floatingPassword"
                onChange={handleChange}
            />
            <label for='floatingPassword'> Contraseña </label>
            </div>
            <button className='w-100 btn btn-lg btn-primary'> Registrarse </button>
          </form>
      </main>
    </body>
  )
}