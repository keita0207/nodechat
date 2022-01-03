const { model ,Schema } = require('mongoose')

const messegeSchema = new Schema({
    senderId:{
        type: String,
        required: true
    },
    senderName:{
        type: String,
        required: true
    },
    reserverId:{
        type: String,
        required: true
    },
    messege: {
        text:{
            type: String,
            default: ""
        },
        image:{
            type: String,
            default: ""
        }
    }
},{timestamps: true})

module.exports = model('messege',messegeSchema)