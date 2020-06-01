import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from '../component/Search.js';
import queryString from 'query-string';

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
    state = {
        data: [],
        page: 1,
        limit: 10, // 보여줄 목록의 개수
        total_page: null,
        search: '',
    };

    _getListData = async function () {
        console.log('getLIST');
        const { limit } = this.state;

        // query-string 모듈 통해 search 변수에 검색된 값 담아주기
        let search = queryString.parse(this.props.location.search);

        if (search) {
            search = search.search;
        }
        console.log(search);

        // search를 보내고
        // boards 테이블의 전체 행의 개수 가져오기
        const total_cnt = await axios('/get/board_cnt', {
            method: 'POST',
            headers: new Headers(),
            data: { search: search },
        });
        console.log(total_cnt.data[0]);

        // 게시판 목록 가져오기
        // 일단 limit과 page를 보내고 이를 이용해 보여줄 목록들을 가져옴
        const data_list = await axios('/get/board', {
            method: 'POST',
            headers: new Headers(),
            data: { limit: limit, page: this.state.page, search: search },
        });
        console.log(data_list);

        // 전체 페이지 수 구하기
        let page_arr = Math.ceil(total_cnt.data[0].cnt / limit);

        this.setState({ data: data_list, total_page: page_arr, search: search });
        console.log('----------------------');
    };

    _changePage = (event, value) => {
        console.log('ChangePage');
        this.setState({ page: value });

        return this._getListData();
    };

    componentDidMount() {
        console.log('didmount');
        this._getListData();
    }

    render() {
        const list = this.state.data.data;
        const { total_page, search, page } = this.state;
        const { classes } = this.props;
        console.log('render');
        console.log(list);
        console.log(total_page, search, page);

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
                            {list && list.length > 0 ? (
                                list.map((el, key) => {
                                    const view_url = 'board/view/' + el.board_id;
                                    return (
                                        <TableRow key={key}>
                                            <TableCell align="center">{el.board_id}</TableCell>
                                            <TableCell align="left">
                                                <Link to={view_url}>{el.title}</Link>
                                            </TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center">{el.date.slice(0, 10)} </TableCell>
                                            <TableCell align="center">{el.view_cnt}</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    {search !== '' ? (
                                        <TableCell colSpan={6} align="center">
                                            검색된 결과가 없습니다.
                                        </TableCell>
                                    ) : null}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button className={classes.createButton} variant="contained" color="primary" component={Link} to={'/board/write'}>
                    글쓰기
                </Button>
                <Grid container direction="column" spacing={2} justify="center" alignItems="center">
                    <Grid item>
                        <Pagination className={classes.pagination} count={total_page} page={page} onChange={this._changePage} />
                    </Grid>{' '}
                    <Grid item>
                        <Search />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Board);
