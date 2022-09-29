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
  
  const { login, loginWithGoogle, loginWithGithub, saveUser, stateUser, resetPassword }= useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value})
  };
  //PopUp Google
  const handleGoogleSignin = async () => {
    try {
      const userGoogledb = await loginWithGoogle();
      saveUser(userGoogledb);
      stateUser(userGoogledb);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  }
  //PopUp Github
  const handleGithubSignin = async () => {
    try {
      const userGithubdb = await loginWithGithub();
      saveUser(userGithubdb);
      stateUser(userGithubdb);
      navigate('/')
    } catch (error) {
      setError(error.message);
    }
  }
  //Iniciar Sesion Default
  const handleSubmit = async (e) =>{
    e.preventDefault()
    setError('')
    try {
      const defaultUser = await login(user.email, user.password)
      stateUser(defaultUser);
      navigate('/')
    }catch (error){
      console.log(error.code)
      setError(error.message);
    }
  }
  //Restablecer Contraseña
  const handleResetPassword = async () => {
    if (!user.email) return setError('Ingresa tu email');
    try {
      await resetPassword(user.email)
      setError('Recibiras un email de enlace para restablecer tu contraseña en tu bandeja de entrada. Sino aparece ahi, busque en el correo no deseado/spam');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
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
            <label htmlFor='floatingInput'> Correo Electronico </label>
          </div>
          <div className='form-floating'>
            <input 
              type="password" 
              className='form-control'
              id='floatingPassword'
              name="password" 
                onChange={handleChange}
            />
            <label htmlFor='floatingPassword'> Contraseña </label>
          </div>
            <button className='w-10 btn btn-lg btn-primary'> Entrar </button>
          </form>
          <button className='w-10 btn btn-dark btn-primary' onClick={handleGoogleSignin}> Conectarse con Google </button>
          <button className='w-10 btn btn-dark btn-primary' onClick={handleGithubSignin}> Conectarse con Github </button>
          <p> No tenes una cuenta? <Link to='/register'> Registrarse </Link></p>
          <a href='#!' className='inline-block aling-baseline font-bold text-sm text-blue-500 hover:text-blue-800' onClick={handleResetPassword}> Olvidaste tu Contraseña? </a>
    </main>
  )
}