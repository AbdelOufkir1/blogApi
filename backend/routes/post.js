const express = require('express');
const postRouter = express.Router();
const postServices = require('../services/post');
const {checkForToken} = require('../middleware/tokenChecker')

postRouter.post('/post', checkForToken, (req,res) => {
    const {auid, title, body} = req.body;

    postServices.createPost(auid, title, body)
        .then(() => {
            res.json({
                'success':`post ${title} created successfully`
            })
        })
        .catch(err => {
            res.json(err.toString());
        })
})

postRouter.get('/:post_id', (req, res) => {
    const {post_id} = req.params;

    postServices.getPost(post_id)
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.json(err.toString());
        })
})

postRouter.put('/:post_id', checkForToken, (req, res) => {
    const {post_id} = req.params;
    const {title, body} = req.body;

    postServices.updatePost(post_id, title, body)
        .then(() => {
            res.json({
                'success': `user with id#${post_id} has successfully updated ${title}'s post`
            })
        })
        .catch((err) => {
            res.json(err.toString());
        })
})

postRouter.delete('/:post_id', checkForToken, (req, res) => {
    const {post_id} = req.params;

    postServices.deletePost(id)
        .then(() => {
            res.json({
                'msg':`post with id:${post_id} had been deleted`
            })
        })
        .catch(err => {
            res.json(err.toString());
        })
})


postRouter.get('/:post_id/comments', (req, res) => {
    const {post_id} = req.params;

    postServices.getPostComments(post_id)
        .then(data => {
            res.json(data);
        })
        .catch(err =>{
            res.json(err);
        })
}) 



postRouter.get('/:post_id/comments/:comment_id', (res, req) => {

    const {post_id, comment_id} = req.params;

    postServices.getPostOneComment(post_id, comment_id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })

})

module.exports = postRouter;