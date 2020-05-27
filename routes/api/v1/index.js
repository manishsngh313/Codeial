const express = require('express');

const router = express.Router();
// const postsApi = require('../../../controller/api/v1/posts_api');

router.use('/posts', require('./post'));
router.use('/users', require('./users'));

module.exports = router;