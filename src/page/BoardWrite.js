import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const styles = (theme) => ({
    root: {
        padding: '20px',
        paddingLeft: '30px',
        marginTop: theme.spacing(7),
        '& > div': {
            marginTop: '30px',
            marginLeft: '50px',
        },
    },
    title: {
        paddingBottom: theme.spacing(4),
        fontSize: '20px',
        fontWeight: 'bold',
        '&focus': {
            outline: 'none',
        },
    },
    content: {
        width: '100%',
        resize: 'none',
        border: 'none',
        height: '500px',
        '&focus': {
            outline: 'none',
        },
    },
});
class BoardWrite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
        };
    }

    _submitBoard = async () => {
        const title = document.getElementsByName('title')[0].value.trim();

        const content = document.getElementsByName('content')[0].value.trim();

        if (title === '') {
            return alert('제목을 입력해주세요.');
        } else if (content === '') {
            return alert('내용을 입력해주세요');
        }

        const data = { title: title, content: content };

        const res = await axios('/add/board', {
            method: 'POST',
            data: data,
            headers: new Headers(),
        });

        if (res.data) {
            alert('글 등록이 완료되었습니다.');
            return this.props.history.replace('/board');
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Input className={classes.title} type="text" id="title" placeholder="제목" name="title" fullWidth required />
                <div>
                    <textarea className={classes.content} id="content" placeholder="내용을 입력하세요." name="content"></textarea>
                </div>

                <div id="post_submit">
                    <button onClick={this._submitBoard}> 작성하기 </button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(BoardWrite);
