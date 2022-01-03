const mongoose = require('mongoose')

// local内でmongodbに接続をする。(mongodb compass)
const databaseConnect = () =>{
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() =>{
        console.log("MongoDB has connected.")
    }).catch((error) =>{
        console.log(`msg: ${error}`)
    })
}

module.exports = databaseConnect;
