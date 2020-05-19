const express = require("express");
const router = express.Router();

const controller = require("./user.controller");

router.get("/list", verifyToken, controller.getUsers);
router.get("/:id", verifyToken, controller.getUser);
router.post('/findpw', controller.passwordMail);

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
    res.sendStatus(403);
  }
}
module.exports = router;
