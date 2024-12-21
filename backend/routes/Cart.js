const { getCartItems, updateCart, deleteCart } = require("../controllers/cartController")

module.exports = (router) => {

    //protected route
    router.get('/user/cart/get', getCartItems);

    router.patch('/user/cart/updateAndGet', updateCart);

    router.delete('/user/cart/delete' ,deleteCart)
}