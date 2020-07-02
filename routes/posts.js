const router = require('express').Router()
const verify = require('./verifyToken');
const Day = require('../models/Day');


router.get('/', verify, async (req,res) =>{
    
})

router.post('/postOne', verify, async (req, res) => {

    /*
        req.body will have current date, User id somewhere here
        1. Check to see if the current a day object with the current date exists CROSS ref UserID
            if not{
                create a new day object with the current date
            }else{
                update the day object by adding +1 to the tomato
            }

    */
    try {
        const dayExists = await Day.findOne({ UserID: req.username._id, Day: "July 1 2020" })
        if(!dayExists){
            const post = new Day({
                tomato: 0,
                Day: req.body.curDate,
                UserID: req.username._id
            })
            const savedPost = await post.save();
        }else{
            dayExists.tomato += 1;
            const savedPost = dayExists.save();
            res.send({message: 'Updated 1'});
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/post', async (req,res) =>{
    
    const post = new Day({
        tomato: 0,
        Day: 'July 1 2020',
        UserID: '5efa58c784ac2c1304de72a7'
    })

    try {
        const savedPost = await post.save();
        res.send(savedPost);
    } catch (error) {
        res.status(400).send(error)
        
    }
})



module.exports = router;
