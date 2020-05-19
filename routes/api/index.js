const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/auth", require("./auth"));
router.use("/board", require("./board"));
router.use("/map", require("./map"));

module.exports = router;
