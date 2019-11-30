const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugUrl = require('mongoose-url-slugs');






const courseSchema = new Schema({

    user:{   type : Schema.Types.ObjectId , ref : 'users' , required:true  } ,
    title:{  type : String ,  required:true  },
    slug:{ type:String , required :true , unique : true   },
    body:{ type : String ,  required:true   } ,
    type:{  type : String ,  required:true  },
    file:{  type : String ,  required:true  } ,
    price:{type : String ,  required:true  } ,
    tags: {type : String , required:true },
    time : { type : String , default : '00:00:00' },
    viewCount : { type : Number , default : 0 },
    commentCount : { type : String , default : 0 },
    categories:[{
        type : Schema.Types.ObjectId , ref : 'categories'
    }] 
},{timestamps:true   , toJSON :{  virtuals:true }});


courseSchema.plugin(slugUrl('slug', { field: 'slug' }));


courseSchema.methods.setCommentCount = function (l) {

    this.update({ commentCount: l }, (err) => {

        if (err) console.log(`Error in updating the comments count`);
    });
}

courseSchema.methods.setViewCount = function () {

    this.update({
        viewCount: this.viewCount + 1
    }, (err) => {
        if (err) console.log(`error in setViewCount`);
    });
}

courseSchema.virtual('episodes', {
    ref: 'episodes',
    localField: `_id`,
    foreignField: 'course'
});

courseSchema.virtual('comments', {
    ref: 'comments',
    localField: `_id`,
    foreignField: 'course'
});



module.exports = mongoose.model('courses', courseSchema);