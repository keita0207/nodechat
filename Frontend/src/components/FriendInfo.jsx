import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BsChevronDown } from 'react-icons/bs'

const FriendInfo = (props) => {
    const { currentFriend, activeUser } = props
    return (
        <div className="friend-info">
            <input type="checkbox" id="gallery"/>
            <div className="image-name">
                <div className="image">
                    <img src="./image/ron.png" alt="#"/>
                </div>
                {
                    activeUser && activeUser.length > 0 &&
                    activeUser.some(u => u.userId === currentFriend._id) ?
                    <div className="active-user">
                        Active
                    </div>
                    : ''
                }
                <div className="name">
                    <h4>{currentFriend.username}</h4>
                </div>
            </div>
            <div className="others">
                <div className="custom-chat">
                    <h3>Customise Chat</h3>
                    <label htmlFor="gallery"><BsChevronDown /></label>
                </div>
                <div className="privacy">
                    <h3>Privacy and Support</h3>
                    <label htmlFor="gallery"><BsChevronDown /></label>
                </div>
                <div className="media">
                    <h3>Shared Media</h3>
                    <label htmlFor="gallery"><BsChevronDown /></label>
                </div>
            </div>
            <div className="gallery">
                <img alt="" src="./image/ron.png"/>
            </div>
        </div>
    )
}

export default FriendInfo
