const mongoose = require('mongoose');
const Schema   = mongoose.Schema ;
const slugUrl = require('mongoose-url-slugs') ;

const menuSchema = new Schema({


   name :{type : String  , required:true},
   link : {type : String  , required:true},
   parent:{type:Schema.Types.ObjectId , ref :'menu' }


}, ({timestamps:true , toJSON:{virtuals:true}}) );


menuSchema.virtual('childMenu' , {
   
    ref : 'menu'  ,
    localField :'_id' ,
    foreignField :'parent'   
});




module.exports = mongoose.model('menu', menuSchema );
