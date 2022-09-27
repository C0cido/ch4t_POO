import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, GithubAuthProvider} from 'firebase/auth';
import { auth } from '../firebase';

export const authContext = createContext()
export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw new Error('There is not auth provider')
    return context
}

export function AuthProvider ({ children }){
    const [user, setUser] = useState (null);
    const [loading, setLoading] = useState (true);
    //Registrarse
    const signup = (email, password) => 
        createUserWithEmailAndPassword(auth, email, password);
    //Iniciar Sesion
        const login =(email, password) => 
        signInWithEmailAndPassword(auth, email, password);
    //Cerrar Sesion
        const logout = () => signOut(auth);
    //Iniciar Sesion con Gooogle
    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup (auth, googleProvider)
    }
    //Iniciar Sesion con Github
    const loginWithGithub = () => {
        const githubProvider = new GithubAuthProvider()
        return signInWithPopup (auth, githubProvider)
    }
    useEffect(()=>{
    const unsubscribe = onAuthStateChanged (auth, (currentUser) => {
            setUser(currentUser);
            setLoading (false)
        })
        return () => unsubscribe();
    }, [])  
    return (
        <authContext.Provider value={{ signup, login, user, logout, loading, loginWithGoogle, loginWithGithub }}>
            {children}
        </authContext.Provider>
    )
}