
const express = require('express');
const UserController = require('../Controller/UserController');
const {auth} = require('../Middleware/auth')
const upload = require('../Middleware/multer')



const router = express.Router();

router.post('/register',upload.single('userImage'), UserController.register);
router.post('/login', UserController.login);
router.get('/getUserinfo',auth, UserController.getUserInfo)
router.get('/doctorlist', UserController.doctorList)
router.get('/users', auth, UserController.allUsersList);
// router.put('updateUser', auth, UserController.updateUser)

module.exports = router;


