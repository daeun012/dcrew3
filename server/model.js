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
};
