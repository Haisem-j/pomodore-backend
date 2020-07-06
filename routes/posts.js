const router = require('express').Router()
const verify = require('./verifyToken');
const Day = require('../models/Day');


router.post('/', verify, async (req, res) => {
    /*
        This route will be called when user first logs in and everytime a user finishes 25min.
        1. Check to see if current day exists
        Userid will be in req.username coming from the verify()
        Date will be coming from req.body.curDate
        if exists{
            send current date tomatos
        } else{
            create new day object
        }

    */

    try {
        const dayExists = await Day.findOne({ UserID: req.username._id, Day: req.body.curDate })
        const allDays = await Day.find({ UserID: req.username._id })

        let allDates = [];
        if (dayExists && allDays) {
            allDays.map(item => {
                allDates.push({
                    tomato: item.tomato,
                    Day: item.Day
                })
            })
            let finalDates = allDates.filter(item => item.Day !== req.body.curDate)
            res.send({ tomatos: dayExists.tomato, allDays: finalDates })
        } else if (!dayExists && allDays) {
            allDays.map(item => {
                allDates.push({
                    tomato: item.tomato,
                    Day: item.Day
                })
            })
            let finalDates = allDates.filter(item => item.Day !== req.body.curDate)
            res.send({ tomatos: 0, allDays: finalDates })
        }else{
            res.send({ tomatos: 0, allDays: [] })
        }
    } catch (error) {
        res.status(400).send(error)
    }
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
        const dayExists = await Day.findOne({ UserID: req.username._id, Day: req.body.curDate })
        if (!dayExists) {
            const post = new Day({
                tomato: 1,
                Day: req.body.curDate,
                UserID: req.username._id
            })
            const savedPost = await post.save();
            res.send({ message: 'Updated 1' });
        } else {
            dayExists.tomato += 1;
            const savedPost = dayExists.save();
            res.send({ message: 'Updated 1' });
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/testPost', async (req, res) => {

    const post = new Day({
        tomato: 0,
        Day: '05/07/2020',
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
