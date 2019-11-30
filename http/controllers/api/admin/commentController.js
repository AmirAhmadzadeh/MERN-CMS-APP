const Controller = require('../../controller');
const Comment = require('../../../../models/Comment');


class CommentController extends Controller {

    async getApprovedComments(req, res) {

        const approvedComments = await Comment.find({ approved: true })

        .populate(
            [{
                    path: 'user ',
                    select: 'email'
                },
                {
                    path: 'course',
                    select: 'slug'

                }
            ]
        );

        return res.json(approvedComments);

    }


    async getDisApprovedcomments(req, res) {
        const disApprovedComments = await Comment.find({ approved: false })
            .populate(
                [{
                        path: 'user ',
                        select: 'email'
                    },
                    {
                        path: 'course',
                        select: 'slug'

                    }
                ]
            );

        return res.json(disApprovedComments);
    }


}



module.exports = new CommentController()