const express = require('express');

const router = express.Router();
homeController = require('../controller/home_controller.js')


// console.log('router loaded');
router.get('/', homeController.home);
router.use('/users',require('./users'));



module.exports = router;