import React from 'react';
import {useHistory} from 'react-router-dom';
import './styles.css';

import Cabecalho from '../Cabecalho';
import Menu from '../Menu';

export default function Entrada(){
    localStorage.setItem('pag', '1');
    const history = useHistory();

    return (
        <div className="Entrada-container">
            <Cabecalho/>
            <Menu/>
            <section>
                {history.push('/socios')}
            </section>
        </div>
    );
}