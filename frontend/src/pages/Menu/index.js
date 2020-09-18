import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

import Cabecalho from '../Cabecalho';

export default function Entrada(){
    return (
        <div className="Menu-container">
            <ul>
                <li id="entrada"><a>Entrada</a></li>
                <li><Link to="teste">Clientes</Link></li>
                <li><a>Instrutores</a></li>
                <li><a>Modalidades</a></li>
            </ul>
        </div>
    );
}