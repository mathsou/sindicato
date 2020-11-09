import React, {useEffect, useState} from 'react';
import {FiFileText, FiEdit, FiTrash2, FiX} from 'react-icons/fi';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';

import './styles.css';

import api from '../../services/api';
import mask from '../../functions/mascaraDinheiro';
import Cabecalho from '../Cabecalho';
import Rodape from '../Rodape';
import Menu from '../Menu';

Modal.setAppElement('#root');

export default function Agendamento () {
    localStorage.setItem('pag', '3');
    
    const [carregando, setCarregando] = useState(false);
    const [modalIsOpenCad, setModalIsOpenCad] = useState(false);
    const [modalIsOpenEvent, setModalIsOpenEvent] = useState(false);
    // const [salvar, setSalvar] = useState(false);

    const [agendamento, setAgendamento] = useState([]);
    const [socios, setSocios] = useState([]);
    const [eventos, setEventos] = useState([]);

    const[idAgend, setIdAgend] = useState(false);
    const[socioId, setSocioId] = useState('0');
    const[data, setData] = useState();
    const[salao, setSalao] = useState('0');
    const[observacao, setObservacao] = useState();
    const[valorTotal, setValorTotal] = useState();
    const[valorSinal, setValorSinal] = useState();
    const[valorRestante, setValorRestante] = useState();
    const[eventoId, setEventoId] = useState('0');
    
    const [matricula, setMatricula] = useState();
    const [socio, setSocio] = useState();
    const [evento, setEvento] = useState();



    useEffect(() => {
        api.get('agendamento')
        .then(response => {
            setAgendamento(response.data.map(agend => (
                agend.salao===1 ? {id:agend.idAgend , title: agend.nome, date: agend.data, color: 'blue', salao: agend.salao} : agend.salao===2 ? {id:agend.idAgend , title: agend.nome, date: agend.data, color: 'green', salao: agend.salao} : {id:agend.idAgend , title: agend.nome, date: agend.data, color: 'red', salao: agend.salao}
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
    }, [])   
    
    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }

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
                // setSalvar(false)
            }
            else {
                document.getElementById("diaN").style.display = 'none';
                // setSalvar(true)
            }
        }
        else{
            // setSalvar(false)
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
        setIdAgend('');
        setSocioId('0');
        setData('');
        setSalao('');
        setObservacao('');
        setValorTotal('');
        setValorSinal('');
        setValorRestante('');
        setEventoId('0');
    }
    async function modalMostrarEvento(id){
        setCarregando(true);
        await api.get(`agendamento/${id}`)
        .then(response => {
            setIdAgend(response.data.idAgend);
            setSocioId(response.data.socioId);
            setData(response.data.data);
            setSalao(response.data.salao);
            setObservacao(response.data.observacao==null ? '' : response.data.observacao);
            setValorTotal(mask.mascaraDinheiro(response.data.valorTotal*100));
            setValorSinal(mask.mascaraDinheiro(response.data.valorSinal*100));
            setValorRestante(mask.mascaraDinheiro(response.data.valorRestante*100));
            setEventoId(response.data.eventoId);
            setMatricula(response.data.matricula);
            setSocio(response.data.nome);
            setEvento(response.data.evento);
        })
        setCarregando(false);
        setModalIsOpenEvent(true);
        document.getElementById('calendario').style.visibility = "hidden";
        
    }

    async function handleCadastrar(e){
        e.preventDefault();
        var valorFinal = mask.removeMascara(valorTotal);
        var valorS = mask.removeMascara(valorSinal);
        var valorR = mask.removeMascara(valorRestante);
        
        const dados = {
            idAgend,
            socioId,
            data,
            salao,
            observacao,
            valorTotal: valorFinal,
            valorSinal: valorS,
            valorRestante: valorR,
            eventoId
       };

        if(socioId !== '0' && eventoId !== '0'){
            if(idAgend){
                await api.put('agendamento', dados);
                alert("Agendamento alterado com sucesso!");
                modalCadastroFechar();

            }
            else{     
                await api.post('agendamento', dados);
                alert("Agendamento criado com sucesso!");
                setAgendamento(agendamento)
                modalCadastroFechar();
                
            }
            api.get('agendamento')
            .then(response => {
            setAgendamento(response.data.map(agend => (
                agend.salao===1 ? {id:agend.idAgend , title: agend.nome, date: agend.data, color: 'blue', salao: agend.salao} : agend.salao===2 ? {id:agend.idAgend , title: agend.nome, date: agend.data, color: 'green', salao: agend.salao} : {id:agend.idAgend , title: agend.nome, date: agend.data, color: 'red', salao: agend.salao}
            )))})
        }
        else{
            alert("Preencha todos os campos obrigatórios(Marcos com *)!!");
        }
    }   

    async function handleDelete(id){
        var confirmar = window.confirm("Deseja deletar esse agendamento?")
        if(confirmar){
            api.delete(`agendamento/${id}`);
            setAgendamento(agendamento.filter(agend => agend.id !== id))
            modalCadastroFechar()
        } 
        else{
            return 0
        }    
    }

    async function handlePdf(){
        setCarregando(true);
        await api.post('pdf', {matricula, socio, evento, data, valorTotal, valorSinal, valorRestante});
        sleep(3000);
        setCarregando(false);    
    }

    function handleEdit(id){
        console.log(socioId);
        setModalIsOpenEvent(false);
        setModalIsOpenCad(true);
    }

    return (
        <div className="Agendamento-Container">
    
            <Cabecalho/>
            <Menu/>
            <section>
                <div id="calendario">
                    <div id="legenda">
                        <h1 id="tituloLegenda">Legenda: </h1>
                        <h2 className="intemLegenda" style={{backgroundColor: 'blue'}}>Salão Grande</h2>
                        <h2 className="intemLegenda" style={{backgroundColor: 'green'}}>Salão Pequeno</h2>
                        <h2 className="intemLegenda" style={{backgroundColor: 'red'}}>Ambos os salões</h2>
                    </div>
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
                        modalMostrarEvento(info.event.id);
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
                    <FiX  id="fecharCad" size={35} color="red" onClick={modalCadastroFechar}/> 
                    <form id="formAgendamento" onSubmit={handleCadastrar}>
                        <input 
                                type="date" 
                                id="data" 
                                value={data}
                                onChange={e => setData(e.target.value)}
                                onBlur={validaEvento}
                                disabled
                                required
                            />
                        
                        <select onChange={e => setSocioId(e.target.value)} value={socioId}>
                            <option value={'0'}>
                                Selecione o sócio *
                            </option>
                            {socios.map(socio => (
                            <option
                                key={socio.idSocio}
                                value={socio.idSocio}                                    
                            >
                                {socio.nome}
                            </option>))}
                        </select>
                        <select 
                            id="selectSalao"
                            onChange={e => setSalao(e.target.value)}
                            value={salao}
                            onClick={validaEvento}
                        >
                            <option value={'0'}>
                                Selecione o salão *
                            </option>
                            <option value={'1'}>
                                Salão Grande
                            </option>
                            <option value={'2'}>
                                Salão Pequeno
                            </option>
                            <option value={'3'}>
                                Ambos os salões
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
                            placeholder="Valor Total *"
                            value={valorTotal}
                            onChange={e => setValorTotal(e.target.value)}
                            onKeyUp={() => {setValorTotal(document.forms[0].valorTotal.value = mask.mascaraDinheiro(valorTotal))}}
                            required
                        />
                        <input 
                            type="text" 
                            id="valorSinal" 
                            placeholder="Valor do Sinal *"
                            value={valorSinal}
                            onChange={e => setValorSinal(e.target.value)}
                            onKeyUp={() => {setValorSinal(document.forms[0].valorTotal.value = mask.mascaraDinheiro(valorSinal))}}
                            required
                        />
                        <input 
                            type="text" 
                            id="valorRestante" 
                            placeholder="Valor Restante *"
                            value={valorRestante}
                            onChange={e => setValorRestante(e.target.value)}
                            onKeyUp={() => {setValorRestante(document.forms[0].valorTotal.value = mask.mascaraDinheiro(valorRestante))}}
                            required
                        />
                        <select onChange={e => setEventoId(e.target.value)} value={eventoId}>
                            <option value={'0'}>
                                Selecione o tipo de Evento *
                            </option>
                            {eventos.map(evento => (
                            <option
                                key={evento.idEvento}
                                value={evento.idEvento}                                    
                            >
                                {evento.evento}
                            </option>))}
                        </select>
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
                        <FiX  id="fecharCon" size={35} color="red" onClick={modalCadastroFechar}/>
                        <div id="info">
                            <FiFileText id="pdf" size={20} color=" #5050CA" onClick={handlePdf}/>
                            <FiEdit id="edit" size={20} color=" #5050CA" onClick={() => handleEdit(idAgend)} />
                            <FiTrash2 id="delete" size={20} color=" #5050CA" onClick={() => handleDelete(idAgend)}/>
                            <h2>Matrícula: </h2><h3>{matricula}</h3>
                            <h2>Sócio: </h2><h3>{socio}</h3>
                            <h2>Salão: </h2><h3>{salao===1 ? "Salão Grande" : salao===2 ? "Salão Pequeno" : "Ambos os salões"}</h3>
                            <h2>Data: </h2><h3>{String(data).slice(8, 10) + "/" + String(data).slice(5, 7) + "/" + String(data).slice(0, 4)}</h3>
                            <h2>Observação: </h2><h3>{observacao}</h3>
                            <h2>Valor Total: </h2><h3>{valorTotal}</h3>
                            <h2>Valor Sinal: </h2><h3>{valorSinal}</h3>
                            <h2>Valor Restante: </h2><h3>{valorRestante}</h3>
                            <h2>Tipo de Evento: </h2><h3>{evento}</h3>

                        </div>
                        
                    </Modal>
                    <Modal
                         className="boxConsulta" 
                         isOpen={carregando} 
                         style={{
                             overlay: {
                               backgroundColor: 'rgba(0, 0, 0, 0.5)',
                             },
                             content: {
                                backgroundColor: 'rgba(0,0,0,0)',
                                color: 'white',
                                position: 'absolute',
                                top: '50%'
                             }
                            
                            }}
                    >
                        <h1>CARREGANDO...</h1>
                    </Modal>
                    <Rodape/>
        </div>
    )
  
}