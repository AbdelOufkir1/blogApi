const express = require('express');
const commentRouter = express.Router();
const commentServices = require('../services/comment');
const {checkForToken} = require('../middleware/tokenChecker')

commentRouter.post('/', checkForToken, (req, res) => {
    const {authorId, post_id, title, body} = req.body;

    commentServices.createComment(authorId, post_id, title, body)
        .then(() => {
            res.json({
                'msg':'comment successfully created'
            })
        })
        .catch(err => {
            res.json(err.toString());
        })
})

commentRouter.get('/:comment_id', (req, res) => {
    const {comment_id} = req.params;

    commentServices.getComment(comment_id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err.toString());
        })
})

commentRouter.put('/:comment_id', checkForToken, (req, res) => {
    const {comment_id} = req.params;
    const {title, body} = req.body;

    commentServices.updateComment(comment_id, title, body)
        .then(() => {
            res.json({
                'msg': `comments titled ${title} has been updated`
            })
        })
        .catch(err => {
            res.json(err.toString())
        })

})

commentRouter.delete('/:comment_id', checkForToken, (req, res) => {
    const {comment_id} = req.params;

    commentServices.deleteComment(comment_id)
        .then(() => {
            res.json({
                'msg': `comment deleted successfully`
            })
        })
        .catch(err => {
            res.json(err.toString())
        })
})

module.exports = commentRouter;