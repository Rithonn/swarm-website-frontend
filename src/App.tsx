import React from 'react';
import {Switch, Route} from "react-router";

import LogIn from './components/LogIn/LogIn';
import Wiki from './components/Wiki/Wiki';
import Error from './components/Error/Error';

function  App(){
    return(
        <main>
            <Switch>
                <Route path='/' component={LogIn} exact/>
                <Route path='/wiki' component={Wiki} />
                <Route component={Error} />
            </Switch>
        </main>
    )
 }

 export default App