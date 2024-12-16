const { createProduct, getProduct, getProductsById, updateProductById } = require("../controllers/productController");

module.exports = (router) => {
    
    //protected routes
    router.post('/user/products/create', createProduct);

    router.get('/user/products/get', getProduct);
    router.get('/user/products/getById/:id', getProductsById);

    router.patch('/user/products/update/:id', updateProductById);

    

}