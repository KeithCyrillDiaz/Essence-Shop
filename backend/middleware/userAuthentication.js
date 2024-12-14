const jwt = require('jsonwebtoken');
const configuration = require('../config/dotenv');
const logger = require('../utils/logger');

const UNAUTHORIZED_ERROR = {
    code: "AUTH_001",  
    message: "Unauthorized access. Please provide a valid Bearer token."
}

const userAuthentication = async (req, res, next) => {
    try {
        logger.Event("token verification");
        //initialize headers authorizartion
        const authorizationHeader = req.headers.authorization;
        
        //Validate if authorization Header is existing and if token starts with Bearer
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            logger.Error("Authorization token is missing or invalid.");
            res.status(401).json(UNAUTHORIZED_ERROR);
            return;
        }

        //Extract the token using .split and making the index to 1 since .split create a new array
        const token = req.headers.authorization.split(' ')[1];

        //check if token is existing
        if(!token) {
            logger.Error("Authorization token is missing or invalid.");
            res.status(401).json(UNAUTHORIZED_ERROR);
            return;
        }

        //token validation using jwt
        const decodedToken = jwt.verify(token, configuration.jwt_secret_user);

        //if valid the userId came from the login controller will be added in req.userId
        req.userId = decodedToken.userId;

        logger.Success("User is Authenticated");
        //to proceed to the next function
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = userAuthentication;