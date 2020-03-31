const Controller = require('./../Controller');
const Course = require('../../../../models/course');
const Comment =  require('../../../../models/Comment') ; 

class AcademyController extends Controller {

    async getAcademy(req, res) {
        const courses = await Course.find({});
        const retCourses = courses.map(courseItem => {
            return {
                title: courseItem.title,
                id: courseItem.id,
                body: courseItem.body,
                file: courseItem.file
            }
        });
        return res.json({ courses: retCourses });
    }

    async getSingleCourse(req, res) {
        const course = await Course.findById(req.params.courseId)
            .populate([
                {
                    path: 'user',
                    select: 'name',
                    ref: 'users'
                },
                {
                    path: 'episodes',
                    options: { sort: { number: 1 } }
                }
            ])
            .populate([
                {
                    path: 'comments',
                    match: {
                        parent: null,
                        approved: true
                    },
                    populate: [
                        {
                            path: 'user',
                            select: 'name',
                            ref: 'users'
                        },
                        {
                            path: 'comments',
                            match: {
                                approved: true
                            },
                            populate: {
                                path: 'user'
                                , select: 'name',
                                ref: 'users'
                            }
                        }
                    ]
                }
            ]);
        res.json(course);
    }


    async getCanUseForCourse(req, res) {

        const canUseCourse = req.user.checkLearningWithCourseId(req.body.courseId)
        res.json({ canUseCourse });
    }

    // byingCourse 
    async registerCourse(req, res) {
        // res.json('hello')



        //  console.log(course) ;
        if (await req.user.checkLearningWithCourseId(req.body.course._id)) {
            return res.json({ status: true, msg: 'شما این دوره را قبلا خریده اید ' });
        }


        if (req.body.course.price == 0 &&
            (req.body.course.type == 'vip' || req.body.course.type == 'free')) {

            return res.json({ status: true, msg: 'این دوره خریدنی نیست ' });
        }

        // buying process : 


        try {
            req.user.Bcourses.push(req.body.course);
            await req.user.save();

        } catch (err) {
            consoel.log(`error in new course for the user`);
            return res.json({
                status: false
            });
        }

        return res.json({
            status: true
        });
    }

    async comment(req,res) { 

         const cm = new Comment({...req.body  })
         await cm.save();
         if (!cm) return res.json({ status :false } );
         return res.json({ status : true });        
    }

}



module.exports = new AcademyController();