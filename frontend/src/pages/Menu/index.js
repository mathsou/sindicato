import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

export default function Menu(){
    const pag = localStorage.getItem('pag')
    
    useEffect(() => {
        document.getElementById("entrada").style.background = "#222222"
        document.getElementById("socios").style.background = "#222222"
        document.getElementById("agendamento").style.background = "#222222"

        if(pag == 1){
            document.getElementById("entrada").style.background = "#d6d4d4"
        }
        else if (pag == 2){
            document.getElementById("socios").style.background = "#d6d4d4"
        }
        else if (pag == 3){
            document.getElementById("agendamento").style.background = "#d6d4d4"
        }
    }, [pag])
    
    return (
        <div className="Menu-container">
            <ul id="menu-principal">
                <li id="entrada"><Link to="/">Entrada</Link></li>
                <li id="socios">
                    <Link>Socios</Link>
                    <ul className="sub-menu">
                        <li><Link to="socios">Consultar</Link></li>
                        <li><Link>Novo</Link></li>
                    </ul>
                </li>
                <li id="agendamento">
                    <Link to="agendamento">Agendamentos</Link>
                    <ul>
                        <li><Link>teste1</Link></li>
                        <li><Link>teste2</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}