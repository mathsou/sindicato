import React, {useEffect} from 'react';
import {useState} from 'react';
import {FiFileText, FiEdit, FiTrash2} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';

import './styles.css';

import api from '../../services/api';
import mask from '../../functions/mascaraDinheiro';
import Cabecalho from '../Cabecalho';
import Menu from '../Menu';

Modal.setAppElement('#root');

export default function Agendamento () {
    localStorage.setItem('pag', 3);
    
    const [modalIsOpenCad, setModalIsOpenCad] = useState(false);
    const [modalIsOpenEvent, setModalIsOpenEvent] = useState(false);

    const [agendamento, setAgendamento] = useState([]);
    const [socios, setSocios] = useState([]);
    const [eventos, setEventos] = useState([]);

    const [idAgend, setIdAgend] = useState();
    const[socioId, setSocioId] = useState();
    const[dataHoraInicial, setDataHoraInicial] = useState();
    const[dataHoraFinal, setDataHoraFinal] = useState();
    const[observacao, setObservacao] = useState();
    const[valor, setValor] = useState();
    const[eventoId, setEventoId] = useState();
    const [matricula, setMatricula] = useState();
    const [socio, setSocio] = useState();
    const [evento, setEvento] = useState();



    useEffect(() => {
        api.get('agendamento')
        .then(response => {
            setAgendamento(response.data.map(agend => (
                {id:agend.idAgend , title: agend.nome, start: agend.dataHoraInicial, end: agend.dataHoraFinal} 
            ))) 
    })
        api.get('socios')
        .then(response => {
            setSocios(response.data);
        })
        
        api.get('eventos')
        .then(response => {
            setEventos(response.data);
        })
    }, [modalIsOpenCad])    

    function modalCadastroAbrir() {
        setModalIsOpenCad(true);
        document.getElementById('calendario').style.visibility = "hidden";
    }

    function modalCadastroFechar() {
        setModalIsOpenCad(false);
        setModalIsOpenEvent(false);
        setIdAgend(null);
        document.getElementById('calendario').style.visibility = "visible";
        setSocioId('');
        setDataHoraInicial('');
        setDataHoraFinal('');
        setObservacao('');
        setValor('');
        setEventoId('');
    }
    useEffect(() => {
        if(idAgend){
            
        }
        
    }, [])
    function modalMostrarEvento(id){
        
        api.get(`agendamento/${id}`)
        .then(response => {
            setSocioId(response.data.socioId);
            setDataHoraInicial(response.data.dataHoraInicial);
            setDataHoraFinal(response.data.dataHoraFinal);
            setObservacao(response.data.observacao);
            setValor(response.data.valor);
            setEventoId(response.data.eventoId);
            setMatricula(response.data.matricula);
            setSocio(response.data.nome);
            setEvento(response.data.evento);
        })
        setModalIsOpenEvent(true);
        document.getElementById('calendario').style.visibility = "hidden";
    }

    async function handleCadastrar(e){
        e.preventDefault();
        var valorFinal = mask.removeMascara(valor);
       if(socioId !== '0' && eventoId !== '0'){
        const data = {
            socioId,
            dataHoraInicial,
            dataHoraFinal,
            observacao,
            valor: valorFinal,
            eventoId
       };
            try {
                await api.post('agendamento', data);
                alert("Agendamento criado com sucesso!");
                document.getElementById('formAgendamento').onSubmit()
                
            }
            catch (err){
                
            }
        }
        modalCadastroFechar()
    }   
    
    async function handlePdf(){
        await api.post('pdf', {matricula, socio, evento, dataHoraInicial, valor});
    }

    return (
        <div id="Agendamento-Container">
    
            <Cabecalho/>
            <Menu/>
            <section>
                <button className="botao" onClick={modalCadastroAbrir}>Novo Evento</button>
                <div id="calendario">
                <FullCalendar 
                    plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
                    initialView="timeGridWeek"
                   // dateClick={handleDateClick}
                    locale={'pt-br'}
                    dayHeaderFormat={{weekday: 'long'}}
                    editable={true}
                    height={1155}  
                    key="calendario"
                    events={agendamento
                        
                        // [
                        // { title: 'Festa Aniversário', start: '2020-09-21T10:00:00', end: '2020-09-21T16:00:00'},
                        // { title: 'Festa Aniversário', start: '2020-09-22T22:00:00', end: '2020-09-23T01:00:00'},
                        // ]
                }
                    eventClick={(info) => {
                        modalMostrarEvento(info.event.id)
                        // setIdAgend(info.event.id)
                        info.el.style.borderColor = 'red';
                    }}
                    
                    
                />
                </div>
                
            </section>
            <Modal 
                    className="boxCadastro" 
                    isOpen={modalIsOpenCad} 
                    onRequestClose={modalCadastroFechar}
                    style={{
                        overlay: {
                          backgroundColor: 'rgba(0, 0, 0, 0.5)'
                        }}}
                    >
                    <h1>Novo Evento</h1>  
                    <form id="formAgendamento" onSubmit={handleCadastrar}>
                        <select onChange={e => setSocioId(e.target.value)}>
                            <option value={'0'}>
                                Selecione o sócio
                            </option>
                            {socios.map(socio => (
                            <option
                                value={socio.idSocio}                                    
                            >
                                {socio.nome}
                            </option>))}
                        </select><br/>
                        <input 
                            type="datetime-local" 
                            id="dataHoraInicial" 
                            value={dataHoraInicial}
                            onChange={e => setDataHoraInicial(e.target.value)}
                            required
                        /><br/>
                        <input 
                            type="datetime-local" 
                            id="dataHoraFinal" 
                            value={dataHoraFinal}
                            onChange={e => setDataHoraFinal(e.target.value)}
                            required
                        /><br/>
                        <textarea 
                            
                            id="observacao" 
                            value={observacao}
                            onChange={e => setObservacao(e.target.value)}
                        /><br/>
                        <input 
                            type="text" 
                            id="valor" 
                            placeholder="Valor"
                            value={valor}
                            onChange={e => setValor(e.target.value)}
                            onKeyUp={() => {setValor(document.forms[0].valor.value = mask.mascaraDinheiro(valor))}}
                            required
                        /><br/>
                        <select onChange={e => setEventoId(e.target.value)}>
                            <option value={'0'}>
                                Selecione o tipo de Evento
                            </option>
                            {eventos.map(evento => (
                            <option
                                value={evento.idEvento}                                    
                            >
                                {evento.evento}
                            </option>))}
                        </select><br/>
                        <button className="submit" type="submit">Salvar</button> 
                    </form>                  
                </Modal>

                <Modal 
                    className="boxConsulta" 
                    isOpen={modalIsOpenEvent} 
                    onRequestClose={modalCadastroFechar}
                    style={{
                        overlay: {
                          backgroundColor: 'rgba(0, 0, 0, 0.5)'
                        }}}
                    >   <h1>Evento</h1>
                        <div id="info">
                            
                            <FiFileText id="pdf" size={20} color=" #5050CA" onClick={handlePdf}/>
                            <FiEdit id="edit" size={20} color=" #5050CA"/>
                            <FiTrash2 id="delete" size={20} color=" #5050CA" />
                            <h2>Matrícula: </h2><h3>{matricula}</h3>
                            <h2>Sócio: </h2><h3>{socio}</h3>
                            <h2>Inicio: </h2><h3>{dataHoraInicial}</h3>
                            <h2>Fim: </h2><h3>{dataHoraFinal}</h3>
                            <h2>Observação: </h2><h3>{observacao}</h3>
                            <h2>Valor: </h2><h3>{mask.mascaraDinheiro(valor*100)}</h3>
                            <h2>Tipo de Evento: </h2><h3>{evento}</h3>

                        </div>
                        
                    </Modal>
            
        </div>
    )
  
}