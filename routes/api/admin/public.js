


const express = require('express');
const router = express.Router();


const AuthController = require('../../../http/controllers/api/home/AuthController');

router.post('/login' , AuthController.login ) ; 


module.exports = router  ;  