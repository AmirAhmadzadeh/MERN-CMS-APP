const Controller = require('./../Controller');
const jwt = require('jsonwebtoken');
const passport = require('passport');
class AuthController extends Controller {

    async login(req, res, next) {

        passport.authenticate('my-login-strategy',
            { session: false }, (err, user) => {

                if (err) return this.failed(err.message, res);
                if (!user) return this.failed('چنین کاربری وجود ندارد', res, 404)

                req.login(user, { session: false }, (err) => {
                    if (err) return this.failed(err.message, res);

                    // create token
                    // with seconds 
                    const token = jwt.sign({ id: user.id }, config.jwt.secret_key, {
                        expiresIn: 60 * 60 * 1
                    });
                    return res.json({
                        data: {
                            token
                        },
                        status: 'success'
                    });
                })
            })(req, res);


    }


    async register(req, res, next) {

        passport.authenticate('register',
        (err, user, info) => {
              if (err) {

                    // console.log(`amir error `);
              }
              if (info !== undefined) {
                    // console.error(info.message);
                    // console.log('[ amir is here right now ]') ; 
                    // res.status(403).json({
                    //       message: info.message , 
                    //       status: false
                    // });

                    return res.json({
                          message: info.message,
                          status: false
                    });
              } else {

                    req.logIn(user, error => {
                          if (error) {
                                console.log(`[ Error in register user  :| ]`, error);
                          }
                          // console.log(`user created `)
                          // console.log(user);

                          res.status(200).json({
                                message: 'user created',
                                status: true,
                          });

                    });
              }
        })(req, res, next);
    }


    async logout(req, res, next) {
       
        res.json({
            status: true
        });
    }

}



module.exports = new AuthController();