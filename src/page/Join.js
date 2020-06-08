import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Link,
    InputAdornment,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText,
} from '@material-ui/core';
import Lock from '@material-ui/icons/Lock';
import axios from 'axios';
const styles = (theme) => ({
    frame: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },

    submit: {
        margin: theme.spacing(3, 0, 4),
        fontWeight: 600,
        fontSize: '16px',
    },

    social: {
        padding: theme.spacing(3, 0, 3),
    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
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
class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkId: {
                null: false,
                notV: false,
            },
            checkName: {
                null: false,
                notV: false,
            },
            checkNick: {
                notV: false,
                overlap: false,
            },
            checkEmail: {
                null: false,
                notV: false,
            },
        };
    }
    _join = async function () {
        const id = document.getElementsByName('join_id')[0].value.trim();
        const password = document.getElementsByName('join_password')[0].value.trim();
        const psw_check = document.getElementsByName('join_pswCheck')[0].value.trim();
        const name = document.getElementsByName('join_name')[0].value.trim();
        const nickname = document.getElementsByName('join_nickname')[0].value.trim();
        const email = document.getElementsByName('join_email')[0].value.trim();

        // 닉네임 유효성 검사
        if (nickname.length === 0 || nickname.length < 2) {
            this.setState({ checkNick: { notV: true } });
        } else if (nickname === '다으닝') {
            this.setState({ checkNick: { overlap: true } });
        } else {
            this.setState({ checkNick: { overlap: false, notV: false } });
        }

        console.log(this.state.checkNick.notV, this.state.checkNick.overlap);

        /*
        const eng_check = /^[a-z]+[a-z0-9]{4,19}$/g;
  
        if (id === '') {
        }
        if (!eng_check.test(id)) {
            this.setState({ checkId: true });
        } else {
            this.setState({ checkId: false });
        }

        const pw_check = /^[a-z]+[a-z0-9]{5,19}$/g;
        if (!pw_check.test(password)) {
            return alert('비밀번호는 영문자로 시작하는 6~20자여야만 합니다.');
        } else if (password !== psw_check) {
            return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        }

        if (name.length === 0 || name.length < 2) {
            this.setState({ checkName: true });
        } 
        this.setState({ checkName: false });*/

        const data = { id: id, password: password, name: name, nickname: nickname, email: email };

        const add_user = await axios('/add/user', {
            method: 'POST',
            headers: new Headers(),
            data: data,
        });
    };
    // 아이디 유효성 검사
    checkId = (e) => {
        const eng_check = /^[a-z]+[a-z0-9]{4,19}$/g;
        const id = e.target.value;
        if (id === '') {
            this.setState({ checkId: { null: true } });
        } else if (!eng_check.test(id)) {
            this.setState({ checkId: { notV: true } });
        } else {
            this.setState({ checkId: { notV: false, null: false } });
        }
    };

    // 이름 유효성 검사
    checkName = (e) => {
        const name = e.target.value;
        if (name === '') {
            this.setState({ checkName: { null: true } });
        } else if (name.length === 0 || name.length < 2) {
            this.setState({ checkName: { notV: true } });
        } else {
            this.setState({ checkName: { notV: false, null: false } });
        }
    };
    checkNick = (e) => {
        const nickname = e.target.value;
        if (nickname.length === 0 || nickname.length < 2) {
            this.setState({ checkNick: { notV: true } });
        } else if (nickname === '다으닝') {
            this.setState({ checkNick: { overlap: true } });
        } else {
            this.setState({ checkNick: { overlap: false, notV: false } });
        }
    };

    // 이메일 유효성 검사
    checkEmail = (e) => {
        const email_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        const email = e.target.value;
        if (email === '') {
            this.setState({ checkEmail: { null: true } });
        } else if (!email_check.test(email)) {
            this.setState({ checkEmail: { notV: true } });
        } else {
            this.setState({ checkEmail: { notV: false, null: false } });
        }
    };

    render() {
        const { classes } = this.props;
        const { checkEmail, checkId, checkName, checkNick } = this.state;
        console.log(this.state.checkNick.notV, this.state.checkNick.overlap);
        return (
            <Container maxWidth="xs">
                <div className={classes.frame}>
                    <Typography variant="h4">회원가입</Typography>
                    <div className={classes.form} noValidate autoComplete="off">
                        <TextField
                            size="medium"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="id"
                            label="아이디"
                            name="join_id"
                            autoFocus
                            onChange={this.checkId}
                            {...(checkId.notV && {
                                helperText: '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
                                error: true,
                            })}
                            {...(checkId.null && {
                                helperText: '필수 정보입니다.',
                                error: true,
                            })}
                        />
                        <TextField
                            id="password"
                            label="비밀번호"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            name="join_password"
                            fullWidth
                            helperText="문자, 숫자, 기호를 조합하여 8자 이상을 사용하세요"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Lock />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel htmlFor="password_check">비밀번호 재확인</InputLabel>
                            <OutlinedInput
                                id="password_check"
                                type="password"
                                name="join_pswCheck"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Lock />
                                    </InputAdornment>
                                }
                                labelWidth={117}
                            />
                            <FormHelperText id="component-helper-text">비밀번호가 일치하지 않습니다.</FormHelperText>
                        </FormControl>
                        <TextField
                            id="name"
                            label="이름"
                            variant="outlined"
                            margin="normal"
                            name="join_name"
                            fullWidth
                            onChange={this.checkName}
                            {...(checkName.notV && {
                                helperText: '이름은 최소 2글자 이상 입력해야 합니다.',
                                error: true,
                            })}
                            {...(checkName.null && {
                                helperText: '필수 정보입니다.',
                                error: true,
                            })}
                        />
                        <TextField
                            id="nickname"
                            label="닉네임"
                            variant="outlined"
                            margin="normal"
                            name="join_nickname"
                            fullWidth
                            onChange={this.checkNick}
                            {...(checkNick.notV && {
                                helperText: '닉네임은 최소 2글자 이상 입력해야 합니다.',
                                error: true,
                            })}
                            {...(checkNick.overlap && {
                                helperText: '중복되는 닉네임이 있습니다.',
                                error: true,
                            })}
                        />
                        <TextField
                            id="email"
                            label="본인 인증을 위한 이메일"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            name="join_email"
                            fullWidth
                            onChange={this.checkEmail}
                            {...(checkEmail.notV && {
                                helperText: '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
                                error: true,
                            })}
                            {...(checkEmail.null && {
                                helperText: '필수 정보입니다.',
                                error: true,
                            })}
                        />
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => this._join()}
                        className={classes.submit}
                        size="large"
                    >
                        가입하기
                    </Button>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(Join);
