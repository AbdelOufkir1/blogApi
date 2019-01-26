const db = require('./db')();

const commentServices = {};

commentServices.createComment = (authorId, post_id, title, body) => {
 
    return db.none(`INSERT INTO comments (author, post_id, title, body) VALUES (${authorId}, ${post_id}, ${title}, ${body})`)
}

commentServices.getComment = (id) => {

    return db.one(`SELECT author, post_id, title, body FROM comments WHERE comments.id = ${id}`) ;
}

commentServices.updateComment = (id, title, body) => {

    return db.none(`UPDATE comments SET title = ${title}, body = ${body} WHERE comments.id = ${id}`)
}

commentServices.deleteComment = (id) => {

    return db.none(`DELETE FROM comments WHERE comments.id = ${id}`);
}


module.exports = commentServices;