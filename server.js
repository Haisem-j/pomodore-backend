const express = require('express')
const app = express()
const User = require('./models/User');
const Day = require('./models/Day');

const port = 3000




app.get('/', (req, res) => res.send('Hello World!'))

app.post('/user', async (req, res) => {
    const user1 = new User({
        Day: '27/06/2020',
        tomato: 0
    });

    try {
        const savedUser = user1.save();
        res.json({ success: true });
    } catch (err) {
        res.json({ error: err });
    }
})

app.post('/addpost', async (req,res) =>{

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
