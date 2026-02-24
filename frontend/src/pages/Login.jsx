import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            const response = await api.post('/login', { email, password });
            
            // Guarda o token e os dados do utilizador no navegador
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.data));
            
            // Redireciona para o calendário
            navigate('/calendario');
        } catch (err) {
            // SonarQube S2486: Registrando o erro no console antes de exibir a mensagem
            console.error("Erro na tentativa de login:", err);
            setErro('Credenciais inválidas. Tente novamente.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-blue-900">ICEA Reservas</h2>
                    <p className="text-gray-500 text-sm mt-2">Faça login para aceder ao sistema</p>
                </div>

                {erro && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                        {erro}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        {/* SonarQube S6853: Adicionado htmlFor="email" */}
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                        <input 
                            id="email" 
                            type="email" 
                            required 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        {/* SonarQube S6853: Adicionado htmlFor="password" */}
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Palavra-passe</label>
                        <input 
                            id="password" 
                            type="password" 
                            required 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
