const users = require('../model/users')
const bcrypt = require('bcrypt')

//register user
const registerUser = async (req, res) => {
    const { name, email, phone, role } = req.body;
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    const user = { name, email, phone, role, password }
    console.log(user)

    await users.create(user)

    res.end()
}


// login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({ email });

        if (user === null) {
            return res.send('no user found')
        }

        const isPassword = await bcrypt.compare(password, user.password)

        if (isPassword) {
            return res.status(200).send('logged successfully');
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