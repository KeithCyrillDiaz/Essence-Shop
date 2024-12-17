const { getSales, updateSalesStatus } = require("../controllers/salesController");

module.exports = (router) => {

    //protected routes
    router.get('/user/sales/get', getSales);
    
    //update
    router.patch('/user/sales/updateStatus/:id', updateSalesStatus)

}