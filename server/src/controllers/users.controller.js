const User = require('../../models/user.model')
// const { v4: uuidv4 } = require('uuid');


// const { users } = require('../data/data')

module.exports.getUsers = async (req, res) => {
    const users = await User.find()
    res.json({ isSuccess: true, data: users })
}

module.exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        return res.json({
            isSuccess: true,
            data: user,
        })
    }
    return res.json({
        isSuccess: false,
        data: 'User does not exist yet',
    })
}

module.exports.createUser = async (req, res) => {
    const { email, password, firstName, lastName, birthday, gender } = req.body

    if (!email || !password || !firstName || !lastName || !birthday || !gender) {
        return res.json({
            isSuccess: false,
            message: 'Missing required fields',
        });
    }

    const user = await User.findOne({ email })

    if (user) {
        return res.json({
            isSuccess: false,
            message: 'Email was registered',
        })
    }

    const newUser = new User({ ...req.body })

    newUser.save(function (err, doc) {
        if (err) {
            return res.json({
                isSuccess: false,
                message: 'Database error',
            })
        } else {
            return res.json({
                isSuccess: true,
                message: 'User is created',
                data: doc,
            })
        }
    });
}