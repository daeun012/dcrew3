import React, { Component } from 'react';
import axios from 'axios';

class BoardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], // 서버로부터 받아온 데이터 저장
            date: '', // date 값 보기 좋게 변환 위해
        };
    }
    componentDidMount() {
        const board_id = this.props.match.params.data;
        this._getData(board_id);
        this._addViewCnt(board_id);
    }

    _getData = async function (board_id) {
        const getData = await axios('/get/board_data', {
            method: 'POST',
            headers: new Headers(),
            data: { id: board_id },
        });

        // 날짜 구하기
        const date = getData.data.data[0].date.slice(0, 10) + ' ' + getData.data.data[0].date.slice(11, 16);

        return this.setState({ data: getData.data, date: date });
    };

    _addViewCnt = async function (board_id) {
        const addView = await axios('/update/view_cnt', {
            method: 'POST',
            headers: new Headers(),
            data: { id: board_id },
        });
    };

    render() {
        const { data, date } = this.state;
        console.log(data);
        return (
            <div className="Write">
                {data.data ? (
                    <div>
                        <div className="top_title">
                            <input type="text" id="title_txt" name="title" defaultValue={data.data[0].title} readOnly />

                            <div className="date_div">{date}</div>
                        </div>

                        <div>
                            <textarea id="content_txt" name="contents" defaultValue={data.data[0].contents} readOnly></textarea>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default BoardView;
