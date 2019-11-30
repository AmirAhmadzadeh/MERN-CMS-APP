


const express =require('express');
const router = express.Router() ;
const HomeController = require('../../../http/controllers/api/home/homeController') ;  
const AcademyController = require('../../../http/controllers/api/home/academyController') ;  
const AuthController = require('../../../http/controllers/api/home/AuthController') ; 


router.get('/home' , HomeController.getHome ) ; 
router.get('/academy' , AcademyController.getAcademy ) ; 
router.get('/academy/:courseId' , AcademyController.getSingleCourse ) ; 


router.post('/login' ,AuthController.login )
router.post('/register' , AuthController.register)


// logoutUser 
router.get('/logout' , AuthController.logout) ; 


// commenting 
router.post('/sendComment' , AcademyController.comment ); 

module.exports = router ;