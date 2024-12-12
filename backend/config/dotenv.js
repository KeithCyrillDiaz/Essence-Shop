require('dotenv').config();

const configuration = {
    MongoDB_URL_Local: process.env.MONGODB_URI_LOCAL,
    MongoDB_URL_Atlas: process.env.MONGODB_URI_ATLAS,
    port: process.env.PORT || 3000,
}

module.exports = configuration;