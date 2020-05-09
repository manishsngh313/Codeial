const express = require('express');
const passport = require('passport')
const router = express.Router();
const postsController = require('../controller/post_controller');
router.post('/create-post',passport.checkAuthentication ,postsController.createPost);

module.exports = router;