import React from 'react';
import './styles.css';

import Cabecalho from '../Cabecalho';
import Menu from '../Menu';

export default function Entrada(){
    localStorage.setItem('pag', '1');
    return (
        <div className="Entrada-container">
            <Cabecalho/>
            <Menu/>
            <section>
                
            </section>
        </div>
    );
}