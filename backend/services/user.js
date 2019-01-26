const db = require('./db')();
const userServices = {};

userServices.readUser = (id) => {
    console.log('you are in the userservices');
    return db.one(`SELECT username, email FROM users WHERE users.id =${id}; `)
}

userServices.createUser = (name, email, password) => {
    return db.none(`INSERT INTO users (username, email, password) VALUES ('${name}', '${email}', '${password}')`)
}

userServices.updateUser = (id, name, email, password) => {
    return db.none(`UPDATE users SET username = '${name}', email = '${email}', password = ${password}' WHERE users.id = ${id}`)
}

userServices.deleteUser = (id) => {
    return db.none(`DELETE FROM users WHERE users.id = ${id}`)
}

userServices.readPosts = (id) => {
    return db.any(`SELECT title, body FROM posts WHERE posts.author = ${id}`)
}

userServices.readComments = (id) => {
    return db.any(`Select body FROM comments WHERE comments.author = ${id}`)
}

userServices.readComment = (authorId, commentID) => {
    return db.any(`SELECT body FROM comments WHERE comments.author = ${authorId} AND comments.id = ${commentID}`)
}

userServices.login = (username) => {
    return db.one(`SELECT username, password FROM users WHERE users.username = '${username}'`)

}

userServices.injectToken = (username, token) => {
    console.log('token going to db ', token)
    return db.none(`UPDATE users set token = '${token}' WHERE users.username = '${username}'`)
}


module.exports = userServices;
