
const passport = require('passport') ; 


class AuthApi {

    handle(req , res ,next) {
        passport.authenticate('jwt' , { session : false } , (err , user , info ) => {

            if(err || !user ) 
                return res.status(401).json({
                    data : info.message || 'اجازه دسترسی ندارید',
                    status : 'error'
                })

            req.user = user;
                
            next();
        })(req , res , next);
    }
}

module.exports = new AuthApi() ; 