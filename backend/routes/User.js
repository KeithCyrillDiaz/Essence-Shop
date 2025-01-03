const { getAllproducts, getBestSellers } = require('../controllers/productController');
const userController = require('../controllers/userControllers');
const emailValidation = require('../middleware/emailValidation');
const userAuthentication = require('../middleware/userAuthentication');

module.exports = (router) => {
    
    router.post('/register', emailValidation, userController.register);
    router.post('/login', userController.login);

    

    router.use('/user', userAuthentication);// apply authentication on '/user' and the routes below gets affected
   

    //protected Routes

    //get
    router.get('/user/getUserProfile', userController.fetchUser);

    //updates
    router.patch('/user/update', userController.updateUserDetails);
    router.patch('/user/updatePassword', userController.updatePassword);
    router.patch('/user/updateStatus', userController.updateUserStatus);
    router.patch('/user/updateAddress', userController.updateUserAddress);


    router.delete('/user/delete', userController.deleteUser);
}