const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueString = require('unique-string');
const Schema = mongoose.Schema;


const userModel = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String, 
        required: true,
        unique: true
    },

    admin: {
        type: Boolean,
        default: false,
        required: false
    },

    password: {
        type: String,
        required: true
    },

    rememberToken: {
        type: String,
        default: null
    }
    ,
    Bcourses: [{
        type: Schema.Types.ObjectId, 
        ref: 'courses'
    }]
},
    {
        timestamps: true,
        toJSON: { virtuals: true }
    });



userModel.methods.checkPass = (pass, hash) => {
    return bcrypt.compareSync(pass, hash);
}


userModel.methods.setRememberTokenCookie = function (res) {
    // console.log(this) ;
    const token = uniqueString();

    // mili seconds 
    // one hour
    res.cookie('remember_token', token, {
        maxAge: 1000 * 60 * 60 ,
        httpOnly: true,
        signed: true
    });

    this.update({ rememberToken: token }, (err) => {
        if (err) console.log('error in set Remember Token');
    });
}

userModel.virtual('courses', {
    ref: 'courses',
    localField: `_id`,
    foreignField: 'user'
});

userModel.methods.isVip = function () {
    return false;
}


userModel.methods.checkLearning = function (course) {

    //  console.log(`amir is hewre`  ,course , '******'); 
    if (this.Bcourses.indexOf(course._id) != -1) {
        return true
    }
    return false;
}
userModel.methods.checkLearningWithCourseId = function (id) {

    //  console.log(`amir is hewre`  ,course , '******'); 
    if (this.Bcourses.indexOf(id) != -1) {
        return true
    }
    return false;
}


module.exports = mongoose.model('users', userModel);