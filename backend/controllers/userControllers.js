const configuration = require('../config/dotenv');
const User = require('../models/userModel');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const ERROR_MESSAGES = {
    MISSING_FIELDS: (code) => (
        {
            code: code,
            message: "Missing required fields. Please provide all the required information."
        }
    ),
    EMAIL_ALREADY_EXISTS: {
            code: "REG_002",
            message: "Email already in use. Please use a different email."
        },
    INTERNAL_ERROR: {
        code: "REG_003",
        message: "Internal Server Error. Please try again later."
    },
    USER_NOT_FOUND: (code) => (
        {
            code: code,
            message: "User not found."
        }
    ),
    UNAUTHORIZED_USER: {
        code: 'LOG_002',
        message: "The email or password you entered is incorrect. Please try again."
    },


};



// Register a new user
const register = async (req, res, next) => {
    try {
        logger.Event("User Registration started");

        const { firstName, lastName, gender, birthday, email, mobileNumber, password } = req.body;

        // Input validation - check for missing fields
        if (!firstName || !lastName || !gender || !birthday || !email || !mobileNumber || !password) {
            return res.status(400).json(ERROR_MESSAGES.MISSING_FIELDS('REG_001'));
        }

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
        }

        // password encryption
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            gender,
            birthday,
            email,
            mobileNumber,
            password: hashPassword
        });

        // Save the new user to the database
        const result = await newUser.save();

        if (!result) {
            logger.Error(`User registration failed for ${email}`);
            return res.status(500).json(ERROR_MESSAGES.INTERNAL_ERROR);
        }

        // Registration successful
        logger.Success(`User Registration successful ${result}`);
        return res.status(201).json({ 
            code: 'REG_000',
            message: "User registered successfully",
            data: result
         });

    } catch (error) {
        next(error);
    }
};


//Authenticating the User
const login = async (req, res, next) => {
    try {

        const {email, password} = req.body;

        logger.Event("User Log In started");

        // Input validation - check for missing fields
        if(!email || !password) {
            return res.status(400).json(ERROR_MESSAGES.MISSING_FIELDS('LOG_001'));
        }

        const existingUser = await User.findOne({email}).select('+password');

        if(!existingUser) {
            return res.status(404).json(ERROR_MESSAGES.USER_NOT_FOUND('LOG_001'));
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);

        if(!validPassword) {
            return res.status(401).json(ERROR_MESSAGES.UNAUTHORIZED_USER);
        }

        const token = jwt.sign(
            { userId: existingUser._id },
            configuration.jwt_secret_user,
            { expiresIn: '1w' } // Expires in 1 week
          );

        const fullName = `${existingUser.firstName} ${existingUser.lastName}`

        logger.Success(`${fullName} Log in successfully `);

        return res.status(200).json({
            code: 'LOG_000',
            message: `${fullName} Log in Successfully`,
            token,
            id: existingUser._id
        })

    } catch (error) {
        next(error);
    }
}



const updateUserDetails = async (req, res, next) => {
    try {

        logger.Event("User update details started");

        const { userId } = req; 
        console.log(`user: ${userId}`);
        const updates = req.body; // Expecting key-value pairs of fields to update


        // Validate if updates exist
        if (!updates || typeof updates !== "object" || Object.keys(updates).length === 0) {
            return res.status(400).json(ERROR_MESSAGES.MISSING_FIELDS('UPD_001'));
        }

        //cut the endpoint if the user tries to change the password
        if (updates.password) {
            return res.status(400).json({
                code: 'UPD_002',
                message: 'Password cannot be updated through this endpoint. Please use the "Change Password" feature.'
            });
        }

        // Validate fields and update in one step
        const validUpdates = Object.keys(updates).filter(field => User.schema.paths.hasOwnProperty(field));
        if (validUpdates.length === 0) {
            return res.status(400).json(ERROR_MESSAGES.MISSING_FIELDS('UPD_003'));
        }


        // Update the user
        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
            new: true, // Return the updated document
            runValidators: true, // Ensure updates are validated against the schema
        });

        if (!updatedUser) {
            return res.status(404).json(ERROR_MESSAGES.USER_NOT_FOUND('UPD_004'));
        }

        const {firstName, lastName} = updatedUser

        const fullName = `${firstName} ${lastName}`

        logger.Success(`${fullName} details updated successfully.`);

        return res.status(200).json({
            code: 'UPD_000',
            message: `${fullName} details updated successfully.`,
            data: updatedUser,
        });


    } catch (error) {
        next(error); 
    }
};


const updatePassword = async (req, res, next) => {
    try {
        
        logger.Event('update password started');
        const {userId} = req;
        const {password} = req.body;

        if(!password) {
            return res.status(400).json(ERROR_MESSAGES.MISSING_FIELDS('UPP_001'));
        }

        const user = await User.findById(userId).select('+password');

        if(!user) {
            return res.status(404).json(ERROR_MESSAGES.USER_NOT_FOUND('UPD_002'))
        }

        const isOldPassword = await bcrypt.compare(password, user.password);

        if(isOldPassword) {
            return res.status(400).json({
                code: 'UPP_003',
                message: "You entered your old password. Please input your new password"
            })
        }


        const newPassword = await bcrypt.hash(password, 17);

        user.password = newPassword;

        const result = await user.save();

        if(!result) {
            return res.status(500).json({
                code: 'UPP_004',
                message: "Internal Server Error, please try again later"
            })
        }

        logger.Success('Password Updated Successfully');

        return res.status(200).json({
            code: 'UPP_000',
            message: 'Password Updated Successfully'
        })

    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {

        logger.Event("delete user started");
        const {id} = req.body;

        if(!id) {
            return res.status(400).json(ERROR_MESSAGES.MISSING_FIELDS('DEL_001'));
        }

        const result = await User.findByIdAndDelete(id);

        if(!result) {
            return res.status(404).json(ERROR_MESSAGES.USER_NOT_FOUND('DEL_002'))
        }

        logger.Success(`User deleted successfully `);
        return res.status(200).json({
            code: 'DEL_000',
            message: 'User Deleted successfully',
            result
        })
        
    } catch (error) {
        next(error);
    }
}

const fetchUser = async (req, res, next) => {
    try {

        logger.Event('Fetch User Started');

        const {userId} = req;

        if(!userId) {
            return res.status(401).json(ERROR_MESSAGES.UNAUTHORIZED_USER);
        }

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json(ERROR_MESSAGES.USER_NOT_FOUND('USR_001'));
        }

        logger.Success('User Fetched Successfully');

        return res.status(200).json({
            code: 'USR_000',
            message: 'User Fetched Successfully',
            data: user
        })

    } catch (error) {
        next(error);
    }
}

const  updateUserStatus = async (req, res, next) => {
    try {
        logger.Event("Update User Status Started");

        const {status} = req.body;
        const {userId} = req;
        if(!status) {
            return res.status(400).json({
                code: 'UUS_001',
                message: "status value is missing"
            })
        }

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({
                code: 'UUS_002',
                message: "User Not Found"
            })
        }

        user.status = status;

        const result = await user.save();

        if(!result) {
            return res.status(500).json({
                code: 'UUS_003',
                message: "Something Went Wrong Please Try again"
            })
        }

        logger.Success("Successfully Updated status of the user");

        return res.status(200).json({
            code: 'UUS_000',
            message: "Successfully Updated status of the user"
        })

    } catch (error) {
        next(error);
    }
}


module.exports = { 
    register,
    login,
    updateUserDetails,
    updatePassword,
    deleteUser,
    fetchUser,
    updateUserStatus
};
