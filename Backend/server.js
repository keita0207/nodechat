const express = require('express')
const app = express()
const dotenv = require('dotenv')
const databaseConnect = require('./config/database')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRoutes')
const messengerRoute = require('./routes/messengerRoute')

// app.jsの記述する順番が特に重要！！！

// Backend server port
const PORT = process.env.PORT || 5000

dotenv.config({
    path: "backend/config/config.env"
})
databaseConnect();

//  express.json() needs to be used before specifying route path.
app.use(express.json())
app.use(cookieParser());
app.use('/api/messenger', authRouter)
app.use('/api/messenger', messengerRoute)
// body-parserはdefaultで装備されてるのでimportする必要はもうない。
//app.use(bodyParser())


app.get('/',(req,res) =>{
    res.send('Node.js Chat App')
})

app.listen(PORT, () =>{
    console.log(`The app is running on: ${PORT}`)
})

