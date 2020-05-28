const path = require('path');
const express = require('express'); // express 모듈 불러오기
const app = express(); // app이라는 변수에 담음
const bodyParser = require('body-parser'); // 클라이언트가 보내는 데이터를 읽기 위한 모듈
const PORT = process.env.PORT || 5000; // server로 쓸 port 번호 연결
const router = require('./routes'); // server 경로

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/', router);

// 서버 실행
app.listen(PORT, () => {
    console.log(`Sever On : http://localhost:${PORT}/`);
});
