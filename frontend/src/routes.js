import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Entrada from './pages/Entrada';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Entrada}/>
            </Switch>
        </BrowserRouter>
    )
}