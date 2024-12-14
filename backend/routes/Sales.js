const { getSales } = require("../controllers/salesController");
const userAuthentication = require("../middleware/userAuthentication");

module.exports = (router) => {
    router.use('/sales', userAuthentication); //apply authentication

    //protected routes
    router.get('/sales/get', getSales);
}