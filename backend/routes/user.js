const express = require('express');
const userRouter = express.Router();
const userService = require('../services/user');
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');
const {checkForToken} = require('../middleware/tokenChecker')
 
userRouter.post('/', (req, res) => {
    const {username, email, password} = req.body;

    console.log('in Post');

    bcrypt.hash(password, 10)
        .then(function(hash) {
            console.log(hash)
            return userService.createUser(username, email, hash);     
        }) 
        .then(() => {
            console.log('out of bcrypt')
            res.json({
                'success': `username ${username} created successfully`
            })
        })
        .catch((err) => {
            console.log('Am I here?')
            res.json(err.toString())
        })
})


userRouter.get('/:id', (req, res) => {
    const {id} = req.params;

    userService.readUser(id)
        .then((data) => {
            res.json(data);
        },err => {
            console.log('error is HERE: ', err )
        })
        .catch(err => {
            res.json(err.toString());
        })
});

userRouter.put('/:id', checkForToken, (req, res)=> {
    const {id} = req.params;
    const {username, email, password} = req.body;

    userService.updateUser(id, username, email, password)
        .then(() => {
            res.json({
                'success':`username with id number:${id} has been updated`
            })
        })
        .catch(err => {
            res.json(err.toString());
        })
})

userRouter.delete('/:id', checkForToken, (req, res) => {
    const {id} = req.params;

    userService.deleteUser(id)
        .then(() => {
            res.json({'success': `username with id#: ${id} has been deleted`})
        },err => {
            console.log(err);
        })
        .catch(err => {
            res.json(err.toString());
        })
})


userRouter.get('/:id/posts', (req, res) => {
    const {id} = req.params;
    
    userService.readPosts(id)
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.json(err.toString());
        })
})

userRouter.get('/:id/comments', (req, res) => {
    const {id} = req.params;

    userService.readComments(id)
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.json(err.toString());
        })
})


userRouter.get('/:id/comments/:comments_id', (req, res) => {
    const {id, comment_id} = req.params;

    userService.readcomment(id, comment_id)
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.json(err.toString());
        })
})


userRouter.post('/login', (req, res) => {
    const {username, password} = req.body;

    userService.login(username)
        .then((data)=> {
            console.log(data.username)
            if (!data.username) {
                throw new Error('user not found')
                }
            return bcrypt.compare(password, data.password)
            })
        .then((response) => {
            if (!response) {
                throw new Error('wrong password, try again!')
                }
            else {
                 userService.injectToken(username, uuidv1())
                    .then(() => {
                        console.log('token generated');
                    }
                    ,err => {
                        console.log('err inside token', err);
                    })
                res.json({
                'msg': `welcome back ${username}`
                    })
                }
            })
        .catch(err => {
            // res.json(err.toString())
            res.status(404).json({
                error: 'something went wrong, try again' 
            })
        })
    
})



module.exports = userRouter;