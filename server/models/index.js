'use strict';

const path = require('path');

// mysql 연동 위해
const env = process.env.NODE_ENV || 'development';
const conf = require(path.join(__dirname, '..', 'config', 'db.json'))[env]; // ../config/db.json 파일을 가져 오겠다.
const mysql = require('mysql');

// mysql 연결
const db = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
});

db.connect();

module.exports = db;
