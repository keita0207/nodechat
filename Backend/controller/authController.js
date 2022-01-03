const formidable = require('formidable')
const validator = require('validator')
const registerModel = require('../models/authModel')
const fs = require('fs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// user情報をregisterした際にresponseを返すように設定。
module.exports.userRegister = (req, res) =>{
    const form = formidable();
    form.parse(req,async(err,fields,files) =>{
        const { username, email, password, confirmpassword, image } = fields;
        //const { Image } = files
        console.log(image, username)

        const error = []

        if(!username){
            error.push('Fill out UserName')
        }
        if(!email){
            error.push('Fill out Email')
        }
        /*if(email && !validator.isEmail(email)){
            error.push('Fill out Email')
        }*/
        if(!password){
            error.push('Fill out Password')
        }
        if(!confirmpassword){
            error.push('Fill out UserName')
        }
        if(password && confirmpassword && password !== confirmpassword){
            error.push('The Password and ConfirmPassword are incorrect.')
        }
        if (password.length <= 2) {
            error.push("Please provide 2 charactors at least.")
        }
        /*if(Object.keys(files).length === 0){
            error.push("Please provide user image")
        }*/
        // serverにrequestを送るため、serverからresを返すようにする。
        if(error.length > 0){
            console.log("Error")
            res.status(400).json({ error: { errorMessage: error }})
        }else{
            /*const getImage = files.Image.name
            const randomNumber = Math.floor(Math.random()*99999)

            const newImageName = randomNumber + getImage
            files.Image.name = newImageName

            const newPath = __dirname + `../../../Frontend/public/image/${files.Image.name}`*/

            try {
                const checkUser = await registerModel.findOne({email})
                if(checkUser){
                    res.status(404).json({ error: { errorMessage: "Your Email already exists."}})
                }else{
                    /*fs.copyFile(files.Image.path,newPath,(error) =>{
                        (!error){

                        }
                    })*/
                    const userCreate = await registerModel.create({
                        username,
                        email,
                        password: await bcrypt.hash(password,10)
                    })

                    const token = jwt.sign({
                        id: userCreate._id,
                        email: userCreate.email,
                        username: userCreate.username,
                        registerTime: userCreate.createdAt
                    }, process.env.SECRET,{ expiresIn: process.env.TOKEN_EXP})

                    const options = {
                        expires: new Date(Date.now() + process.env.COOKIE_EXP*24*60*60*1000)
                    }

                    res.status(201).cookie('authToken', token, options).json({
                        successMessage: "Successed Registered.",
                        token
                    })
                    console.log("Register successed.")

                    /*else{
                        res.status(500).json({error: { errorMessage: "Iternal Server Error."}})
                    }*/
                }
            } catch (error) {
                console.log(error)
            }
        }
    })
};

module.exports.userLogin = async(req, res) =>{
    const error = []
    const { email, password } = req.body
    console.log(email, password)

    if(!email){
        error.push("Provide your email")
    }
    if(!password){
        error.push("Proivde your password")
    }
    if(!email && !validator.isEmail(email)){
        error.push("Provide valid email")
    }
    if(error.length > 0){
        res.status(400).json({ error: {errorMessage: error}})
    }
    else{
        try {
            const checkUser = await registerModel.findOne({ email: email }).select('+password')

            if(checkUser){
                const matchedPassword = await bcrypt.compare(password, checkUser.password)

                if(matchedPassword){
                    const token = jwt.sign({
                        id: checkUser._id,
                        email: checkUser.email,
                        username: checkUser.username,
                        registerTime: checkUser.createdAt
                    }, process.env.SECRET,{ expiresIn: process.env.TOKEN_EXP})

                    const options = {
                        expires: new Date(Date.now() + process.env.COOKIE_EXP*24*60*60*1000)
                    }

                    res.status(201).cookie('authToken', token, options).json({
                        successMessage: "Successed Login.",
                        token
                    })
                }else{
                    res.status(400).json({ error : { errorMessage: ['Your password is not valid.']}}) 
                }
            }else{
                res.status(400).json({ error : { errorMessage: ['Your email is not valid.']}})
            }
        } catch (error) {
            //res.status(500).json({ error: { errorMessage: error }})
        }
    }
}
