import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Entrada from './pages/Entrada';
import Socios from './pages/Socios';
import Agendamento from './pages/Agendamento';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Entrada}/>
                <Route path="/socios" exact component={Socios}/>
                <Route path="/agendamento" exact component={Agendamento}/>
            </Switch>
        </BrowserRouter>
    )
}