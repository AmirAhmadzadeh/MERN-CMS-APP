const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },

    comment: { type: String, required: true },

    course: { type: Schema.Types.ObjectId, ref: 'courses' },

    episode: { type: Schema.Types.ObjectId, ref: 'episodes' },

    parent: { type: Schema.Types.ObjectId, ref: 'comments', default: null },

    approved: { type: Boolean, default: false }


}, { timestamps: true, toJSON: { virtuals: true } });



commentSchema.virtual('comments', {
    ref: 'comments',
    localField: '_id',
    foreignField: 'parent'
});


module.exports = mongoose.model('comments', commentSchema);