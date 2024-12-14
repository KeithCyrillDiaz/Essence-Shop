const logger = require("../utils/logger");
const jwt = require('jsonwebtoken');
const configuration = require('../config/dotenv');

const UNAUTHORIZED_ERROR = {
    code: "AUTH_001",  
    message: "Unauthorized access. Please provide a valid Bearer token."
}

const adminAuthentication = async (req, res, next) => {
    try {
        logger.Event("admin token verification");
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
        const decodedToken = jwt.verify(token, configuration.jwt_secret_admin);

        const {key} = decodedToken;

        if(!key) {
            return res.status(401).json(UNAUTHORIZED_ERROR);
        }

        //get the secret key in env
        const {secretKey} = configuration;
        //compare if key are same
        if(key !== secretKey) {
            return res.status(401).json(UNAUTHORIZED_ERROR);
        }

        logger.Success("User is Authenticated");
        //to proceed to the next function
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = adminAuthentication;