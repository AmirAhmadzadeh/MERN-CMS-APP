const Controller = require('../../controller');
const Category = require('../../../../models/categories');
const Course = require('../../../../models/course');

class CategoryController extends Controller {

     // geting all the categories 
     async getAllCats(req, res) {
          const categories = await Category.find({});
          res.json(categories);
     };

     // added but does not tested Right now !! 
     async updateCat(req, res) {
          console.log(req.body, 'amir is here in server !!!!!');
          const cat = await Category.findByIdAndUpdate(req.params.id, { ...req.body });

          try {
               await cat.save();
               res.json({ status: true });
          } catch (error) {
               console.log('Error in Update the CateGory Save! ');
               res.json({ status: false });
          }
     }

     // make new category ! 
     async makeNewCat(req, res) {
          console.log(req.body);
          if (req.body.parent == 'none') req.body.parent = null;

          try {

               const newCat = new Category({ ...req.body });
               await newCat.save();
               res.json({

                    status: true

               })

          } catch (err) {

               res.json({
                    status: false
               })
          }
     }

     //delete category handler 
     async deleteCat(req, res) {
          try {
               const cat = await Category.findById(req.params.id)
                    .populate([{
                         path: 'childCats'
                    }, {
                         path: 'posts'
                    }]);
               // console.log(cat) ;    
               await Course.findOneAndUpdate({ categories: req.params.id }, { $pull: { categories: req.params.id } });

               for (let cate of cat.childCats) {
                    await cate.remove();
               }
               await cat.remove();
               return res.json({ status: true });
          } catch (err) {
               console.log(err);
               return { status: false }
          }
     }
}



module.exports = new CategoryController();
