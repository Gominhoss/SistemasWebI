import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Simulação de login: Se o email contém "admin", assume role admin
        const role = email.includes('admin') ? 'admin' : 'user';
        const user = {
            id: 1,
            nome: email.split('@')[0] || 'Usuário',
            email: email,
            role: role
        };

        localStorage.setItem('user', JSON.stringify(user));
        navigate('/calendario');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800">ICEA Reservas</h1>
                    <p className="text-slate-500 mt-2">Sistema de Gestão de Salas</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">E-mail Institucional</label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition"
                            placeholder="seuemail@icea.ufop.br"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-900 transition-colors font-semibold"
                    >
                        Entrar
                    </button>
                    
                    <p className="text-xs text-center text-slate-400 mt-4 italic">
                        Dica: use um e-mail com "admin" para testar permissões de administrador.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;