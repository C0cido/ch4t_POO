import React, { useState } from "react";
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {db, auth} from '../firebase';

const SendMessage = () => {
    const [input, setInput] = useState('');
    const sendMessage = async e => {
        e.preventDefault();
        const {uid, displayName, photoURL} = auth.currentUser;
        await addDoc(collection(db, 'messages'),{
            text: input,
            name: displayName,
            uid,
            photo: photoURL || 'default_user.jpg',
            timestamp: serverTimestamp()
        })
        setInput('');
    }   
    return ( 
        <form onSubmit={sendMessage}>
            <input type='text'
            placeholder='Mensaje'
            value={input}
            onChange={e=>setInput(e.target.value)}>
            </input>
            <button type='submit'>
                Enviar
            </button>
        </form>
     ); 
}
export default SendMessage