import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from "./context/authContext"
import { ProtectedRoute } from './pages/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

export default function App() {
  return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
          }
          />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </AuthProvider>
  );
}
