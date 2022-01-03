const User = require('../models/authModel')
const messegeModel = require('../models/messengerModel')
const formidable = require('formidable')
const fs = require('fs')

module.exports.getFriends = async(req,res) =>{
    const myId = req.myId
    //console.log(myId)
    try {
        //mongodbからuserDataを取得。
        const friendsGet = await User.find({})
        // 自分以外のuserのみを抽出する。
        const filter = friendsGet.filter(d => d.id !== myId)
        res.status(200).json({ success: true, friends: filter })
    } catch (error) {
        res.status(500).json({ error: { errorMessage: "Iternal server error."}})
    }
}

module.exports.messegeUploadDB = async(req,res) =>{
    const { senderName, reserverId, messege } = req.body
    const senderId = req.myId

    try {
        const insertMessege = await messegeModel.create({
            senderName: senderName,
            senderId: senderId,
            reserverId: reserverId,
            messege: {
                text: messege,
                image: ""
            }
        })

        res.status(201).json({
            success: true,
            messege: {
                senderName: senderName,
                senderId: senderId,
                reserverId: reserverId,
                messege: {
                    text: messege,
                    image: ''
                }
            }
        })
    } catch (error) {
        res.status(500).json({ error: {errorMessage: "Iternal Server error."}})
    }
};

module.exports.messegeGet = async(req,res)=>{
    const myId = req.myId
    const fdId = req.params.id

    try {
        let getAllMessege = await messegeModel.find({})
            getAllMessege = getAllMessege.filter(m => m.senderId === myId
                && m.reserverId === fdId || m.reserverId === myId && m.senderId === fdId)

        res.status(200).json({
            success: true,
            messege : getAllMessege
        })
        console.log(getAllMessege)
    } catch (error) {
        res.status(500).json({ error: { errorMessege: "Iternal server error."}})
    }
}

module.exports.imageMessegeSend = (req,res) =>{
    const form = formidable()
    const senderId = req.myId

    form.parse(req,(err,fields,files) =>{

        const { senderName, imageName, reserverId } = fields
        // もしかしたらこれもmode_modulesの問題かも. 一旦消去してまたinstallし直す。
        const newPath = __dirname + `../../../Frontend/public/image/${imageName}`
        files.image.name = imageName

        console.log(files.image.path)

        try {
            fs.copyFile(files.image.path,newPath,async(err) =>{
                if(err){
                    console.log(err)
                    res.status(500).json({ error: {errorMessege: "Error."} })
                }else{
                    const insertMessege = await messegeModel.create({
                        senderName: senderName,
                        senderId: senderId,
                        reserverId: reserverId,
                        messege: {
                            text: '',
                            image: files.image.name
                        }
                    })
                    res.status(201).json({
                        success: true,
                        messege: {
                            senderName: senderName,
                            senderId: senderId,
                            reserverId: reserverId,
                            messege: {
                                text: '',
                                image: imageName
                            }
                        }
                    })
                    console.log('okay')
                }
            })
        } catch (error) {
            res.status(500).json({error: {errorMessege: "Iternal Server error."}})
        }
    })
}