
const Controller = require('../Controller');
const Posts = require('../../../../models/Post');

class PostController extends Controller {

  async deletePost(req, res) {
    try {
      const deletedPost = await Posts.findById(req.params.id);
      await deletedPost.remove();
      return res.json({ status: true });
    } catch {
      console.log(`Error in deleting course  ${error}`);
      res.json({ status: false });
    }
  }

  async getAllposts(req, res) {
    const posts = await Posts.find({});
    return res.json({
      data: posts,
      status: true
    })
  };

  async createPost(req, res) {
    console.log('amir is here guyes !!!!!');
    const newPost = new Posts({
      tags: req.body.data.tags,
      file: req.body.data.file,
      body: req.body.data.body,
      title: req.body.data.title,
      user: "5cc0be87f002442cd6f74ff1",
      slug: req.body.data.slug,
      categories: req.body.data.categories
    });
    try {
      await newPost.save();
      res.status({ status: true });
    } catch (error) {
      res.json({ status: false });
    }
  }

}



module.exports = new PostController(); 