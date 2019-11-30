const Recaptcha = require('express-recaptcha').Recaptcha;
const autoBind = require('auto-bind');


module.exports = class Controller {

    constructor() {
        autoBind(this);
    }

    recaptchaConfig() {
        this.recaptcha = new Recaptcha(
            '6LehGmsUAAAAAFAOCfHKIxLVIsMdpv6fZ42saWh_',
            '6LehGmsUAAAAAE1Z_q8n4uYDM760DSmQclYZgmo2', 
            { hl: 'fa' });
    }
}