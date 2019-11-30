const mongoose    = require('mongoose');
const Schema      = mongoose.Schema ;
const slugUrl = require('mongoose-url-slugs') ;

const cateSchema = new Schema({

    name : {type  : String  , required : true  } ,
    parent :{type : Schema.Types.ObjectId  , ref : 'categories'  , default:null },
    slug : {type:String , required:true , unique:true  }
   
} , {timestamps : true  , toJSON : { virtuals:true }}) ;

cateSchema.plugin(slugUrl('slug',{ field :'slug' }));

cateSchema.virtual('childCats' , {
 
    ref : 'categories',
    foreignField : 'parent',
    localField : `_id` 

});


cateSchema.virtual('posts' , {
 
    ref : 'courses',
    foreignField : 'categories',
    localField : `_id` 

});

module.exports = mongoose.model('categories' , cateSchema );
