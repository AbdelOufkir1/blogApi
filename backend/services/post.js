const db = require('./db')();

const postServices = {};

postServices.createPost = (authorId, title, body) => {

    return db.none(`INSERT INTO posts (author, title, body) VALUES (${authorId}, ${title}, ${body})`)
}

postServices.getPost = (id) => {

    return db.one(`SELECT author, body, title FROM posts WHERE posts.id = ${id}`) ;
}

postServices.updatePost = (id, title, body) => {

    return db.none(`UPDATE posts SET title = ${title}, body = ${body} WHERE posts.id = ${id}`)
}

postServices.deletePost = (id) => {

    return db.none(`DELETE FROM posts WHERE posts.id = ${id}`);
}

postServices.getPostComments = (post_id) => {
    return db.any(`SELECT title, body FROM comments WHERE comments.post_id = ${post_id}`)
} 

postServices.getPostOneComment = (post_id, comment_id) => {
    return db.one(`SELECT title, body FROM comments WHERE comments.post_id = ${post_id} AND comments.comment_id = ${comment_id}`)
}

module.exports = postServices;