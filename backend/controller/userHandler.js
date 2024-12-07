// userHandler.js
const users = require('../model/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sKey = process.env.JWT_SKey;

//register user
const registerUser = async (req, res) => {
    const { name, email, phone, role, password } = req.body;
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const user = { name, email, phone, role, password: hashPassword }

    if (!name || !email || !phone || !role || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }


    try {
        const result = await users.create(user)

        res.status(201).json({ msg: "user created successfully" })
    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ msg: err.message })
    }
    // res.status(201).json({ msg: "done" })
}

// login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({ email });

        if (user === null) {
            return res.status(404).json({ msg: 'some fields are wrong' })
        }

        const isPassword = await bcrypt.compare(password, user.password);


        if (isPassword) {
            const userData = {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                isOnline: user.isOnline
            }
            const token = jwt.sign(userData, sKey)
            return res.status(200)
                .cookie('token', token, {
                    httpOnly: true,
                    // secure: false, // Use `true` if running on HTTPS
                    // sameSite: 'Lax', // Prevent CSRF
                    maxAge:  60 * 60 * 1000 * 2 // 1 day in milliseconds
                })
                .json({ msg: 'login successful' });
        } else {
            return res.status(404).json({ msg: 'some fields are wrong' })
        }
    }
    catch (err) {
        console.error('something went wrong', err)
        res.writeHead(500, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ msg: 'something went wrong' }))
        // res.status(500).json({msg:"server is unable to perform task"})
    }

}

module.exports = {
    registerUser,
    loginUser
}