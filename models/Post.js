const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugUrl = require('mongoose-url-slugs');

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    required: true
  },
  body: {
    type: String,
    require: true
  },
  file: {
    type: String,
    require: true
  },
  tags: {
    require: true,
    type: String
  },
  viewCount: {
    type: Number,
    default: 0
  },
  // commentCount: {

  // } , 
  categories: [
    {
      ref: 'categories',
      type: Schema.Types.ObjectId
    }
  ]
}, { timestamps: true, toJSON: { virtuals: true } })

postSchema.plugin(slugUrl('slug', { field: 'slug' }));



postSchema.methods.setViewCounter = function () {
  this.update({
    viewCount: this.viewCount
  }, (err) => {
    if (err) console.log('an error ouccured In view Count')
  })
}

module.exports = mongoose.model('posts', postSchema); 