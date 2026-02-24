import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Importação obrigatória para validação
import Login from './pages/Login';
import Calendario from './pages/Calendario';

// Componente para proteger rotas: se não houver token, manda para o Login
const RotaProtegida = ({ children }) => {
  const token = localStorage.getItem('access_token');
  return token ? children : <Navigate to="/" />;
};

// Resolução do SonarQube (S6774): Validando rigorosamente a prop 'children'
RotaProtegida.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/calendario" element={
          <RotaProtegida>
            <Calendario />
          </RotaProtegida>
        } />
      </Routes>
    </Router>
  );
}

export default App;