const User = require('./UserModel')
const Appointment = require('./Appointmentmodel')

// Patient → Appointment
User.hasMany(Appointment, { foreignKey: 'createdBy' })
Appointment.belongsTo(User, { foreignKey: 'createdBy', as: 'patient' })

// Doctor → Appointment
User.hasMany(Appointment, { foreignKey: 'doctorId' })
Appointment.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor' })

// Updated By → User
Appointment.belongsTo(User, { foreignKey: 'updatedBy', as: 'updatedByUser' })