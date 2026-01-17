const express = require('express')
const app = express()
require('dotenv').config()
const UserRoutes = require('./Routes/UserRoutes')
const AppointmentRoutes = require('./Routes/AppointmentRoutes')
const cors = require('cors')
const path = require('path')
const DoctorRoutes = require('./Routes/DoctorRoutes')


const {testConnection} = require('./config/db')
testConnection()
const port = process.env.port || 7000

app.use(express.json())
app.use(cors())

app.use('/api/user', UserRoutes)
app.use('/api/appointment', AppointmentRoutes)
app.use('/uploads', express.static(path.join(__dirname ,'uploads')))
app.use('/api/doc', DoctorRoutes)

app.listen(port,()=>{
    console.log(`we are running at port ${port}`)
})
// {"name":"admin", "email":"admin@gmail.com"," password":"admin","contactNumber":"7476783887", "address":"pune"} 