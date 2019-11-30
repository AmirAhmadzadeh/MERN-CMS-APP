
const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const bcrypt     = require('bcryptjs');


const episodeSchema = new Schema({

    
    course:{ type : Schema.Types.ObjectId , ref : 'courses' , required:true  },
    // episode:{ type : Schema.Types.ObjectId  , ref: 'episodes'  , default : null } ,
    videoUrl:{   type:String  , required : true } ,
    title:{  type : String ,  required:true  },
    body:{   type : String ,  required:true   },
    type:{   type : String ,  required:true  }  ,
    number:{ type : String , required:true },
    time : { type : String , default : '00:00:00' },
    viewCount :{ type : Number , default : 0 },
    downloadCounter : {type : Number ,default:0 } ,
    commentCount : { type : String , default : 0 },
    

},{timestamps:true  , toJSON : {  virtuals : true  }});

episodeSchema.virtual('comments',{
    
        ref : 'comments' , localField : `_id` , foreignField : 'episode' 
 });


episodeSchema.methods.getDownloadLink =  function() {
  
 
      let  timeStamps = new Date().getTime() + 1000 * 60 * 60  ;
      let  txt    = `#%#JCAc^^%$#gk%%#*ckncnCSD#%&DFncskc_9${timeStamps}${this._id}`
      let  salt   =   bcrypt.genSaltSync(15)  ;
      let  hash  = bcrypt.hashSync(txt,salt) ;
      return `/download/${this._id}?seqHash=${hash}&t=${timeStamps}` ;       
}

module.exports =  mongoose.model('episodes',episodeSchema) ;