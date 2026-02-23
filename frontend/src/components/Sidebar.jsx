import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    if (!user) return null;

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col shadow-2xl transition-all duration-300">
            <div className="p-6 border-b border-slate-700">
                <h1 className="text-xl font-bold tracking-tight text-white">ICEA Reservas</h1>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Portal de Gestão</p>
            </div>
            
            <nav className="flex-1 mt-8 px-4 space-y-2">
                <NavLink 
                    to="/calendario" 
                    className={({ isActive }) => 
                        `flex items-center space-x-3 p-3 rounded-lg transition-colors font-medium text-sm ${
                            isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`
                    }
                >
                    <span className="w-5 h-5 flex items-center justify-center">📅</span>
                    <span>Calendário</span>
                </NavLink>

                {user.role === 'admin' && (
                    <NavLink 
                        to="/salas" 
                        className={({ isActive }) => 
                            `flex items-center space-x-3 p-3 rounded-lg transition-colors font-medium text-sm ${
                                isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        <span className="w-5 h-5 flex items-center justify-center">🏢</span>
                        <span>Gerenciar Salas</span>
                    </NavLink>
                )}
            </nav>

            <div className="mt-auto p-4 border-t border-slate-700 bg-slate-950/50">
                <div className="flex items-center space-x-3 mb-4 px-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                        {user.nome[0]}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-xs font-semibold text-white truncate">{user.nome}</p>
                        <p className="text-[10px] text-slate-500 capitalize">{user.role}</p>
                    </div>
                </div>
                <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 p-2 rounded-md text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-xs font-medium"
                >
                    <span className="w-4 h-4 flex items-center justify-center">🚪</span>
                    <span>Sair do Sistema</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;