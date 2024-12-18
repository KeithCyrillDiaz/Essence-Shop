const { createProduct, getProduct, getProductsById, updateProductById, deleteProductById, getBestSellers, getAllproducts } = require("../controllers/productController");

module.exports = (router) => {
    
    //protected routes
    router.post('/user/products/create', createProduct);

    router.get('/user/products/get', getProduct);
    router.get('/user/products/getById/:id', getProductsById);
    router.get('/user/products/getBestSellers', getBestSellers);
    router.get('/user/products/getAllProducts', getAllproducts)

    router.patch('/user/products/update/:id', updateProductById);

    router.delete('/user/products/delete/:id', deleteProductById);
    

}