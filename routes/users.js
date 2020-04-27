const express = require('express');

const router = express.Router();
const usersController = require('../controller/user_controller')

console.log('users router loaded');
router.get('/users', usersController.home);


module.exports = router;