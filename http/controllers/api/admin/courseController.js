const Controller = require('../../controller');
const Course = require('../../../../models/course');



class courseController extends Controller {

    async getCourses(req,res) {
        const courses = await Course.find({}) ; 
        res.json(courses) ;
    }

    async createCourse(req , res) { 
        
        // console.log('body of req' , req.body) ; 
        // console.log(' file req ',  req.file) ; 
     
        const newCourse = new Course( { 
            tags : req.body.data.tags  , 
            price : req.body.data.price , 
            file : req.body.data.file ,
            type : req.body.data.type  ,
            body : req.body.data.body , 
            title : req.body.data.title, 
            user : "5cc0be87f002442cd6f74ff1" , 
            slug : req.body.data.slug , 
            categories : req.body.data.categories  
        
        } ) ; 
        const savedCourse = await newCourse.save() ;       
        if (course) return res.json({  status : true   }) ;
        return res.json({  status: false } ) ;     
    }


    async deleteCourse(req,res) { 
          // delete course 
          try {
            const deletedCourse = await Course.findById(req.params.id)
              .populate({
                path: 'episodes',
                populate: {
                  path: 'comments'
                }
              })
              .populate({ path: 'comments' });
      
            deletedCourse.episodes.forEach(async episode => {
              episode.comments.forEach(async comment => {
                  await comment.remove();
              });
              await episode.remove();
            });
            deletedCourse.comments.forEach(async comment => {
              await comment.remove();
            });
            
           
            // fs.unlinkSync(`./public${deletedCourse.file}`);
            await deletedCourse.remove();
        
            return res.json({status: true })  ; 
            
            // res.redirect(req.header('REFERER') || '/');
          } catch (error) {
            console.log(`Error in deleting course  ${error}`);
            res.json({status : false }) ;  
          }
    }
}



module.exports = new courseController();
