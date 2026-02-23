import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../services/api';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const Calendario = () => {
    const [reservas, setReservas] = useState([]);
    const [salas, setSalas] = useState([]);
    const [salaSelecionadaId, setSalaSelecionadaId] = useState('');
    const [user] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
    
    // Estados do Modal e Formulário
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReserva, setSelectedReserva] = useState(null);
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        data: '',
        horaInicio: '',
        horaFim: '',
        room_id: ''
    });
    
    const [mensagem, setMensagem] = useState({ type: '', text: '' });

    const showToast = (text, type = 'success') => {
        setMensagem({ text, type });
        setTimeout(() => setMensagem({ text: '', type: '' }), 5000);
    };

    const carregarSalas = async () => {
        try {
            const response = await api.get('/salas');
            setSalas(response.data);
            if (response.data.length > 0 && !salaSelecionadaId) {
                setSalaSelecionadaId(response.data[0].id.toString());
            }
        } catch (error) {
            console.error("Erro ao carregar salas:", error);
        }
    };

    const carregarReservas = useCallback(async () => {
        try {
            const response = await api.get('/reservas');
            let data = response.data;
            if (salaSelecionadaId) {
                data = data.filter(res => res.room_id.toString() === salaSelecionadaId);
            }
            const formatadas = data.map(res => ({
                id: res.id,
                title: res.titulo,
                start: new Date(res.start_time),
                end: new Date(res.end_time),
                resource: res
            }));
            setReservas(formatadas);
        } catch (error) {
            console.error("Erro ao carregar reservas:", error);
        }
    }, [salaSelecionadaId]);

    useEffect(() => {
        carregarSalas();
    }, []);

    useEffect(() => {
        carregarReservas();
    }, [carregarReservas]);

    const handleSelectSlot = ({ start, end }) => {
        if (!salaSelecionadaId) {
            showToast('Selecione uma sala primeiro.', 'error');
            return;
        }
        setSelectedReserva(null);
        setFormData({
            titulo: '',
            descricao: '',
            data: moment(start).format('YYYY-MM-DD'),
            horaInicio: moment(start).format('HH:mm'),
            horaFim: moment(end).format('HH:mm'),
            room_id: salaSelecionadaId
        });
        setIsModalOpen(true);
    };

    const handleSelectEvent = (event) => {
        const res = event.resource;
        setSelectedReserva(res);
        setFormData({
            titulo: res.titulo,
            descricao: res.descricao,
            data: moment(res.start_time).format('YYYY-MM-DD'),
            horaInicio: moment(res.start_time).format('HH:mm'),
            horaFim: moment(res.end_time).format('HH:mm'),
            room_id: res.room_id.toString()
        });
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        // VALIDAÇÃO DE HORÁRIOS (Frontend)
        if (formData.horaFim <= formData.horaInicio) {
            showToast('A hora de término deve ser após a hora de início.', 'error');
            return;
        }

        const payload = {
            user_id: user.id,
            room_id: formData.room_id,
            titulo: formData.titulo,
            descricao: formData.descricao,
            start_time: `${formData.data} ${formData.horaInicio}:00`,
            end_time: `${formData.data} ${formData.horaFim}:00`
        };

        try {
            if (selectedReserva) {
                await api.put(`/reservas/${selectedReserva.id}`, payload);
                showToast('Reserva atualizada com sucesso!');
            } else {
                await api.post('/reservas', payload);
                showToast('Reserva criada com sucesso!');
            }
            setIsModalOpen(false);
            carregarReservas();
        } catch (err) {
            if (err.response && err.response.status === 409) {
                showToast(err.response.data.erro || 'Conflito de horário!', 'error');
            } else {
                showToast('Erro ao processar reserva.', 'error');
            }
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Deseja cancelar esta reserva?')) return;
        try {
            await api.delete(`/reservas/${selectedReserva.id}`);
            showToast('Reserva cancelada!');
            setIsModalOpen(false);
            carregarReservas();
        } catch (err) {
            showToast('Erro ao cancelar.', 'error');
        }
    };

    // Lógica de UI para verificar se o usuário pode editar/excluir
    const podeEditar = selectedReserva && (user.role === 'admin' || selectedReserva.user_id === user.id);

    return (
        <div className="h-[calc(100vh-120px)] animate-fade-in relative">
            {mensagem.text && (
                <div className={`fixed top-10 right-10 z-[100] p-4 rounded-lg shadow-2xl border-l-4 transform transition-all animate-bounce
                    ${mensagem.type === 'error' ? 'bg-red-50 border-red-600 text-red-800' : 'bg-green-50 border-green-600 text-green-800'}`}>
                    <p className="font-bold text-sm">{mensagem.text}</p>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
                <header className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Reservas de Salas</h2>
                        <p className="text-sm text-slate-500">Filtrando reservas para a sala selecionada.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="text-xs font-bold text-slate-400 uppercase">Sala:</label>
                        <select 
                            value={salaSelecionadaId}
                            onChange={(e) => setSalaSelecionadaId(e.target.value)}
                            className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm font-bold text-slate-700 outline-none"
                        >
                            <option value="">Selecione...</option>
                            {salas.map(sala => (
                                <option key={sala.id} value={sala.id}>{sala.nome}</option>
                            ))}
                        </select>
                    </div>
                </header>

                <div className="flex-1 p-6 overflow-hidden">
                    <Calendar
                        localizer={localizer}
                        events={reservas}
                        startAccessor="start"
                        endAccessor="end"
                        selectable
                        onSelectSlot={handleSelectSlot}
                        onSelectEvent={handleSelectEvent}
                        style={{ height: '100%' }}
                        messages={{
                            next: "Próximo", previous: "Anterior", today: "Hoje",
                            month: "Mês", week: "Semana", day: "Dia", agenda: "Agenda"
                        }}
                    />
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                        <header className={`p-6 text-white ${selectedReserva ? 'bg-blue-700' : 'bg-slate-800'}`}>
                            <h3 className="text-xl font-bold">{selectedReserva ? 'Visualizar / Editar' : 'Nova Reserva'}</h3>
                            <p className="text-xs opacity-80 mt-1">Sua reserva no Campus ICEA</p>
                        </header>

                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Título</label>
                                <input 
                                    type="text" required value={formData.titulo}
                                    readOnly={selectedReserva && !podeEditar}
                                    onChange={e => setFormData({...formData, titulo: e.target.value})}
                                    className={`w-full p-3 border border-slate-200 rounded-xl outline-none text-sm ${selectedReserva && !podeEditar ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50'}`}
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Descrição</label>
                                <textarea 
                                    required value={formData.descricao}
                                    readOnly={selectedReserva && !podeEditar}
                                    onChange={e => setFormData({...formData, descricao: e.target.value})}
                                    className={`w-full p-3 border border-slate-200 rounded-xl outline-none text-sm min-h-[80px] ${selectedReserva && !podeEditar ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50'}`}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Data</label>
                                    <input 
                                        type="date" required value={formData.data}
                                        readOnly={selectedReserva && !podeEditar}
                                        onChange={e => setFormData({...formData, data: e.target.value})}
                                        className={`w-full p-3 border border-slate-200 rounded-xl outline-none text-sm ${selectedReserva && !podeEditar ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50'}`}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input 
                                        type="time" required value={formData.horaInicio}
                                        readOnly={selectedReserva && !podeEditar}
                                        onChange={e => setFormData({...formData, horaInicio: e.target.value})}
                                        className={`w-full p-3 border border-slate-200 rounded-xl outline-none text-sm ${selectedReserva && !podeEditar ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50'}`}
                                    />
                                    <input 
                                        type="time" required value={formData.horaFim}
                                        readOnly={selectedReserva && !podeEditar}
                                        onChange={e => setFormData({...formData, horaFim: e.target.value})}
                                        className={`w-full p-3 border border-slate-200 rounded-xl outline-none text-sm ${selectedReserva && !podeEditar ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50'}`}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col gap-2">
                                {(!selectedReserva || podeEditar) && (
                                    <button type="submit" className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all">
                                        {selectedReserva ? 'Salvar Alterações' : 'Confirmar Reserva'}
                                    </button>
                                )}
                                
                                {selectedReserva && podeEditar && (
                                    <button type="button" onClick={handleDelete} className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-all">
                                        Cancelar Reserva
                                    </button>
                                )}

                                {selectedReserva && !podeEditar && (
                                    <div className="p-3 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-lg border border-amber-100 text-center uppercase tracking-wider">
                                        Somente Leitura (Reserva de outro usuário)
                                    </div>
                                )}

                                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full py-2 text-slate-400 text-sm font-medium">Voltar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendario;