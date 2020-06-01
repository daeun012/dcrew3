const path = require('path');
const model = require('./model');
// 비밀번호를 hash 하기위해
const hashing = require(path.join(__dirname, 'config', 'hashing.js'));
const salt = require(path.join(__dirname, 'config', 'db.json')).salt;

module.exports = {
    needs: () => upload,
    api: {
        sendPw: (req, res) => {
            const body = req.body;
            const hash = hashing.enc(body.id, body.password, salt);
            console.log('성공');
            model.api.searchInfo(body, hash, (result) => {
                //model에게 전달 받은 데이터
                var obj = {};
                if (result[0]) {
                    obj['suc'] = true;
                    obj['msg'] = '로그인 성공';
                } else {
                    obj['suc'] = false;
                    obj['msg'] = '로그인 실패';
                }

                res.send(obj); // 클라이언트에 전달
            });
        },
    },
    get: {
        board: (req, res) => {
            const body = req.body;

            model.get.board(body, (result) => {
                if (result) {
                    res.send(result);
                }
            });
        },
        board_cnt: (req, res) => {
            const body = req.body;
            model.get.board_cnt(body, (result) => {
                if (result) {
                    res.send(result);
                }
            });
        },
        board_data: (req, res) => {
            const body = req.body;
            model.get.board_data(body, (data) => {
                const result = { data: data };
                res.send(result);
            });
        },
    },
    add: {
        board: (req, res) => {
            const body = req.body;
            model.add.board(body, (result) => {
                if (result) {
                    res.send(true);
                }
            });
        },
    },
    update: {
        view_cnt: (req, res) => {
            const body = req.body;
            const expires = new Date(); // 쿠키 유지 시간
            expires.setDate(expires.getDate() + 1); // 삭제하고 싶은 날을 오늘 기준으로 더해서 선언, 하루 후에 쿠키 삭제
            const cookie_name = 'board_' + body.id;
            // console.log(req.cookies[cookie_name]) => 쿠키 조회
            const exist_cookie = req.cookes[cookies_name];
            if (!exist_cookie) {
                res.cookie(cookie_name, true, {
                    expires: expires,
                }); // 쿠키 이름, 쿠키에 들어갈 값, 쿠키 유지 시간

                model.update.view_cnt(body, (result) => {
                    if (result) {
                        res.send(true);
                    }
                });
            }
        },
    },
};
