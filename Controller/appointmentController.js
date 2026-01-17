const Appointment = require("../models/Appointmentmodel")

async function createAppointment(req, res) {
  try {
    console.log(req.body)
    const { dateTime, doctorId } = req.body
    const createdBy = req.user.id
    const newAppoint = await Appointment.create({ dateTime, doctorId, createdBy })
    console.log(newAppoint)
    if (!newAppoint) {
      res.status(200).send({ msg: "appointment not created", success: false })
    }
    res.status(200).send({ msg: "appointment created successfully", success: true })
  } catch (error) {
    res.status(500).send({ msg: "server error" })
  }
}

async function statusUpdateByDoctor(req, res) {
  const { ID } = req.params
  console.log(ID, "---------id---")
  try {
    const updatedAppointment = await Appointment.update({
      status: req.body.status,
      updatedBy: req.user.id
    }, {
      where: { id: ID }
    })
    console.log(updatedAppointment, "updatedAssignment")
    if (updatedAppointment.length == 0) {
      req.status(200).send({ msg: "Appointment not updated", success: false })
    }
    res.status(200).send({ msg: "appointment status updted successfully", success: true })
  } catch (error) {
    res.status(500).send({ msg: "server error" })
  }
}

async function updateAppointment(req, res) {
  try {
    const { ID } = req.params;
    const { dateTime, doctorId } = req.body;

    console.log(ID, req.body, "update appointment");
    const updatedAppointment = await Appointment.update(
      {
        dateTime,
        doctorId,
        updatedBy: req.user.id,
      },
      {
        where: { id: ID },
      }
    );
    console.log(updateAppointment)
    if (updatedAppointment[0] === 0) {
      return res.status(200).send({ msg: "Appointment not updated", success: false });
    }
    res.status(200).send({ msg: "Appointment updated successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Server error", success: false });
  }
}

async function deleteAppointment(req, res) {
  try {
    const { ID } = req.params;

    console.log(ID, "delete appointment");

    const deleted = await Appointment.destroy({
      where: { id: ID },
    });
if (!deleted) {
      return res.status(200) .send({ msg: "Appointment not deleted", success: false });
    }

    res .status(200).send({ msg: "Appointment deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Server error", success: false });
  }
}

async function getAppointmentsByUser(req, res) {
  try {
    const appointments = await Appointment.findAll({
      where: { createdBy: req.user.id }
    })
    if (appointments.length == 0) {
      res.status(400).send({ msg: "No appointments yet" })
    }
    res.status(200).send({ appointments: appointments, success: true });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
}

async function showAppointmentsOfDoctor(req, res) {
  try {
    const appointments = await Appointment.findAll({
      where: { doctorId: req.user.id }
    })
    if (appointments.length == 0) {
      res.status(400).send({ msg: "no appointments yet" })
    }
    res.status(200).send({ appointment: appointments, success: true })
  } catch (error) {
    res.status(500).send({ msg: "server error" })
  }
}

module.exports = {
  createAppointment, statusUpdateByDoctor, updateAppointment, deleteAppointment, getAppointmentsByUser, showAppointmentsOfDoctor
}