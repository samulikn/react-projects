const express = require('express');
const router = express.Router();
const pkg = require("../package.json");
const usersController = require('../controllers/usersController');

const serverInfo = (req, res) => res.send(`${pkg.description} v${pkg.version}`);

router.route('/')
    .get(serverInfo)
    .post(usersController.handleNewUser);

router.route('/:user')
    .get(usersController.handleLogin)
    .delete(usersController.deleteUser)
    .put(usersController.updateUserData);

router.route('/:user/transactions')
    .post(usersController.addTransaction);

router.route('/:user/transactions/:id')
    .delete(usersController.deleteTransaction);

module.exports = router;
