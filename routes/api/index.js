const express = require('express');


const router = express.Router();


router.use('/admin', require('./admin/'));


router.use('/', require('./home'));




module.exports = router