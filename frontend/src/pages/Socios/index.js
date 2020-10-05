import React, {useState, useEffect} from 'react';
import './styles.css';
import {FiSearch, FiPlus, FiEdit, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';
import Cabecalho from '../Cabecalho';
import Menu from '../Menu';

export default function Socios(){
    localStorage.setItem('pag', '2');
    const [mostrar, setMostrar] = useState(true);
    const [atualiza, setAtualiza] = useState(true);

    const [socios, setSocios] = useState([]);
    
    const [idSocio, setIdSocio] = useState(false);
    const [matricula, setMatricula] = useState();
    const [socioN, setSocioN] = useState();
    const [nome, setNome] = useState();
    const [dtNascimento, setDtNascimento] = useState();
    const [email, setEmail] = useState();
    const [cidade, setCidade] = useState();
    const [cep, setCep] = useState();
    const [celular, setCelular] = useState();
    const [telComercial, setTelComercial] = useState();
    const [telResidencial, setTelResidencial] = useState();
    const [localTrab, setLocalTrab] = useState();
    const [sexo, setSexo] = useState();

    useEffect(() => {
        api.get('socios')
            .then(response => {
                if(response.data.length){
                    setSocios(response.data);
                }
                else{
                    setSocios([response.data]);
                }
        })
    }, [atualiza])

    function info(id){
        if(mostrar){
            document.getElementById(`socio1${id}`).style.display = "block";
            document.getElementById(`dadossocio1${id}`).style.display = "block";
            document.getElementById(`socio2${id}`).style.display = "block";
            document.getElementById(`dadossocio2${id}`).style.display = "block";
        }
        else {
            document.getElementById(`socio1${id}`).style.display = "none";
            document.getElementById(`dadossocio1${id}`).style.display = "none";
            document.getElementById(`socio2${id}`).style.display = "none";
            document.getElementById(`dadossocio2${id}`).style.display = "none";
        }
        setMostrar(!mostrar)
    }
    async function handleCadastrar(e){
        e.preventDefault();
        console.log(socioN, sexo);
        const dados = {
            idSocio,
            matricula,
            socion: socioN,
            nome,
            dtNascimento,
            email,
            cidade,
            cep,
            celular,
            telComercial,
            telResidencial,
            localTrab,
            sexo
        };
        if(socioN !== '0' && sexo !== '0'){
            console.log(idSocio);
            if(idSocio){
                console.log("teste")
                await api.put('socios', dados);
                setAtualiza(!atualiza);
                limpar()
                alert("Dados do sócio alterado com sucesso!");
            }
            else{
                try {
                    await api.post('socios', dados);
                    setAtualiza(!atualiza);
                    limpar()
                    alert("Socio cadastrado com sucesso!");
                        
                }
                catch (err){
                    alert("ERRO")
                }

            }
       }
    } 

    function handleDelete(id, nome){
        console.log(id);
        var confirmar = window.confirm(`Deseja deletar o sócio ${nome}?`)
        console.log(confirmar)
        if(confirmar){
            api.delete(`socios/${id}`);
            setSocios(socios.filter(soc => soc.idSocio !== id))
        } 
        else{
            return 0
        }        
    }

    function handleEdit(id){
        api.get(`socios/${id}`).then(response => {
                setIdSocio(response.data.idSocio);
                setMatricula(response.data.matricula);
                setSocioN(response.data.socion);
                setNome(response.data.nome);
                setDtNascimento(response.data.dtNascimento);
                setEmail(response.data.email);
                setCidade(response.data.cidade);
                setCep(response.data.cep);
                setCelular(response.data.celular);
                setTelComercial(response.data.telComercial);
                setTelResidencial(response.data.telResidencial);
                setLocalTrab(response.data.localTrab);
                setSexo(response.data.sexo);
        })
    }

    function limpar(){
        setIdSocio(false);
        setMatricula('');
        setSocioN('0');
        setNome('');
        setDtNascimento('');
        setEmail('');
        setCidade('');
        setCep('');
        setCelular('');
        setTelComercial('');
        setTelResidencial('');
        setLocalTrab('');
        setSexo('0');
    }

    return (
        <div className="Socio-container">
            <Cabecalho/>
            <Menu/>
            <section>
                <form className="formSocio" onSubmit={handleCadastrar}>
                    <label htmlFor="matricula">Matrícula</label>
                    <input 
                        type="text" 
                        name="matricula"
                        id="matricula" 
                        value={matricula}
                        onChange={e => setMatricula(e.target.value)}
                        required
                    />
                    <label htmlFor="socioN">É sócio?</label>
                    <select 
                        className="select"
                        id="socioN"
                        name="socioN"
                        value={socioN}
                        onChange={e => setSocioN(e.target.value)}
                    >
                        <option value={'0'}>
                        </option>
                        <option value={'S'} id="selectSim">
                            Sim
                        </option>
                        <option value={'N'} id="selectNão">
                            Não
                        </option>
                    </select>
                    <label htmlFor="nome">Nome Completo</label>
                    <input 
                        type="text" 
                        id="nome" 
                        name="nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        required
                    />
                    <label htmlFor="dtNascimento">Nascimento</label>
                    <input 
                        type="date" 
                        id="dtNascimento" 
                        name="dtNascimento" 
                        value={dtNascimento}
                        onChange={e => setDtNascimento(e.target.value)}
                    />
                    <label htmlFor="email">E-mail</label>
                    <input 
                        type="email" 
                        id="email" 
                        email="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="cidade">Cidade</label>
                    <input 
                        type="text" 
                        id="cidade"
                        name="cidade"
                        value={cidade}
                        onChange={e => setCidade(e.target.value)}
                    />
                    <label htmlFor="cep">CEP</label>
                    <input 
                        type="text" 
                        id="cep" 
                        name="cep" 
                        value={cep}
                        onChange={e => setCep(e.target.value)}
                    />
                    <label htmlFor="celular">Celular</label>
                    <input 
                        type="text" 
                        id="celular" 
                        name="celular" 
                        value={celular}
                        onChange={e => setCelular(e.target.value)}
                    />
                    <label htmlFor="telComercial">Telefone Comercial</label>
                    <input 
                        type="text" 
                        id="telComercial" 
                        value={telComercial}
                        onChange={e => setTelComercial(e.target.value)}
                    />
                    <label htmlFor="telResidencial">Telefone Residencial</label>
                    <input 
                        type="text" 
                        id="telResidencial" 
                        name="telResidencial" 
                        value={telResidencial}
                        onChange={e => setTelResidencial(e.target.value)}
                    />
                    <label htmlFor="localTrab">Local de Trabalho</label>
                    <input 
                        type="text" 
                        id="localTrab" 
                        name="localTrab" 
                        value={localTrab}
                        onChange={e => setLocalTrab(e.target.value)}
                    />
                    <label htmlFor="sexo">Sexo</label>
                     <select 
                        className="select"
                        id="sexo"
                        name="sexo"
                        value={sexo}
                        onChange={e => setSexo(e.target.value)}
                    >
                        <option value={'0'}>
                        </option>
                        <option value={'M'}>
                            Masculino
                        </option>
                        <option value={'F'}>
                            Feminino
                        </option>
                    </select>
                    <p id="limpar" onClick={limpar}>Limpar</p>
                    <button className="submit" type="submit">Salvar</button>
                </form>  
                <div className="listagemSocios">
                    <div id="pesquisa">
                        <input
                            id="pesquisar"
                            placeholder="Pesquise por nome ou matrícula"
                        >
                        </input>
                        <FiSearch id="pesquisa" size={20} color=" #505050"/>
                    </div>
                    <div  id="tabela">
                    {socios[1] ? <table>
                            <thead  id="cabecalho">
                                <tr>
                                    <td></td>
                                    <td>Matrícula</td>
                                    <td>Sócio</td>
                                </tr>
                            </thead>
                        </table> : ''
                    }
                            {socios[1] ? socios.map(soc => (
                                <div className="tabInfo" key={soc.idSocio}>
                                    <table>
                                        <tbody className="corpo1">
                                            <tr className="socio">
                                                <td><FiPlus  size={16} color="#5050CA" onClick={() => info(soc.idSocio)}/></td>
                                                <td>{soc.matricula}</td>
                                                <td>{soc.nome}</td>
                                                <td><FiEdit id="edit" size={18} color=" #5050CA" onClick={() => handleEdit(soc.idSocio)}/></td>
                                                <td><FiTrash2 id="delete" size={18} color=" #5050CA" onClick={() => handleDelete(soc.idSocio, soc.nome)} /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table>
                                        <tbody className="corpo2">
                                            
                                            <tr 
                                                className="dadosSocio"
                                                id={`socio1${soc.idSocio}`}
                                                style={{display: "none"}}
                                            >
                                                <td className="dadosocio">Sócio</td>
                                                <td className="dadonascimento">Nascimento</td>
                                                <td className="dadoemail">e-mail</td>
                                                <td className="dadocidade">cidade</td>
                                                <td className="dadocep">cep</td>   
                                            </tr>
                                            <tr 
                                                className="dado"
                                                id={`dadossocio1${soc.idSocio}`} 
                                                style={{display: "none"}}
                                            >
                                                <td className="dadosocio">{soc.socion==='S' ? "Sim" : "Não"}</td>
                                                <td className="dadonascimento">{Intl.DateTimeFormat('pt-BR').format(Date.parse(soc.dtNascimento))}</td>
                                                <td className="dadoemail">{soc.email}</td>
                                                <td className="dadocidade">{soc.cidade}</td>
                                                <td className="dadocep">{soc.cep}</td>
                                            </tr>
                                            <tr 
                                                className="dadosSocio"
                                                id={`socio2${soc.idSocio}`}   
                                                style={{display: "none"}}                                
                                            >
                                                <td className="dadosexo">sexo</td>
                                                <td className="dadocelular">celular</td>
                                                <td className="dadotelcomercial">tel. comercial</td>
                                                <td className="dadotelresidencial">tel. residencial</td>
                                                <td className="dadolocaltrab">local de trabalho</td>     
                                            </tr>     
                                            <tr 
                                                className="dado"
                                                id={`dadossocio2${soc.idSocio}`} 
                                                style={{display: "none"}}
                                            >
                                                <td className="dadosexo">{soc.sexo==='M' ? "Masculino" : "Feminino"}</td>
                                                <td className="dadocelular">{soc.celular}</td>
                                                <td className="dadotelcomercial">{soc.telComercial}</td>
                                                <td className="dadotelresidencial">{soc.telResidencial}</td>
                                                <td className="dadolocaltrab">{soc.localTrab}</td>
                                            </tr>   
                                            <tr><td><br/></td></tr>        
                                        </tbody>
                                    </table>
                                </div>
                            )) : ''
                        }
                    </div>
                </div>         
            </section>
        </div>
    );
}