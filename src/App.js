import React from 'react';
import './App.css';
import { Route, HashRouter, Switch } from 'react-router-dom';

import Login from './page/Login';
import Join from './page/Join';

import Main from './page/Main';

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Route path="/" component={Main} />
            </HashRouter>
        </div>
    );
}

export default App;
