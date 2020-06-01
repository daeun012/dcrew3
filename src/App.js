import React from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import Main from './page/Main';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route path="/" component={Main} />
            </BrowserRouter>
        </div>
    );
}

export default App;
