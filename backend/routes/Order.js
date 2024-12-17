const { getOrders, createOrder, updateOrderStatus } = require("../controllers/orderController");
const userAuthentication = require("../middleware/userAuthentication")


module.exports = (router) => {
    
    //protected routes
    router.get('/user/order/get', getOrders);
    router.post('/user/order/create', createOrder);

    router.patch('/user/order/updateStatus/:id', updateOrderStatus);
}