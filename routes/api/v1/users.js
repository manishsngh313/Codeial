const express = require('express');
const userApi = require('../../../controller/api/v1/users_api')

const router = express.Router();
// const postsApi = require('../../../controller/api/v1/posts_api');

router.post('/create-session', userApi.createSession);


module.exports = router;