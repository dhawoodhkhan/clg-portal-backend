const router = require('express').Router();
const staffController = require('../controllers/staffController');

router.post('/stafflogin', staffController.staffLogin);

router.post('/showAllStaff', staffController.showAllStaff);

router.post('/showStaff', staffController.showStaff);

router.post('/addStaff', staffController.addStaff);

router.put('/updateStaff', staffController.updateStaff);

router.delete('/deleteStaff', staffController.deleteStaff);


module.exports = router;