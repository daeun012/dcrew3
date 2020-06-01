import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar, Button, Tab, Tabs, Container } from '@material-ui/core';

import { NavLink, Link } from 'react-router-dom';

const MyTabs = withStyles({
    root: {
        flexGrow: 1,
    },
    indicator: {
        backgroundColor: '#ffc107',
    },
})((props) => <Tabs centered {...props} />);

const MyTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        padding: theme.spacing(0, 3, 0),

        color: '#fff',
        opacity: 100,
        fontSize: '15px',
        '&:hover': {
            color: '#ffc107',
            opacity: 1,
        },
        '&$selected': {
            color: '#ffc107',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#ffc107',
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

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
        fontSize: '25px',
    },
    formButton: {
        flexGrow: 1,
        textAlign: 'end',
    },
    loginButton: {
        marginRight: theme.spacing(2),
        opacity: 0.9,
        '&:hover': {
            opacity: 1,
        },
    },
    logoutButton: {
        marginRight: theme.spacing(2),
        opacity: 1,
        '&:hover': {
            opacity: 0.9,
        },
    },
});

class Header extends Component {
    state = {
        id: '',
        password: '',
        login: false,
        value: 0,
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

    _changeTab = (e, n_value) => {
        this.setState({ value: n_value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Container maxWidth="lg">
                        <Toolbar>
                            <Typography variant="h6" component={Link} to={'/'} className={classes.title}>
                                Dcrew
                            </Typography>

                            <MyTabs value={this.state.value} onChange={this._changeTab}>
                                <MyTab label="홈" value={0} component={NavLink} exact to={'/'} />
                                <MyTab label="대학교" value={1} component={NavLink} to={'/collage'} />
                                <MyTab value={2} label="카테고리" component={NavLink} to={'/category'} />
                                <MyTab value={3} label="동아리연합" component={NavLink} to={'/band'} />

                                <MyTab value={4} label="모두의 게시판" component={NavLink} to={'/board'} />
                            </MyTabs>
                            <div className={classes.formButton}>
                                {this.state.login ? (
                                    <Button
                                        className={classes.logoutButton}
                                        component={Link}
                                        to={'/'}
                                        color="inherit"
                                        onClick={() => this._logout()}
                                    >
                                        로그아웃
                                    </Button>
                                ) : (
                                    <div>
                                        <Button className={classes.loginButton} component={Link} to={'/login'} color="inherit">
                                            로그인
                                        </Button>
                                        <Button component={Link} to={'/join'} color="secondary" variant="outlined">
                                            회원가입
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Header);
