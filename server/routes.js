const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/send/pw', controller.api.sendPw); // 클라이언트가 '/send/pw'의 주소로 보내는 모든 데이터 controller에게 전달

module.exports = router;
