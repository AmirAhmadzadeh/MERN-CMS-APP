const express = require('express');
const router = express.Router();



const menuController = require('../../../http/controllers/api/admin/menuController');

const commentsController = require('../../../http/controllers/api/admin/commentController');

const CatController = require('../../../http/controllers/api/admin/categoryController');

const CourseController = require('../../../http/controllers/api/admin/courseController');

const EpsiodeController = require('../../../http/controllers/api/admin/episodeController');




//menus  
router.get('/menu', menuController.getAll);
router.post('/makeNewMenu' , menuController.create) ; 
router.delete('/deleteMenu/:id' , menuController.delete)


//comments
router.get('/getApprovedComments', commentsController.getApprovedComments);
router.get('/getDisApprovedComments', commentsController.getDisApprovedcomments);

// cates
router.get('/getCats', CatController.getAllCats);
router.post('/makeNewCat' , CatController.makeNewCat) ; 
router.delete('/deleteCat/:id' , CatController.deleteCat ) ;   

//courses 
router.get('/getCourses', CourseController.getCourses);
router.post('/createCourse' , CourseController.createCourse) ;
router.delete('/deleteCourse/:id' , CourseController.deleteCourse) ;   
// episodes
router.get('/getEpisodes', EpsiodeController.getEpisodes);

//authenticate 


module.exports = router ;