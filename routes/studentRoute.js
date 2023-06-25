const router = require('express').Router();
const studentController = require('../controllers/studentController');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const DIR = '../public/students/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post('/studentlogin', studentController.studentLogin);

router.post('/showAllStudent', studentController.showAllStudent);

router.post('/showStudent', studentController.showStudent);

router.post('/addStudent', studentController.addStudent);

router.put('/updateStudent', studentController.updateStudent);

router.delete('/deleteStudent', studentController.deleteStudent);

router.post('/uploadPicture', upload.single('file'), studentController.uploadPicture);


module.exports = router;