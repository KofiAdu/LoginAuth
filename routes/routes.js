const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

router.use(express.json())

//importing the User model 
const User = require('../db/model')

//get all users
router.get('/', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

//add a user
router.post('/', async (req, res) => {
    try {
        //hashing password with bcryt which is async
        const salt = await bcrypt.genSalt()//getting salt(default 10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)//bcrypt needs salt and password to hash a password

        //creating a new user
        const user = new User({
            username: req.body.username,
            password: hashedPassword
        })
        user.save()
        res.status(201).send('User added')
    } catch {
        res.status(500).send()
    }
})

router.post('/:login', async (req, res) => {
    //finding a user to login
    const user = User.find(user => user.username == req.body.username)
    if (user == null) {
        res.status(400).send('User does not exist')
    }

    try {
        if (bcrypt.compare(req.body.password, user.password)) {
            res.status(200).send('User logged in successfully')
        } else {
            res.send('User not logged')
        }
    } catch {
        res.status(500).send("Login unsuccessful")
    }
})
module.exports = router
