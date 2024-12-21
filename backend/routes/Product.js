const { createProduct, getProduct, getProductsById, updateProductById, deleteProductById, getBestSellers, getAllproducts } = require("../controllers/productController");

module.exports = (router) => {

    router.get('/products/getAllProducts', getAllproducts);
    router.get('/products/getBestSellers', getBestSellers);
    //protected routes
    router.post('/user/products/create', createProduct);

    router.get('/user/products/get', getProduct);
    router.get('/user/products/getById/:id', getProductsById);

   

    router.patch('/user/products/update/:id', updateProductById);

    router.delete('/user/products/delete/:id', deleteProductById);
    

}