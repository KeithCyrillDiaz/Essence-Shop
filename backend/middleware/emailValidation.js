const User = require('../models/userModel');
const logger = require('../utils/logger');


const BAD_REQUEST = {
    code: "REG_001",
    message: "Missing required fields. Please provide all the required information."
}

const emailValidation = async (req, res, next) => {
    try {
        const {email} = req.body;

        logger.Event("Email validation started");

        if(!email) {
            return res.status(400).json(BAD_REQUEST);
        }

        
        const existingEmail = await User.findOne({email});
        if(existingEmail) {
            return res.status(400).json({
                code: 'REG_002',
                message: "Email already in use"
            })
        }
        logger.Success("Email is valid");
        next();
    
    } catch (error) {
        next(error);
    }
}

module.exports = emailValidation;