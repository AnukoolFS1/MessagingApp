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
    

    console.log(user)
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
        const user = await users.findOne({ email });

        if (user === null) {
            return res.status(404).json('no user found')
        }

        const isPassword = await bcrypt.compare(password, user.password)

        if (isPassword) {
            return res.status(200).json('login successful');
        }
        res.end()
    }
    catch {
        console.error('some went wrong')
        res.status(500)
        res.end('some went wrong')
    }

}

module.exports = {
    registerUser,
    loginUser
}