const { getOrders, createOrder } = require("../controllers/orderController");
const userAuthentication = require("../middleware/userAuthentication")


module.exports = (router) => {
    router.use('/order', userAuthentication); //apply authentication

    //protected routes
    router.get('/order/get', getOrders);
    router.post('/order/create', createOrder)
}