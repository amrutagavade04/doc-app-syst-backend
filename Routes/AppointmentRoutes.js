const express =  require('express')
const appointmentController = require('../Controller/appointmentController')

const {auth, doctor} = require('../Middleware/auth')

const router = express.Router()

router.post('/createAppoint', auth, appointmentController.createAppointment)

router.patch('/statusUpdtedByDoctor/:ID', auth, doctor, appointmentController.statusUpdateByDoctor)

router.put('/updateAppoint/:ID', auth ,appointmentController.updateAppointment )

router.delete('/deleteAppoint/:ID', auth, appointmentController.deleteAppointment)

router.get('/getAppointmentsByUser', auth, appointmentController.getAppointmentsByUser)

router.get('/showAppointmentsOfDoctor', auth ,doctor, appointmentController.showAppointmentsOfDoctor) 



// get appontments by query 



module.exports = router