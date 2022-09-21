import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from "./context/authContext"

export default function App() {
  return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </AuthProvider>
  );
}
