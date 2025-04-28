const express = require("express");
const router = express.Router();
const registerCotroller = require("../controller/registerController");

router.post("/", registerCotroller.handleNewUser);

module.exports = router;
