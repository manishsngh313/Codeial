const express = require('express');

const router = express.Router();
const usersController = require('../controller/user_controller')

console.log('users router loaded');
router.get('/profile', usersController.home);

router.get('/sign-in',usersController.signIn);
router.get('/sign-up', usersController.signUp);

router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);
router.get('/sign-out', usersController.signOut);

module.exports = router;