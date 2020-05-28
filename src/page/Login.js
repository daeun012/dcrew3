import React, { Component } from 'react';
import { TextField, Button, Container, Typography, Grid, Box, Link } from '@material-ui/core';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';

const styles = (theme) => ({
    frame: {
        marginTop: theme.spacing(15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    findinfo: {
        padding: theme.spacing(3, 0, 0),
        borderTopColor: '#e4e4e5',
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
    },
    bar: {
        margin: theme.spacing(0, 2, 0),
        display: 'inline-block',
        height: '13px',
        color: '#e4e4e5',
    },
    submit: {
        margin: theme.spacing(3, 0, 4),
        fontWeight: 600,
        fontSize: '16px',
    },
    find_info: {
        float: 'center',
        color: '#000',
    },
});
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#9e9e9e',
            main: '#000',
            dark: '#000',
            contrastText: '#ffc107',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
    typography: {
        h4: {
            fontWeight: 500,
        },
    },
});

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Dcrew
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
        };
    }

    // 가장 마지막에 실행되는 react lifesycle
    componentDidMount() {
        if (sessionStorage.login) {
            this.setState({ login: true });
        }
    }

    _changeID = function () {
        const id_v = document.getElementsByName('id')[0].value;
        // 'id'라는 name 값을 가진 elemet 조회, value 메소드 사용해 값 가져옴
        this.setState({
            id: id_v,
        }); // state의 id 값 넣기
    };

    _changePW = function () {
        const pw_v = document.getElementsByName('password')[0].value;
        this.setState({
            password: pw_v,
        });
    };

    // 데이터 전송
    _submitUserData = async (e) => {
        const id = this.state.id.trim();
        const password = this.state.password.trim();
        // trim 함수 : 좌, 우측 공백 제거 함수

        if (id === '') {
            return alert('아이디를 입력해주세요.');
        } else if (password === '') {
            return alert('비밀번호를 입력해주세요.');
        }

        const obj = { id: id, password: password };

        // 서버 쪽 '/send/pw'에 데이터 전달
        const res = await axios('/send/pw', {
            method: 'POST',
            data: obj,
            headers: new Headers(),
        });

        // 응답 받음
        if (res.data) {
            console.log(res.data.msg);

            if (res.data.suc) {
                sessionStorage.setItem('login', true); // session storage에 {login:true} 저장
                alert('로그인 되었습니다.');
                return window.location.replace('/');
            } else {
                return alert('아이디 및 비밀번호가 일치하지 않습니다.');
            }
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <Container maxWidth="xs">
                    <div className={classes.frame}>
                        <Typography variant="h4">로그인</Typography>
                        <form className={classes.form} noValidate autoComplete="off">
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="id"
                                label="아이디"
                                name="id"
                                autoFocus
                                fullWidth
                                onChange={() => this._changeID()}
                            />
                            <TextField
                                id="password"
                                label="비밀번호"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                name="password"
                                fullWidth
                                onChange={() => this._changePW()}
                            />
                        </form>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            size="large"
                            onClick={() => this._submitUserData()}
                        >
                            로그인
                        </Button>
                        <Grid container justify="center" className={classes.findinfo}>
                            <Grid>
                                <Link href="#" variant="body2">
                                    아이디 찾기
                                </Link>
                            </Grid>
                            <span className={classes.bar} aria-hidden="true">
                                |
                            </span>
                            <Grid>
                                <Link href="#" variant="body2">
                                    비밀번호 찾기
                                </Link>
                            </Grid>
                            <span className={classes.bar} aria-hidden="true">
                                |
                            </span>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    회원가입
                                </Link>
                            </Grid>
                        </Grid>

                        <Box mt={8}>
                            <Copyright />
                        </Box>
                    </div>
                </Container>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(Login);
