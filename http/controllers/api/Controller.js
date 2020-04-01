const Recaptcha = require('express-recaptcha').Recaptcha;
const autoBind = require('auto-bind');


module.exports = class Controller {

    failed(msg, res, statusCode = 500) {
        res.status(statusCode).json({
            data: msg,
            status: 'error'
        })
    }
}