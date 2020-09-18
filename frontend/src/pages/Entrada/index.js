import React from 'react';
import './styles.css';

import Cabecalho from '../Cabecalho';
import Menu from '../Menu';

export default function Entrada(){
    return (
        <div className="Entrada-container">
            <Cabecalho/>
            <Menu/>
            <section>
                <label name="codigo">Código</label>
                <input type="text" name="codigo"></input>
            </section>
        </div>
    );
}