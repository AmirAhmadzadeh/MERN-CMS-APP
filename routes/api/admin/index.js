const express = require('express');
const router = express.Router();
const publicAccess = require('./public') ; 
const privateAccess = require('./private');
const AuthApi = require('../../../http/middlewares/AuthApi') ;

router.use(publicAccess) ;

router.use(AuthApi.handle,privateAccess) ;






module.exports = router;