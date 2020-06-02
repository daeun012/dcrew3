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

      db.query(
        'SELECT * FROM boards WHERE title LIKE ? AND contents LIKE ? ORDER BY board_id DESC LIMIT ?,?',
        [search, search, offset, limit],
        (err, result) => {
          if (err) {
            throw err;
          } else {
            callback(result);
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
    board_data: (body, callback) => {
      db.query('SELECT *  FROM boards WHERE board_id=?', [body.id], (err, result) => {
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
      db.query('INSERT INTO boards VALUES (NULL,?,?,?,?) ', [body.title, body.content, new Date(), 0], (err, result) => {
        if (err) {
          throw err;
        } else {
          callback(true);
        }
      });
    },
    user: (body, hash_pw, now_date, callback) => {
      db.query('SELECT *  FROM users WHERE id=? ', [body.id], (err, result) => {
        if (result.length > 0) {
          callback(false);
        } else {
          db.query(
            'INSERT INTO users VALUES (NULL,?,?,?,?,?,?) ',
            [body.id, hash_pw, body.name, body.nickname, body.email, now_date],
            (err, result) => {
              if (err) {
                throw err;
              } else {
                callback(true);
              }
            }
          );
        }
      });
    },
  },
  update: {
    view_cnt: (body, callback) => {
      db.query('UPDATE boards SET view_cnt=view_cnt+1 WHERE board_id=?', [body.id], (err, result) => {
        if (err) {
          throw err;
        } else {
          callback(true);
        }
      });
    },
  },
};
