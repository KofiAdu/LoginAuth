require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//connecting to databse
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
    console.log('Connected to Database')
})

app.use(express.json())

//importing routes
const userRoute = require('./routes/routes')

//middleware
app.use('/users', userRoute)

app.get('/', (req, res) => {
    res.send("Working")
})
const PORT = 3000

app.listen(PORT,()=> console.log(`Server is listening on port ${PORT}`))