import React, {useEffect} from 'react';
import {useState} from 'react';
import {FiFileText, FiEdit, FiTrash2} from 'react-icons/fi';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';

import './styles.css';

import api from '../../services/api';
import mask from '../../functions/mascaraDinheiro';
import Cabecalho from '../Cabecalho';
import Menu from '../Menu';

Modal.setAppElement('#root');

export default function Agendamento () {
    localStorage.setItem('pag', '3');
    
    const [modalIsOpenCad, setModalIsOpenCad] = useState(false);
    const [modalIsOpenEvent, setModalIsOpenEvent] = useState(false);
    const [salvar, setSalvar] = useState(false);

    const [agendamento, setAgendamento] = useState([]);
    const [socios, setSocios] = useState([]);
    const [eventos, setEventos] = useState([]);

    //const [idAgend, setIdAgend] = useState();
    const[socioId, setSocioId] = useState();
    const[data, setData] = useState();
    const[salao, setSalao] = useState();
    const[observacao, setObservacao] = useState();
    const[valorTotal, setValorTotal] = useState();
    const[valorSinal, setValorSinal] = useState();
    const[valorRestante, setValorRestante] = useState();
    const[eventoId, setEventoId] = useState();
    const [matricula, setMatricula] = useState();
    const [socio, setSocio] = useState();
    const [evento, setEvento] = useState();



    useEffect(() => {
        api.get('agendamento')
        .then(response => {
            setAgendamento(response.data.map(agend => (
                agend.salao===1 ? {id:agend.idAgend , title: agend.nome, date: agend.data, color: 'blue', salao: agend.salao} : {id:agend.idAgend , title: agend.nome, date: agend.data, color: 'green', salao: agend.salao}
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

    function validaEvento(){
        var agendado=false
        if (data){
            agendamento.map(agend => {
                data===agend.date ? agendado=agend.salao : console.log('false')
                return 0
            })
        }
        console.log(agendado)
        if(agendado){
            if (agendado===salao) {
                document.getElementById("diaN").style.display = 'block';
                setSalvar(false)
            }
            else {
                document.getElementById("diaN").style.display = 'none';
                setSalvar(true)
            }
        }
        else{
            setSalvar(false)
        }
    }

    function modalCadastroAbrir(data) {

        setData(data)

        setModalIsOpenCad(true);
        document.getElementById('calendario').style.visibility = "hidden";
    }

    function modalCadastroFechar() {
        setModalIsOpenCad(false);
        setModalIsOpenEvent(false);
        document.getElementById('calendario').style.visibility = "visible";
        setSocioId('');
        setData('');
        setSalao('');
        setObservacao('');
        setValorTotal('');
        setValorSinal('');
        setValorRestante('');
        setEventoId('');
    }
    function modalMostrarEvento(id){
        
        api.get(`agendamento/${id}`)
        .then(response => {
            setSocioId(response.data.socioId);
            setData(response.data.data);
            setSalao(response.data.salao);
            setObservacao(response.data.observacao);
            setValorTotal(response.data.valorTotal);
            setValorSinal(response.data.valorSinal);
            setValorRestante(response.data.valorRestante);
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
        var valorFinal = mask.removeMascara(valorTotal);
        var valorS = mask.removeMascara(valorSinal);
        var valorR = mask.removeMascara(valorRestante);
       if(socioId !== '0' && eventoId !== '0' && salvar){
        const dados = {
            socioId,
            data,
            salao,
            observacao,
            valorTotal: valorFinal,
            valorSinal: valorS,
            valorRestante: valorR,
            eventoId
       };
            try {
                await api.post('agendamento', dados);
                alert("Agendamento criado com sucesso!");
                document.getElementById('formAgendamento').onSubmit()
                
            }
            catch (err){
                
            }
        }
        modalCadastroFechar()
    }   
    
    async function handlePdf(){
        await api.post('pdf', {matricula, socio, evento, data, valorTotal, valorSinal, valorRestante});
    }

    return (
        <div className="Agendamento-Container">
    
            <Cabecalho/>
            <Menu/>
            <section>
                <div id="calendario">
                <FullCalendar 
                    plugins={[ dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale={'pt-br'}
                    dayHeaderFormat={{weekday: 'long'}}
                    editable={true}
                    key="calendario"
                    events={agendamento}
                    dateClick={(info) => {
                        modalCadastroAbrir(info.dateStr)
                    }}
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
                                key={socio.idSocio}
                                value={socio.idSocio}                                    
                            >
                                {socio.nome}
                            </option>))}
                        </select>
                        <input 
                            type="date" 
                            id="data" 
                            value={data}
                            onChange={e => setData(e.target.value)}
                            onBlur={validaEvento}
                            required
                        />
                        <select 
                            onChange={e => setSalao(e.target.value)}
                            onClick={validaEvento}
                        >
                            <option value={'0'}>
                                Selecione o salão
                            </option>
                            <option value={'1'}>
                                Salão Grande
                            </option>
                            <option value={'2'}>
                                Salão Pequeno
                            </option>
                        </select>
                        <p id="diaN" style={{display: 'none'}}>Dia indisponível</p>
                        <textarea 
                            id="observacao" 
                            placeholder="Observação"
                            value={observacao}
                            onChange={e => setObservacao(e.target.value)}
                        />
                        <input 
                            type="text" 
                            id="valorTotal" 
                            placeholder="Valor Total"
                            value={valorTotal}
                            onChange={e => setValorTotal(e.target.value)}
                            onKeyUp={() => {setValorTotal(document.forms[0].valorTotal.value = mask.mascaraDinheiro(valorTotal))}}
                            required
                        />
                        <input 
                            type="text" 
                            id="valorSinal" 
                            placeholder="Valor do Sinal"
                            value={valorSinal}
                            onChange={e => setValorSinal(e.target.value)}
                            onKeyUp={() => {setValorSinal(document.forms[0].valorTotal.value = mask.mascaraDinheiro(valorSinal))}}
                            required
                        />
                        <input 
                            type="text" 
                            id="valorRestante" 
                            placeholder="Valor Restante"
                            value={valorRestante}
                            onChange={e => setValorRestante(e.target.value)}
                            onKeyUp={() => {setValorRestante(document.forms[0].valorTotal.value = mask.mascaraDinheiro(valorRestante))}}
                            required
                        />
                        <select onChange={e => setEventoId(e.target.value)}>
                            <option value={'0'}>
                                Selecione o tipo de Evento
                            </option>
                            {eventos.map(evento => (
                            <option
                                key={evento.idEvento}
                                value={evento.idEvento}                                    
                            >
                                {evento.evento}
                            </option>))}
                        </select>
                        <input
                        id="festaGrande"
                        type="checkbox"
                        />
                        <label>Festa Grande</label>
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
                            <h2>Inicio: </h2><h3>{data}</h3>
                            <h2>Observação: </h2><h3>{observacao}</h3>
                            <h2>Valor Total: </h2><h3>{mask.mascaraDinheiro(valorTotal*100)}</h3>
                            <h2>Valor Sinal: </h2><h3>{mask.mascaraDinheiro(valorSinal*100)}</h3>
                            <h2>Valor Restante: </h2><h3>{mask.mascaraDinheiro(valorRestante*100)}</h3>
                            <h2>Tipo de Evento: </h2><h3>{evento}</h3>

                        </div>
                        
                    </Modal>
            
        </div>
    )
  
}