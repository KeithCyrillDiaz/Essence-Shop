const userController = require('../controllers/userControllers');
const emailValidation = require('../middleware/emailValidation');
const userAuthentication = require('../middleware/userAuthentication');

module.exports = (router) => {
    router.post('/user/register', emailValidation, userController.register);
    router.post('/user/login', userController.login);

    router.use('/user', userAuthentication);// apply authentication on '/user' and the routes below gets affected
   

    //protected Routes

    //get
    router.get('/user/getUserProfile', userController.fetchUser);

    //updated
    router.patch('/user/update', userController.updateUserDetails);
    router.patch('/user/updatePassword', userController.updatePassword);

    router.delete('/user/delete', userController.deleteUser);
}