import React, { Component } from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import {
    AppBar,
    Typography,
    Toolbar,
    Button,
    IconButton,
    Container,
    List,
    ListItem,
    ListItemText,
    Hidden,
    Drawer,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, Link } from 'react-router-dom';
const drawerWidth = 240;

const styles = (theme) => ({
    root: {},

    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        textDecoration: 'none',
        color: 'white',
        fontSize: '25px',
        marginRight: theme.spacing(2),
    },
    formButton: {
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
    nav: {
        flexGrow: '1',
        display: 'flex',
        justifyContent: 'center',
    },
    list: {
        fontSize: '14px',
        paddingLeft: '0',
        listStyle: 'none',
        paddingTop: '0',
        paddingBottom: '0',
        color: '#fff',

        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    listItem: {
        float: 'left',
        color: 'inherit',
        position: 'relative',
        display: 'block',
        width: 'auto',
        margin: '',
        padding: '0',
        '>&:focus': {
            borderBottom: 'solid 2px #ffc107 ',
        },
    },
    navLink: {
        color: 'inherit',
        position: 'relative',
        padding: '0.9375rem',
        fontWeight: '400',
        fontSize: '15px',
        textTransform: 'uppercase',
        borderRadius: '3px',
        lineHeight: '20px',
        textDecoration: 'none',
        margin: theme.spacing(0, 2, 0, 2),
        display: 'inline-flex',
        '&:hover,&:focus': {
            color: '#ffc107',
            background: 'rgba(200, 200, 200, 0.2)',
        },
        [theme.breakpoints.down('lg')]: {
            margin: theme.spacing(0, 1, 0, 1),
            [theme.breakpoints.down('md')]: {
                margin: theme.spacing(0, 0.5, 0, 0.5),
            },
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'inline',
        },
    },
});

class Header extends Component {
    state = {
        id: '',
        password: '',
        login: false,
        value: 0,
        mobileOpen: false,
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

    _handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar className={classes.appbar} position="static">
                    <Container maxWidth="lg">
                        <Toolbar className={classes.appbar}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={this._handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component={Link} to={'/'} className={classes.title}>
                                Dcrew
                            </Typography>

                            <div className={classes.nav}>
                                <List className={classes.list}>
                                    <ListItem className={classes.listItem}>
                                        <Button component={Link} exact="true" to={'/'} className={classes.navLink}>
                                            홈
                                        </Button>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <Button component={Link} to={'/collage'} className={classes.navLink}>
                                            대학교
                                        </Button>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <Button component={Link} to={'/category'} className={classes.navLink}>
                                            카테고리
                                        </Button>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <Button component={Link} to={'/band'} className={classes.navLink}>
                                            동아리 연합
                                        </Button>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <Button component={Link} to={'/board'} className={classes.navLink}>
                                            모두의 게시판
                                        </Button>
                                    </ListItem>
                                </List>
                            </div>
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
                <nav className={classes.drawer} aria-label="mailbox folders">
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={this.state.mobileOpen}
                        onClose={this._handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <div className={classes.toolbar} />
                        <List>
                            {['홈', '대학교', '카테고리', '동아리 연합', '모두의 게시판'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </nav>
            </div>
        );
    }
}

export default withStyles(styles)(Header);
