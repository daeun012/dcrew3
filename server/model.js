const path = require('path');
const db = require(path.join(__dirname, 'models', 'index.js'));

module.exports = {
    api: {
        searchInfo: (body, hash, callback) => {
            db.query(`SELECT * FROM admins WHERE user_id = ? and password = ?`, [body.id, hash], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    callback(result); //다시 controller에게 전달
                }
            });
        },
    },
    get: {
        board: (body, callback) => {
            let search = '%%';

            if (body.search) {
                search = '%' + body.search + '%';
            }

            const offset = (body.page - 1) * body.limit;
            const limit = body.page * body.limit;
            console.log(offset, limit);
            db.query(
                'SELECT * FROM boards WHERE title LIKE ? AND contents LIKE ? ORDER BY board_id DESC LIMIT ?,?',
                [search, search, offset, limit],
                (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(result);
                        console.log(result);
                    }
                }
            );
        },

        board_cnt: (body, callback) => {
            let search = '%%';

            if (body.search) {
                search = '%' + body.search + '%';
            }
            db.query('SELECT COUNT(*) as cnt FROM boards WHERE title LIKE ? AND contents LIKE ?', [search, search], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    callback(result);
                }
            });
        },
    },
    add: {
        board: (body, callback) => {
            db.query('INSERT INTO boards VALUES (null,?,?,?) ', [body.title, body.content, new Date()], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    callback(true);
                }
            });
        },
    },
};
