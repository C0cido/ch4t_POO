import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, sendPasswordResetEmail} from 'firebase/auth';
import { auth, db } from '../firebase';
import {doc, setDoc, updateDoc } from 'firebase/firestore';

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
    //Guardar Usuario
    const saveUser = async (user) => {
        if (!user) return
        await setDoc (doc(db,"user", user.user.uid),{
            uid: user.user.uid,
            name: user.user.displayName,
            email: user.user.email,
            photo_url: user.user.photoURL,
            itsOnline: false,
        })
    }
    //Cambiar estado online
    const stateUser = async (user) => {
        await updateDoc (doc(db, "user", user.user.uid),{
            itsOnline : true
        })
    }
    //Restablecer Contraseña
    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email);
    }
    useEffect(()=>{
    const unsubscribe = onAuthStateChanged (auth, (currentUser) => {
            setUser(currentUser);
            setLoading (false)
        })
        return () => unsubscribe();
    }, [])  
    return (
        <authContext.Provider value={{ signup, login, user, logout, loading, loginWithGoogle, loginWithGithub, saveUser, stateUser, resetPassword }}>
            {children}
        </authContext.Provider>
    )
}