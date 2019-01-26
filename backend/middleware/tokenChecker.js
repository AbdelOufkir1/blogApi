const checkForToken = (request, response, next) => {

    if (!(request.headers['token'])) {
        response.status(401).json({
            'Error': `You haven't logged in YET.`
        });
    }
    next();
}

module.exports = {checkForToken};