import React from 'react'

const ActiveFriend = ({user,setCurrentFriend}) => {
    return (
        <div className="active-friends"
             onClick={() => setCurrentFriend({
                 _id: user.userInfo.id,
                 email: user.userInfo.email,
                 userName: user.userInfo.userName
             })}
        >
            <p style={{color: "white"}}>ActiveFriend</p>
            <div className="image-active-icon">
                <div className="image">
                    <img src="./image/ron.png" alt="IM"/>
                    <div className="active-icon"></div>
                </div>
            </div>
            <div>
                {user.userName}
            </div>
        </div>
    )
}

export default ActiveFriend
