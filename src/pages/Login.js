import React from 'react'
import { useState } from 'react'
import { useAuth }from '../context/authContext'
import { Link, useNavigate } from 'react-router-dom';
import Alert from './Alert';


export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password:'',
  });
  
  const { login, loginWithGoogle, loginWithGithub }= useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  };
  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  }
  const handleGithubSignin = async () => {
    try {
      await loginWithGithub();
      navigate('/')
    } catch (error) {
      setError(error.message);
    }
  }
  const handleSubmit = async (e) =>{
    e.preventDefault()
    setError('')
    try {
      await login(user.email, user.password)
      navigate('/')
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
          <h1> Iniciar Sesion </h1>
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
              id='floatingPassword'
              name="password" 
                onChange={handleChange}
            />
            <label for='floatingPassword'> Contraseña </label>
          </div>
            <button className='w-10 btn btn-lg btn-primary'> Entrar </button>
          </form>
          <button className='w-10 btn btn-dark btn-primary' onClick={handleGoogleSignin}> Conectarse con Google </button>
          
          <button className='w-10 btn btn-dark btn-primary' onClick={handleGithubSignin}> Conectarse con Github </button>
          
          <p> No tenes una cuenta? <Link to='/register'> Registrarse </Link></p>
    </main>
    </body>
  )
}