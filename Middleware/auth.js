const jwt = require('jsonwebtoken')
require('dotenv').config()


function auth(req, res, next){

console.log(req.header.authorization,"*****************")
token = req.headers.authorization
if(token.startsWith('Bearer')){
    console.log(token,"-----------token--------")
    token = token.split(' ')[1]
    console.log(token, "after removing bearer")

    decoded = jwt.decode(token, process.env.SECREAT_KEY)
    console.log("----decoded-----", decoded)
    req.user = decoded
    next()
}else{
    res.status(400).send({msg:"auth hearer misisng"})
}
}


function doctor(req,res,next){
    if(req.user.role == 'Doctor'){
        next()
    }else{
        res.status(200).send({msg:"you are not authorized"})
    }
}


function admin(req,res,next){
    if(req.user.role == 'Admin'){
        next()
    }else{
        res.status(200).send({msg:"you are not authorized"})
    }
}

module.exports = {auth, doctor,admin}


