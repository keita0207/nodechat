import React from 'react'
import Message from './Message'
import MessageSend from './MessageSend'
import FriendInfo from './FriendInfo'
import { useSelector } from 'react-redux'

const RightSide = (props) => {
    const { currentFriend, inputHandle, newMessage,
            sendMessage, messege, scrollRef, emojiSend,
            imageSend, activeUser
          } = props

    const { myInfo } = useSelector(state => state.auth)

    return (
        <div className="col-9">
            <div className="right-side">
                <input type="checkbox" id="dot"/>
                <div className="row">
                    <div className="col-8">
                        <div className="message-send-show">
                            <div className="header">
                                <div className="image-name">
                                    <div className="image">
                                        <img src="./image/ron.png" alt="#"/>
                                        {
                                            activeUser && activeUser.length > 0 &&
                                            activeUser.some(u => u.userId === currentFriend._id) ?
                                            <div className="active-icon"></div>
                                            : ''
                                        }
                                    </div>
                                    <div className="name">
                                        <h3>{currentFriend.username}</h3>
                                    </div>
                                </div>
                                <div className="icons">
                                    <div className="icon">
                                        A
                                    </div>
                                    <div className="icon">
                                        B
                                    </div>
                                    <div className="icon">
                                       <label htmlFor="dot">C</label>
                                    </div>
                                </div>
                            </div>
                            <Message messege={messege} scrollRef={scrollRef} currentFriend={currentFriend} />
                            <MessageSend
                             inputHandle={inputHandle}
                             newMessage={newMessage}
                             sendMessage={sendMessage}
                             emojiSend={emojiSend}
                             imageSend={imageSend}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <FriendInfo currentFriend={currentFriend} activeUser={activeUser}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightSide
