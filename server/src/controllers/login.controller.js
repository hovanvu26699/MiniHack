// const { users } = require('../data/data');
const User = require('../../models/user.model')


module.exports.login = async (req, res) => {
    // const { email, password } = req.body
    // const user = users.find(user => user.email === email && user.password === password)

    const { email, password } = req.body
    const user = await User.findOne({ email, password })

    if (user) {
        res.json({ status: 'success' })
    } else {
        res.json({ status: 'error', message: 'Email or password incorrect' })
    }
}