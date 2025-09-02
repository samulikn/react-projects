const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.route("/")
    .post(authController.handleLogin)

router.route("/refresh")
    .get(authController.refresh)

router.route("/logout")
    .post(authController.logout)

module.exports = router;