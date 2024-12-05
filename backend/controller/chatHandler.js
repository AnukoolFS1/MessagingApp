const jwt = require('jsonwebtoken');

const sKey = process.env.JWT_SKey

const initiateUser = (req, res) => {
    console.log(req.cookies)
    const token = req.cookies?.token;

    if(token){
        const user = jwt.verify(token, sKey)
        res.status(200).json(user)
    }else{
        res.status(403).json({msg:"auth failed"})
    }
}

module.exports = { initiateUser }