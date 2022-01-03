const io = require('socket.io')(8000,{
    cors: {
        origin: "*",
        methods: ["GET","POST"]
    }
})

let users = [];

const addUser = (userId, socketId, userInfo) =>{
    const checkUser = users.some(u => u.userId === userId)
    if(!checkUser){
        //必ずObject型にする。
        users.push({userId,socketId,userInfo})
    }
}

const userRemove = (socketId) =>{
    users = users.filter(u => u.socketId !== socketId)
}

const findFriend = (id) =>{
    return users.find(u => u.userId === id)
}

io.on('connection',(socket) =>{
    // Frontendとsocket.jsを繋げる。
    console.log("User Connected.")
    socket.on('addUser',(userId,userInfo) =>{
        addUser(userId,socket.id,userInfo)
        // usersを取得。
        io.emit('getUser',users)
    })
    socket.on('sendMessege',(data) =>{
        const user = findFriend(data.reserverId)

        if(user === undefined){
            socket.to(user.socketId).emit('getMessege',{
                senderId: data.senderId,
                reserverId: data.reserverId,
                senderName: data.senderName,
                createdAt: data.time,
                messege: {
                    text: data.messege.text,
                    image: data.messege.image,
                }
            })
        }
        console.log(user)
    })
    // userがactiveかinactiveかどうかの判定
    socket.on('disconnect',() =>{
        console.log('User Disconnected.')
        userRemove(socket.id)
        io.emit('getUser',users)
    })
})