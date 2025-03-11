const {StatusCodes} = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    const error = new Error("서버에서 오류 발생");
    error.status - StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
};

module.exports = errorHandler;
