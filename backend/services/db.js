const getDB = () => {
    let pgp = null;
    let db = null;

    return function() {
        if (db) return db;

        pgp = require('pg-promise')({});
        db = pgp({
            host: 'localhost',
            port: 5432,
            database: 'blog',
            user: 'postgres',
            password: 987,
        })

        return db;
    }
}

module.exports = getDB();