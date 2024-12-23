const { loginAdmin, getAllUsers } = require("../controllers/admin/adminController");
const { getRevenueCount } = require("../controllers/counter/revenueCounterController");
const { getUserCountData } = require("../controllers/counter/userCounterController");
const adminAuthentication = require("../middleware/adminAuthentication");


module.exports = (router) => {
    router.post('/admin/login', loginAdmin);

    //authentication
    router.use('/admin', adminAuthentication);

    //protected routes
    //admin
    router.get('/admin/userCount/get', getUserCountData);
    router.get('/admin/revenueCount/get', getRevenueCount);
    router.get('/admin/users/get', getAllUsers)
}