import React from 'react'

const Friends = ({friend}) => {
    return (
        <div className="friend">
            <div className="friend-image">
                <div className="image">
                    <img src="./image/ron.png" alt="" width="100px"/>
                </div>
            </div>
            <div className="friend-name">
                <h4>{friend.username}</h4>
            </div>
        </div>
    )
}

export default Friends
