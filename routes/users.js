const express = require('express');
const passport = require('passport')
const router = express.Router();
const usersController = require('../controller/user_controller')

console.log('users router loaded');
router.get('/profile',passport.checkAuthentication, usersController.home);

router.get('/sign-in',usersController.signIn);
router.get('/sign-up', usersController.signUp);

router.post('/create',  usersController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) , usersController.createSession)
router.get('/sign-out', usersController.destroySession);
module.exports = router;