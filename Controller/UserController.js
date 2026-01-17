const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

BASEURL = 'http://localhost:7005/uploads/'

const register = async (req, res) => {

    let { name, email, password, contactNumber, address } = req.body
    const imagePath = req.file ? req.file.filename : null;


    console.log("Body:", req.body);
    console.log("File:", req.file);

    try {
        const existingUser = await User.findOne({
            where: { email: email }
        })
        console.log(existingUser)
        if (!existingUser) {
            console.log(password)


            const salt = await bcrypt.genSalt(10)
            hashedpassword = await bcrypt.hash(req.body.password, salt)
            console.log("hashed password", hashedpassword)

            const regUser = await User.create({
                name,
                email,
                password: hashedpassword,
                contactNumber,
                address,
                imagePath,
                role: "User"   // ensure this is provided
            });


            if (!regUser) {
                res.status(400).send({ msg: "not registered", success: false })
            }
            res.status(200).send({ msg: "Register successfully", success: true })
            if (existingUser) {
                res.status(200).send({ msg: "User already exists", success: false })
            }
        }
    } catch (error) {
        res.status(500).send({ msg: "server error" })
    }
}

const login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    try {
        const loggedUser = await User.findOne({
            where: { email: email }
        })
        console.log(loggedUser, "logged user")
        if (!loggedUser) {
            res.status(400).send({ msg: "User not found", success: false })
        }
        if (await bcrypt.compare(password, loggedUser.password)) {
            const payload = { id: loggedUser.id, email: loggedUser.email, role: loggedUser.role }
            const token = jwt.sign(payload, process.env.SECREAT_KEY, { expiresIn: '1d' })
            res.status(200).send({ msg: "Logged in successfully", success: true, token: token })
        } else {
            res.status(400).send({ msg: "Password incorrect", success: false })
        }

    } catch (error) {
        res.status(500).send({ msg: "server error" })
    }
}

const getUserInfo = async (req, res) => {
    console.log(req.user, "In controller")
    try {
        const loggedUser = await User.findByPk(
            req.user.id, {
            attributes: ["id", "name", "email", "address", "role", "imagePath"]
        }
        )
        loggedUser.imagePath = BASEURL + loggedUser.imagePath

        console.log("------------------", loggedUser)
        res.status(200).send({ user: loggedUser, success: true })
    } catch (error) {
        res.status(500).send({ msg: "Server Error" })

    }
}

const doctorList = async (req, res) => {
    console.log(req.user, "In controller")
    try {
        const doctors = await User.findAll({
            where: { role: 'doctor' },
            attributes: ["id", 'name']
        })
        res.status(200).send({ doctors: doctors, success: true })
    } catch (error) {
        res.status(500).send({ msg: "Server Error" })
    }
}


const allUsersList = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "name", "email", "role", "contactNumber"]
        });
        return res.status(200).send({ success: true, users });
    } catch (error) {
        console.error("Server error", error);
        return res.status(500).send({ success: false, msg: "Server Error" });
    }
};



module.exports = { register, login, getUserInfo, doctorList, allUsersList }