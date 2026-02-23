import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Calendario from './pages/Calendario';
import Salas from './pages/Salas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de Login */}
        <Route path="/" element={<Login />} />

        {/* Rotas Protegidas por Layout */}
        <Route element={<Layout />}>
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/salas" element={<Salas />} />
        </Route>

        {/* Fallback para Login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;