import React from 'react'
import { useSelector } from 'react-redux'

const Message = ({messege, scrollRef, currentFriend}) => {
    const { myInfo } = useSelector(state => state.auth)
    return (
        <div className="message-show">
                {
                    messege && messege.length> 0 ? messege.map(m =>(
                        m.senderId === myInfo.id ?
                        <div ref={scrollRef} className="my-message">
                            <div className="image-message">
                                <div className="my-text">
                                    <p className="messages-text">
                                        {m.messege.text === '' ?
                                         <img src={`./image/${m.messege.image}`}/>
                                         : m.messege.text}
                                    </p>
                                </div>
                            </div>
                            <div className="time">
                                2 Jun 2021
                            </div>
                        </div>
                        :
                        <div ref={scrollRef} className="fd-message">
                            <div className="image-message-time">
                                <img src="./image/ron.png" alt=""/>
                                <div className="message-time">
                                    <div className="fd-text">
                                        <p className="messages-text">{m.messege.text}</p>
                                    </div>
                                    <div className="time">
                                        5 Jun 2021
                                    </div>
                                </div>
                            </div>
                        </div>
                      )
                    ): ""
            }
        </div>
    )
}

export default Message
