const services = require('./service-config');

module.exports = {

  services: services,
  port: process.env.PORT || 8000,
  debug: true,
  SecrtPramaterCookieparser: 'my_secret_key'
  , 
  mongourl: 'mongodb://localhost:27017/MERN-APP' , 
  jwt : { 
    secret_key : "cnacnaclkmscimc8646c@#@#$@#$@Rfkln_klca"
  }

}