const { getTotal, updateTotal } = require("../controllers/admin/totalController");
const adminAuthentication = require("../middleware/adminAuthentication");


module.exports = (router) => {
    
    //protected routes
    router.get('/admin/total/get', getTotal);
}