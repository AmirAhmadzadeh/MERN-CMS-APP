


const express =require('express');
const router = express.Router() ;

const HomeController = require('../../../http/controllers/api/home/homeController') ; 
const AuthController = require('../../../http/controllers/api/home/AuthController') ; 
const AcademyController = require('../../../http/controllers/api/home/academyController') ; 



//  check Token 


// get user Info 
router.get('/user' ,HomeController.getUserData) ; 
// download Episode  

// Register course 
router.post('/registerCourse',AcademyController.registerCourse) ; 
// get can Use permision for course
router.post('/getCanUseCourseForUser' , AcademyController.getCanUseForCourse ) ; 


module.exports = router ;