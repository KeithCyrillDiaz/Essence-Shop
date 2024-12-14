
const User = require('../../models/userModel');


const getActiveUsers = async (req, res, next) => {
    try {
        const result = await User.find()
    } catch (error) {
        next(error);
    }
}