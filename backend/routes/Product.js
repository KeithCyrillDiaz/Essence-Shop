const { createProduct, getProduct, getProductsById } = require("../controllers/productController");

module.exports = (router) => {
    router.post('/user/products/create', createProduct);


    router.get('/user/products/get', getProduct);
    router.get('/user/products/getById/:id', getProductsById);
}