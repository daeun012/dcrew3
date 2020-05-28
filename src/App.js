import React from 'react';
import './App.css';
import { Route, HashRouter } from 'react-router-dom';
import Login from './page/Login';
import Main from './page/Main';

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Route path="/" component={Main} exact />
                <Route path="/login" component={Login} />
            </HashRouter>
        </div>
    );
}

export default App;
