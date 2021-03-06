import React from 'react'

const MessageSend = ({inputHandle, newMessage, sendMessage,
                      emojiSend, imageSend }) => {
    const emojis = [
        "π","π","π","π ",
        "π","π","π","π",
        "π","π³","π’","π°",
        "π°","π","πΆ","π"
    ]

    return (
        <div className="message-send-section">
           {/* emojiγγ―γͺγγ―γγγ¨checkboxζ¬γεγΎγ */}
           <input type="checkbox" id="emoji"/>
           <div className="file hover-attachment">
               <div className="add-attchment">
                   Attach
               </div>
               o
           </div>
           <div className="file hover-image">
               <div className="add-image" >
                   Image
               </div>
               <input type="file" className="form-control"
                      id="pic" onChange={imageSend}/>
                <label htmlFor="pic">---</label>
           </div>
           <div className="file hover-gift">
               <div className="add-gift">
                   Gift
               </div>
               Gift
           </div>
           <div className="message-type">
               <input type="text" name="message" id="message"
                placeholder="Aa" className="form-control"
                onChange={inputHandle} value={newMessage}
               />
               <label htmlFor="emoji">π</label>
           </div>
           <div className="file" onClick={sendMessage}>
             β€
           </div>
           <div className="emoji-section">
               <div className="emoji">
                   {
                       emojis.map((emoji,i) => (
                            <span
                              onClick={() => emojiSend(emoji)}
                              key={i}>
                              {emoji}
                            </span>
                       ))
                   }
               </div>
           </div>
        </div>
    )
}

export default MessageSend
