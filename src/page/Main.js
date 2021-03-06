import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../inc/Header.js';
import Home from './Home';
import Collage from './Collage';
import Board from './Board';
import Login from './Login';
import Join from './Join';
import BoardWrite from './BoardWrite';
import BoardView from './BoardView';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 500,
            md: 900,
            lg: 1280,
            xl: 1920,
        },
    },
    palette: {
        primary: {
            light: '#9e9e9e',
            main: '#000',
            dark: '#000',
            contrastText: '#ffc107',
        },
        secondary: {
            light: '#ffe082',
            main: '#ffc107',
            dark: '#ffc107',
            contrastText: '#000',
        },
    },
    typography: {
        h4: {
            fontWeight: 500,
        },
    },
});

function Main() {
    const path = window.location.pathname;
    return (
        <div>
            <ThemeProvider theme={theme}>
                {path !== '/login' && path !== '/join' && <Header />}
                <Container maxWidth="lg">
                    <Route path="/" component={Home} exact />
                    <Route path="/collage" component={Collage} exact />
                    <Route path="/board" component={Board} exact />
                    <Route path="/board/write" component={BoardWrite} />
                    <Route path="/board/view/:data" component={BoardView} />

                    <Route path="/login" component={Login} />
                    <Route path="/join" component={Join} />
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default Main;
