const logger = require('../utils/logger');

require('dotenv').config();

const requiredEnvVariables = [
    'MONGODB_URI_LOCAL',
    'MONGODB_URI_ATLAS',
    'PORT',
    'JWT_SECRET_USER',
    'JWT_SECRET_ADMIN',
    'SECRET_KEY',
    'ADMIN_PASS',
    'ADMIN_USER'
];

const checkEnvVariables = () => {
    requiredEnvVariables.forEach((key) => {
        if (!process.env[key]) {
            logger.Error(`Environment variable ${key} is not defined!`);
            process.exit(1); // Exit the process if a critical variable is missing
        }
    });
};

module.exports = checkEnvVariables;