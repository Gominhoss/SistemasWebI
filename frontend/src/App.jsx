import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Importação obrigatória para validação
import Login from './pages/Login';
import Calendario from './pages/Calendario';
import Salas from './pages/Salas';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route element={<Layout />}>
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/salas" element={<Salas />} />
        </Route>

        {/* Fallback para evitar 404 em rotas não definidas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;