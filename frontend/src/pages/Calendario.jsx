import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../services/api';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const Calendario = () => {
    // Estados do Calendário
    const [reservas, setReservas] = useState([]);
    const [dataAtual, setDataAtual] = useState(new Date());
    const [visualizacao, setVisualizacao] = useState('month');

    // Estados do Formulário
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFim, setHoraFim] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    const carregarReservas = () => {
        api.get('/reservas')
            .then(response => {
                const reservasFormatadas = response.data.map(reserva => ({
                    title: reserva.titulo,
                    start: new Date(reserva.start_time),
                    end: new Date(reserva.end_time),
                }));
                setReservas(reservasFormatadas);
            })
            .catch(error => console.error("Erro ao buscar reservas:", error));
    };

    useEffect(() => {
        carregarReservas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem('');
        setErro('');

        // Montar a estrutura de data e hora esperada pelo Laravel (YYYY-MM-DD HH:MM:SS)
        const start_time = `${data} ${horaInicio}:00`;
        const end_time = `${data} ${horaFim}:00`;

        try {
            await api.post('/reservas', {
                user_id: 1, // Fixo temporariamente
                room_id: 1, // Fixo temporariamente
                titulo,
                descricao,
                start_time,
                end_time
            });

            setMensagem('Reserva criada com sucesso!');
            carregarReservas(); // Atualiza a grelha do calendário instantaneamente
            
            // Limpar os campos após o sucesso
            setTitulo(''); setDescricao(''); setHoraInicio(''); setHoraFim('');
        } catch (err) {
            // Se a trava matemática do Laravel ativar, mostramos o erro ao utilizador
            if (err.response && err.response.status === 409) {
                setErro(err.response.data.erro);
            } else {
                setErro('Ocorreu um erro no servidor ao tentar gravar a reserva.');
            }
        }
    };

    return (
        <div style={{ display: 'flex', padding: '20px', gap: '20px', fontFamily: 'sans-serif', height: '95vh' }}>
            {/* Coluna Esquerda: Formulário de Registo */}
            <div style={{ width: '30%', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                <h3 style={{ marginBottom: '15px' }}>Nova Reserva</h3>
                
                {mensagem && <div style={{ color: 'green', marginBottom: '10px', fontWeight: 'bold' }}>{mensagem}</div>}
                {erro && <div style={{ color: 'red', marginBottom: '10px', fontWeight: 'bold' }}>{erro}</div>}
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input 
                        type="text" placeholder="Título da Reunião" aria-label="Título da Reunião" value={titulo} 
                        onChange={e => setTitulo(e.target.value)} required 
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
                    />
                    <textarea 
                        placeholder="Descrição" aria-label="Descrição" value={descricao} 
                        onChange={e => setDescricao(e.target.value)} required 
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '80px' }} 
                    />
                    <input 
                        type="date" aria-label="Data da Reserva" value={data} 
                        onChange={e => setData(e.target.value)} required 
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="horaInicio" style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Início</label>
                            <input 
                                id="horaInicio" type="time" value={horaInicio} 
                                onChange={e => setHoraInicio(e.target.value)} required 
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="horaFim" style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Fim</label>
                            <input 
                                id="horaFim" type="time" value={horaFim} 
                                onChange={e => setHoraFim(e.target.value)} required 
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
                            />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        style={{ padding: '10px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
                        Gravar Reserva
                    </button>
                </form>
            </div>

            {/* Coluna Direita: Calendário */}
            <div style={{ width: '70%', height: '100%' }}>
                <h2 style={{ marginBottom: '15px' }}>Salas de Reunião - ICEA</h2>
                <Calendar
                    localizer={localizer}
                    events={reservas}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '90%' }}
                    date={dataAtual}
                    onNavigate={(novaData) => setDataAtual(novaData)}
                    view={visualizacao}
                    onView={(novaVis) => setVisualizacao(novaVis)}
                    messages={{
                        next: "Próximo", previous: "Anterior", today: "Hoje",
                        month: "Mês", week: "Semana", day: "Dia", agenda: "Agenda"
                    }}
                />
            </div>
        </div>
    );
};

export default Calendario;