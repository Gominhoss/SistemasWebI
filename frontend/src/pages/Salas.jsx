import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Salas = () => {
    const [salas, setSalas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSala, setSelectedSala] = useState(null);
    const [formData, setFormData] = useState({ nome: '', localizacao: '', capacidade: '' });
    const [toast, setToast] = useState({ text: '', type: '' });

    const showToast = (text, type = 'success') => {
        setToast({ text, type });
        setTimeout(() => setToast({ text: '', type: '' }), 4000);
    };

    const fetchSalas = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/salas');
            setSalas(res.data);
        } catch (err) {
            showToast('Erro ao carregar salas', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSalas();
    }, []);

    const handleOpenModal = (sala = null) => {
        if (sala) {
            setSelectedSala(sala);
            setFormData({ nome: sala.nome, localizacao: sala.localizacao || '', capacidade: sala.capacidade || '' });
        } else {
            setSelectedSala(null);
            setFormData({ nome: '', localizacao: '', capacidade: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedSala) {
                await api.put(`/salas/${selectedSala.id}`, formData);
                showToast('Sala atualizada com sucesso!');
            } else {
                await api.post('/salas', formData);
                showToast('Sala cadastrada com sucesso!');
            }
            setIsModalOpen(false);
            fetchSalas();
        } catch (err) {
            showToast('Erro ao salvar sala', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir esta sala? Todas as reservas associadas poderão ser afetadas.')) return;
        try {
            await api.delete(`/salas/${id}`);
            showToast('Sala excluída com sucesso!');
            fetchSalas();
        } catch (err) {
            showToast('Erro ao excluir sala', 'error');
        }
    };

    return (
        <div className="animate-fade-in relative">
            {/* Toast */}
            {toast.text && (
                <div className={`fixed top-10 right-10 z-50 p-4 rounded-lg shadow-xl border-l-4 transform transition-all animate-bounce
                    ${toast.type === 'error' ? 'bg-red-50 border-red-600 text-red-800' : 'bg-green-50 border-green-600 text-green-800'}`}>
                    <p className="font-bold text-sm">{toast.text}</p>
                </div>
            )}

            <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Gestão de Salas</h2>
                    <p className="text-slate-500 mt-1">Administre os espaços físicos disponíveis para reserva no ICEA.</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-slate-200 flex items-center gap-2"
                >
                    <span className="text-xl">+</span> Nova Sala
                </button>
            </header>

            {isLoading ? (
                <div className="flex justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nome da Sala</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Localização</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capacidade</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {salas.map(sala => (
                                <tr key={sala.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-400">#{sala.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-700">{sala.nome}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{sala.localizacao || 'Não informada'}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold">{sala.capacidade || '0'} pessoas</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-3">
                                            <button 
                                                onClick={() => handleOpenModal(sala)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Editar Sala"
                                            >
                                                ✏️
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(sala.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Excluir Sala"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {salas.length === 0 && (
                        <div className="p-20 text-center text-slate-400 font-medium">
                            Nenhuma sala encontrada no sistema.
                        </div>
                    )}
                </div>
            )}

            {/* Modal CRUD */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                        <header className="p-6 bg-slate-800 text-white">
                            <h3 className="text-xl font-bold">{selectedSala ? 'Editar Sala' : 'Cadastrar Nova Sala'}</h3>
                            <p className="text-xs opacity-70 mt-1">Insira as especificações do ambiente.</p>
                        </header>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Nome da Sala</label>
                                <input 
                                    type="text" required value={formData.nome}
                                    onChange={e => setFormData({...formData, nome: e.target.value})}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition text-sm"
                                    placeholder="Ex: Sala de Reunião A"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Localização (Bloco/Andar)</label>
                                <input 
                                    type="text" value={formData.localizacao}
                                    onChange={e => setFormData({...formData, localizacao: e.target.value})}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition text-sm"
                                    placeholder="Ex: Bloco 1 - 2º Andar"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Capacidade Máxima</label>
                                <input 
                                    type="number" value={formData.capacidade}
                                    onChange={e => setFormData({...formData, capacidade: e.target.value})}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition text-sm"
                                    placeholder="Ex: 10"
                                />
                            </div>
                            <div className="pt-4 flex flex-col gap-2">
                                <button type="submit" className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all">
                                    {selectedSala ? 'Salvar Alterações' : 'Cadastrar Sala'}
                                </button>
                                <button 
                                    type="button" onClick={() => setIsModalOpen(false)}
                                    className="w-full py-3 text-slate-400 text-sm font-medium hover:text-slate-600 transition-all">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Salas;