const router = require('express').Router()
const User = require('../models/User');
const schema = require('../validation/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    // validate data
    const { error } = schema.validate(req.body)
    if (!error) {

        // Check if username exists in database
        const userExists = await User.findOne({ username: req.body.username });
        if (userExists) {
            return res.status(400).send('User exists')
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const user = new User({
            username: req.body.username,
            password: hashPassword
        })

        // Save user to database
        try {
            const savedUser = await user.save()
            res.send(savedUser)
        } catch (error) {
            res.status(400).send(error)
        }
    } else {
        res.status(400).send(error.details);
    }
})

router.post('/login', async (req, res) => {

    // validate data
    const { error } = schema.validate(req.body);
    if (!error) {

        const user = await User.findOne({ username: req.body.username });
        //Check if username exists in database
        if (!user) {
            res.status(400).send('Username doesnt exist');
        }
        //Check password
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            res.status(400).send('Password doesnt exist');
        } else {
            //Create and sign a token
            const token = jwt.sign({
                _id: user._id
            },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: 60 * 15
                });
            let currentDate = new Date();
            let expiryDate = new Date(currentDate.getTime() + (60 * 60 * 1000));
            res.header('auth-token', token).json({ token: token, expiresIn: expiryDate, username: req.body.username })
        }

    } else {
        res.status(400).send(error.details)
    }
})

module.exports = router;