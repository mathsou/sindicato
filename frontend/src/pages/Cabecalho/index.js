import React from 'react';
import './styles.css';

import logoSindigua from '../../assets/logosindigua.png'

export default function Entrada(){
    return (
        <div className="Cabecalho-container">
            <img src={logoSindigua} alt=""/>
            <h1>SINDIGUAÍBA</h1>
        </div>
    );
}