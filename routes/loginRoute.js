const router = require('express').Router();
const loginController = require('../controllers/loginController');

router.post('/login', loginController.loginController);

router.post('/showAllAdmin', loginController.showAllAdmin);

router.post('/showAdmin', loginController.showAdmin);

router.post('/addAdmin', loginController.addAdmin);

router.put('/updateAdmin', loginController.updateAdmin);

router.delete('/deleteAdmin', loginController.deleteAdmin);


module.exports = router;