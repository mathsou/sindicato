import React from 'react';
import './styles.css';

import Cabecalho from '../Cabecalho';
import Menu from '../Menu';

export default function Socios(){
    localStorage.setItem('pag',2);
    return (
        <div className="Socio-container">
            <Cabecalho/>
            <Menu/>
            <section>
                
            </section>
        </div>
    );
}