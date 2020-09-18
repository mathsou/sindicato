import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

import Cabecalho from '../Cabecalho';

export default function Entrada(){
    return (
        <div className="Menu-container">
            <ul>
                <li id="entrada"><Link>Entrada</Link></li>
                <li><Link to="Socios">Socios</Link></li>
                <li><Link>Agendamentos</Link></li>
                <li><Link></Link></li>
            </ul>
        </div>
    );
}