const logger = require("./logger");

const errorHandler = (err, req, res, next) => {

    const ERROR_MESSAGE = {
        code: 'ERR_001',
        status: err.status || 500,
        message: err.message,
    }


    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ 
            code: 'AUTH_002',
            message: "Token has expired" 
        });
      }

    logger.Error("Unhandled Error", {
        ERROR_MESSAGE,
        stack: err.stack,
    });

    return res.status(500).json(ERROR_MESSAGE);
}

module.exports = errorHandler;