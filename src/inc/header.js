import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textDecoration: 'none',
        color: 'white',
    },
});

class Header extends Component {
    state = {
        id: '',
        password: '',
        login: false,
    };

    componentDidMount() {
        if (sessionStorage.login) {
            this.setState({ login: true });
        }
    }

    _logout = function () {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            sessionStorage.removeItem('login');
            this.setState({ login: false });
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" component={Link} to={'/'} className={classes.title}>
                            Dcrew
                        </Typography>

                        {this.state.login ? (
                            <Button component={Link} to={'/'} color="inherit" onClick={() => this._logout()}>
                                로그아웃
                            </Button>
                        ) : (
                            <Button component={Link} to={'/login'} color="inherit">
                                로그인
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Header);
