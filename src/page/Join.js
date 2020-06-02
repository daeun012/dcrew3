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
  _join = async function () {
    const id = document.getElementsByName('join_id')[0].value.trim();
    const password = document.getElementsByName('join_password')[0].value.trim();
    const psw_check = document.getElementsByName('join_pswCheck')[0].value.trim();
    const name = document.getElementsByName('join_name')[0].value.trim();
    const nickname = document.getElementsByName('join_nickname')[0].value.trim();

    // 이메일 구하기
    const email = document.getElementsByName('join_email')[0].value.trim();

    const eng_check = /^[a-z]+[a-z0-9]{4,19}$/g;

    if (!eng_check.test(id)) {
      return alert('아이디는 영문자로 시작하는 5~20자여야만 합니다.');
    }

    /*    const pw_check = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (!pw_check.test(password)) {
      return alert('비밀번호는 영문자로 시작하는 6~20자여야만 합니다.');
    } else if (password !== psw_check) {
      return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }
 */
    if (name.length === 0 || name.length < 2) {
      return alert('이름은 최소 2글자 이상 입력해야 합니다.');
    }
    const email_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (!email.match(email_check)) {
      return alert('올바른 이메일 형식을 입력해주세요.');
    }

    const data = { id: id, password: password, name: name, nickname: nickname, email: email };

    const add_user = await axios('/add/user', {
      method: 'POST',
      headers: new Headers(),
      data: data,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="xs">
        <div className={classes.frame}>
          <Typography variant="h4">회원가입</Typography>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              size="medium"
              variant="outlined"
              margin="normal"
              fullWidth
              id="id"
              label="아이디"
              name="join_id"
              autoFocus
              helperText="5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."
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
            <TextField id="name" label="이름" variant="outlined" margin="normal" name="join_name" fullWidth helperText="필수 정보입니다" />
            <TextField
              id="nickname"
              label="닉네임"
              variant="outlined"
              margin="normal"
              name="join_nickname"
              fullWidth
              helperText="필수 정보입니다"
            />
            <TextField
              id="email"
              label="본인 인증을 위한 이메일"
              type="email"
              variant="outlined"
              margin="normal"
              name="join_email"
              fullWidth
              helperText="필수 정보입니다"
            />
          </form>
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
