import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import { Link } from 'react-router-dom';
const styles = (theme) => ({
    root: {
        marginTop: theme.spacing(7),
    },
    table: {
        minWidth: 650,
    },
    createButton: {
        marginTop: theme.spacing(2),
        float: 'right',
    },
});

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total_page: '',
            page: 1,
            limit: 10, // 보여줄 목록의 개수
        };
    }

    componentDidMount() {
        this._getListData();
        this._setPage();
    }

    _getListData = async function () {
        const { limit } = this.state;
        const page = this._setPage();

        // boards 테이블의 전체 행의 개수 가져오기
        const total_cnt = await axios('/get/board_cnt');

        // 게시판 목록 가져오기
        // 일단 limit과 page를 보내고 이를 이용해 보여줄 목록들을 가져옴
        const data_list = await axios('/get/board', {
            method: 'POST',
            headers: new Headers(),
            data: { limit: limit, page: page },
        });

        // 전체 페이지 수 구하기
        let page_arr = Math.ceil(total_cnt.data[0].cnt / limit);

        this.setState({ data: data_list, total_page: page_arr });
    };

    _changePage = (event, value) => {
        this.setState({ page: value });
        sessionStorage.setItem('page', value);
        return this._getListData();
    };

    _setPage = () => {
        if (sessionStorage.page) {
            this.setState({ page: Number(sessionStorage.page) });
            return Number(sessionStorage.page);
        }
        this.setState({ page: 1 });
        return 1;
    };

    render() {
        const list = this.state.data.data;
        const { total_page } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">번호</TableCell>
                                <TableCell align="center">제목</TableCell>
                                <TableCell align="center">작성자</TableCell>
                                <TableCell align="center">날짜</TableCell>
                                <TableCell align="center">조회수</TableCell>
                                <TableCell align="center">추천수</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list
                                ? list.map((el, key) => (
                                      <TableRow key={key}>
                                          <TableCell align="center">{el.board_id}</TableCell>
                                          <TableCell align="left">{el.title}</TableCell>
                                          <TableCell align="center"></TableCell>
                                          <TableCell align="center">{el.date.slice(0, 10)} </TableCell>
                                          <TableCell align="center"></TableCell>
                                          <TableCell align="center"></TableCell>
                                      </TableRow>
                                  ))
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination count={total_page} onChange={this._changePage} />

                <Button className={classes.createButton} variant="contained" color="primary" component={Link} to={'/board/write'}>
                    글쓰기
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(Board);
