const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/send/pw', controller.api.sendPw); // 클라이언트가 '/send/pw'의 주소로 보내는 모든 데이터 controller에게 전달

router.post('/add/board', controller.add.board);
router.post('/get/board', controller.get.board);
router.post('/get/board_cnt', controller.get.board_cnt);
router.post('/get/board_data', controller.get.board_data);
router.post('/update/view_cnt', controller.update.view_cnt);

module.exports = router;
