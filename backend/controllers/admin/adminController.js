const configuration = require('../../config/dotenv');
const logger = require('../../utils/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel')


const loginAdmin = async (req, res, next) => {
    try {

        logger.Event("login Admin Started");
        const {username, password} = req.body;

        if(!username || !password) {
            return res.status(400).json({
                code: 'LIA_ 001',
                message: "Invalid Request"
            })
        }

        const {admin_pass, admin_user, secretKey, jwt_secret_admin} = configuration;

        if(username !== admin_user || password !== admin_pass) {
            return res.status(401).json({
                code: 'LIA_002',
                message: "Username or password is incorrect"
            })
        }

        const token = jwt.sign(
            {key: secretKey},
            jwt_secret_admin,
            {expiresIn: '1h'}
        )

        logger.Success("Sucessfully Log In in admin");

        return res.status(200).json({
            code: 'LIA_000',
            message: "User Successfully Login to admin",
            token
        })

    } catch (error) {
        next(error);
    }
}


const getAllUsers = async (req, res, next) => {
    try {
        logger.Event("Getting All Users");
        const result = await User.find();

        if(result.length === 0) {
            return res.stats(404).json({
                code: 'AGTU_001',
                message: "No Users are registered in Essence Shop Yet"
            })
        }
        logger.Success("Successfully Fetched Users");

        return res.status(200).json({
            code: 'AGTU_000',
            message: "Successfully Fetched Users",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

// const updateUserById = async (req, res, next) => {
//     try {
//         logger.Event("Update User By ID Started");
//         const {

//         }
//     } catch (error) {
//         next(error)
//     }
// }


module.exports = {
    loginAdmin,
    getAllUsers,
    // updateUserById,
}