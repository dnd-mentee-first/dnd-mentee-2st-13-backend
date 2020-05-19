const express = require('express');
const router = express.Router();

const controller = require('./board.controller');

router.get('/list', controller.list);
router.get('/read/:id', controller.read);
router.post('/write', verifyToken, controller.write);
router.post('/edit/:id', verifyToken, controller.edit);
router.post('/delete/:id', verifyToken, controller.delete);
router.post('/newReply/:id', verifyToken, controller.newReply);
router.post('/editReply/:id', verifyToken, controller.editReply);
router.post('/deleteReply/:id', verifyToken, controller.deleteReply);
router.post('/boardRecommend/:id', verifyToken, controller.boardRecommend);

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];

    // 헤더에 Authorization: Bearer <accessToken> 형식으로 입력
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" "); // 스페이스 구분
        const bearerToken = bearer[1]; // get token
        req.token = bearerToken; // set token
        next();
    } else {
        // foridden
        //res.sendStatus(403);
        res.json({
            success: false,
            msg: '로그인 후 이용 가능'
        })
    }
}

module.exports = router;