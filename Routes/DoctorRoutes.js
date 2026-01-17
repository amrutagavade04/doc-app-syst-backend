const express =  require('express')
const {auth, admin} = require('../Middleware/auth')
const DoctorController = require('../Controller/DoctorController')

const router = express.Router()


router.post('/apply', auth, DoctorController.applyDoctor)
router.get('/docStatus/:DoctorID', auth, admin, DoctorController.docStatus)   //update on two tables
// router.get('/getDocInfo', doctorController.getDoctorInfo)
// router.patch('/update/:ID',doctorController.updateDoctor)
// router.delete('/delete/:ID', doctorController.deleteDoctor)



module.exports = router