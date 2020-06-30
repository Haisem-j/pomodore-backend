const router = require('express').Router()
const User = require('../models/User');
const schema = require('../validation/validation');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {

    // validate data
    const { error } = schema.validate(req.body)
    if(!error){
        
        // Check if username exists in database
        const userExists = await User.findOne({username: req.body.username});
        if(userExists){
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
    }else{
        res.status(400).send(error.details);
    }



})


router.post

module.exports = router;