const express = require('express');
const router = express.Router();
passport = require('passport')


const commentController = require('../controller/comment_controller');

router.post('/create-comments',passport.checkAuthentication,commentController.create);

module.exports = router;