const express = require('express');
const router = express.Router();
passport = require('passport')


const commentController = require('../controller/comment_controller');

router.post('/create-comments',passport.checkAuthentication,commentController.create);
router.get('/destroy-comments/:id',passport.checkAuthentication,commentController.destroy);
module.exports = router;