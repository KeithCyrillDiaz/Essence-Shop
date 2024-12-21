const { updateRevenueCount} = require("../controllers/counter/revenueCounterController");
const { updateUserCount} = require("../controllers/counter/userCounterController");
const userAuthentication = require("../middleware/userAuthentication");

module.exports = (router) => {

    //authentication
    // router.use('/user', userAuthentication);


    //protected Routes
    //user
    router.patch('/user/count/update', updateUserCount);
    router.patch('/user/revenue/update', updateRevenueCount);


}