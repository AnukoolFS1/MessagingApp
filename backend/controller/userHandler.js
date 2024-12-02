const users = require('../model/users')
const bcrypt = require('bcrypt')

//register user
const registerUser = async (req, res) => {
    const { name, email, phone, role, password } = req.body;
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const user = { name, email, phone, role, password: hashPassword }

    if (!name || !email || !phone || !role || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    

    try{
        const result = await users.create(user)

        res.status(201).json({msg: "user created successfully"})
    }
    catch(err) {
        console.log(err.message)
        res.status(400).json({msg:err.message})
    }
    // res.status(201).json({ msg: "done" })
}

// login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        throw "error"
        const user = await users.findOne({ email });

        if (user === null) {
            return res.status(404).json({msg:'some fields are wrong'})
        }

        const isPassword = await bcrypt.compare(password, user.password)

        if (isPassword) {
            console.log('success')
            return res.status(200).json({msg:'login successful'});
        }else{
            return res.status(404).json({msg:'some fields are wrong'})
        }
    }
    catch {
        console.error('something went wrong')
        res.writeHead(500, {"Content-Type":"application/json"})
        res.end(JSON.stringify({msg:'something went wrong'}))
        // res.status(500).json({msg:"server is unable to perform task"})
    }

}

module.exports = {
    registerUser,
    loginUser
}