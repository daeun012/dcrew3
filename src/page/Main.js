import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Header from '../inc/Header.js';
import Home from './Home';

function Main() {
    return (
        <div>
            <Header />
            <Route path="/" component={Home} exact />
        </div>
    );
}

export default Main;
