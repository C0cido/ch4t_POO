import React, { useState, useEffect} from 'react';
import { useAuth } from "../context/authContext";
import { db } from '../firebase';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import Message from '../components/Message';
import SendMessage from '../components/SendMessage';


export default function Home() {
  const {user, logout, loading} = useAuth()
  const handleLogout = async () => {
    try {
      await logout ();
    } catch (error) {
      console.error(error.message);
    }
  }
  const [messages, setMessages] = useState ([]);
    useEffect (()=>{
      const newQuery = query(collection(db, 'messages'), orderBy('timestamp'));
      const unsuscribe = onSnapshot(newQuery,(querySnapshot)=> {
        let currentMessages = [];
        querySnapshot.forEach(item=>{
          currentMessages.push ({content: item.data(), id: item.id})
        })
        setMessages(currentMessages);
      })
      return unsuscribe; 
    },[]) 
  if (loading) return <h1> Loading.. </h1>
  return (
    <section className='chat-content'>
      <h1>
        Bienvenido a la Sala 1, {user.displayName || user.email}
      </h1>
      {
        messages && messages.map(item => (
          <Message
            key={item.id}
            message={item.content}
          />
        ))
      }
      <SendMessage>
        
      </SendMessage>
      <button onClick={handleLogout}>
        Cerrar Sesion
      </button>
    </section>
  )
}
