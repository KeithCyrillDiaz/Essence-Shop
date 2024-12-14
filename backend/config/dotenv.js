require('dotenv').config();

const configuration = {
    MongoDB_URL_Local: process.env.MONGODB_URI_LOCAL,
    MongoDB_URL_Atlas: process.env.MONGODB_URI_ATLAS,
    port: process.env.PORT || 3000,
    jwt_secret_user: process.env.JWT_SECRET_USER,
    jwt_secret_admin: process.env.JWT_SECRET_ADMIN,
    admin_pass: process.env.ADMIN_PASS,
    admin_user: process.env.ADMIN_USER,
    secretKey: process.env.SECRET_KEY,
}

module.exports = configuration;