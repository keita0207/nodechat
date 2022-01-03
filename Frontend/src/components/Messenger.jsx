import React, { useEffect, useState, useRef } from 'react'
import ActiveFriend from './ActiveFriend'
import Friends from './Friends'
import RightSide from './RightSide'
import { useDispatch, useSelector } from 'react-redux'
import { getFriends, messegeSend, getMessege, ImageMessegeSend } from '../store/action/messangerAction'
// react-iconsがnode_modulesとconflictを起こしていて表示が出来ない。
//import { BsThreeDots  } from 'react-icons/all'
import { Link } from "react-router-dom";
import { io } from 'socket.io-client'

const Messenger = () => {
    const { myInfo } = useSelector(state => state.auth)
    const { friends, messege } = useSelector(state => state.messanger)
    const [currentFriend, setCurrentFriend] = useState(''),
          [newMessage, setNewMessage] = useState(''),
          [activeUser, setActiveUser] = useState([]),
          [socketMessege, setSocketMessege] = useState('')

    const scrollRef = useRef();
    const socket = useRef();

    console.log(socket)

    useEffect(() =>{
        // socket.jsで指定したPORT番号
        socket.current = io('ws://localhost:8000')
        socket.current.on('getMessege',(data) =>{
            setSocketMessege(data)
        })
    },[])

    useEffect(() =>{
        if(socketMessege && currentFriend){
            // getMessege? =>messegeが先に送られてきてchat screenを開いた際に、
            // currentFriendのmessegeを表示する。(messegeを受け取る側。)
            if(socket.senderId === currentFriend._id &&
               socket.reserverId === myInfo.id){
                   dispatch({
                       type: "SOCKET_MESSEGE",
                       payload: {
                           messege: socketMessege
                       }
                   })
               }
        }
    },[socketMessege])

    useEffect(() =>{
        socket.current.emit('addUser',myInfo.id,myInfo)
    },[])

    useEffect(() =>{
        socket.current.on('getUser',(users) =>{
            // socketで接続されているuserのみをsetActiveUserに渡す。
            const filteredUser = users.filter(u => u.userId !== myInfo.id)
            setActiveUser(filteredUser)
        })
    },[])

    const dispatch = useDispatch();

    const inputHandle = (e) =>{
        setNewMessage(e.target.value)
    }

    const sendMessage = (e) =>{
        e.preventDefault();
        const data = {
            senderName: myInfo.username,
            reserverId: currentFriend._id,
            messege: newMessage ? newMessage : '❤'
        }

        // socket.jsのsendMessege()に転送。
        socket.current.emit('sendMessege',{
            senderId: myInfo.id,
            senderName: myInfo.username,
            reserverId: currentFriend._id,
            time: new Date(),
            messege: {
                text: newMessage ? newMessage : '❤',
                image: ""
            }
        })
        dispatch(messegeSend(data))
        setNewMessage('')
    }

    const emojiSend = (emo) =>{
        // ${newMessege}に追加でemoをしないと複数のemojiを書けない。
        setNewMessage(`${newMessage}` + emo)
    }

    const imageSend = (e) =>{
        if(e.target.files.length !== 0){
            const imageName = e.target.files[0].name
            const newImageName = Date.now() + imageName

            const formData = new FormData();
            formData.append('senderName', myInfo.username)
            formData.append('imageName',newImageName)
            formData.append('reserverId', currentFriend._id)
            formData.append('image', e.target.files[0])

            dispatch(ImageMessegeSend(formData))
        }
    }

    useEffect(() =>{
        dispatch(getFriends())
    },[])

    useEffect(() =>{
        if(friends && friends.length > 0){
            setCurrentFriend(friends[0])
        }
    },[friends])

    useEffect(() =>{
        dispatch(getMessege(currentFriend._id))
    },[currentFriend?._id])

    // messegeを追加した際にuseRefをそれぞれのmessegeに持たせる事で、自動的に最後に追加したmessegeの位置までscrollしてくれる。
    useEffect(() =>{
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    },[messege])

    return (
        <div className="messenger">
            <div className="row">
                <div className="col-3">
                    <div className="left-side">
                        <div className="top">
                            <div className="image-name">
                                <div className="image">
                                    <img alt="" src="./image/ron.png"/>
                                </div>
                                <div className="name">
                                    <h3>{myInfo.username}</h3>
                                </div>
                                <div className="icons">
                                    <div className="icon">
                                        ...
                                    </div>
                                    <div className="icon">
                                        Edit
                                    </div>
                                    <div className="icon">
                                       <Link to="/messanger/login">Login</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="friend-search">
                                <div className="search">
                                    <button>Search</button>
                                    <input type="text"
                                    　　　　placeholder="search"
                                        className="form-control"
                                    />
                                </div>
                        </div>
                        <div className="active-friends">
                            {
                                activeUser && activeUser.length > 0 ?
                                    activeUser.map(u =>
                                       <ActiveFriend
                                        setCurrentFriend={setCurrentFriend}
                                        user={u}/>)
                                :
                                <div>
                                    <p style={{color: 'white'}}>No Active Friends</p>
                                </div>
                            }
                        </div>
                        <div className="friends">
                            {
                                friends && friends.length > 0? friends.map(
                                    fd =>
                                    <div
                                    onClick={() => setCurrentFriend(fd)}
                                    className={currentFriend._id === fd._id ?
                                     "hover-friends active": "hover-friends"
                                    }>
                                       <Friends friend={fd}/>
                                    </div>) : "No Friends"
                                }
                            }
                        </div>
                    </div>
                </div>
                {
                    currentFriend ?
                    <RightSide
                     scrollRef={scrollRef}
                     currentFriend={currentFriend}
                     activeUser={activeUser}
                     inputHandle={inputHandle}
                     newMessage={newMessage}
                     sendMessage={sendMessage}
                     messege={messege}
                     emojiSend={emojiSend}
                     imageSend={imageSend}
                    />
                    : 'Please select your friend to start conversation.'
                }
            </div>
        </div>
    )
}

export default Messenger
