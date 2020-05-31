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
            console.log(body);
            model.get.board(body, (result) => {
                if (result) {
                    res.send(result);
                }
            });
        },
        board_cnt: (req, res) => {
            model.get.board_cnt((result) => {
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
};
