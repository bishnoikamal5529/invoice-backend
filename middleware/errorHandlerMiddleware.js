const errorHandlerMiddleware = (err, req, res, next) => {
    let statusCode = 500;
    console.log(err.name);
    switch (err.name) {
        case 'ValidationError':
            statusCode=400
            break;
        case 'CastError':
            statusCode=400
            break;
        case 'DocumentNotFoundError':
            statusCode=404
            break;
        case 'MongooseError':
            statusCode=409
            break;

        default:
            statusCode=404
            break;
    }
    res.status(statusCode).json({"msg" : err.message});
};

module.exports = errorHandlerMiddleware;