const configuration = require('../../config/dotenv');
const logger = require('../../utils/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



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

        return res.status(200).json({
            code: 'LIA_000',
            message: "User Successfully Login to admin",
            token
        })

    } catch (error) {
        next(error);
    }
}


module.exports = {
    loginAdmin
}