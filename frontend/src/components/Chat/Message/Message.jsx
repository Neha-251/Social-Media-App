import "./Message.css";
import { format } from "timeago.js";
import { Userimage } from "./user-image";
import { useState } from "react";
import { useEffect } from "react";
import {AiOutlineUser}  from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

export const Message = ({ message, userId, senderId }) => {
  const [own, setOwn] = useState(false)
  console.log('own', own)

  const dispatch = useDispatch();
  const friendImg = useSelector(state => state.userData.friendImg)
  const userImg = useSelector(state => state.userData.userImg)
  const userData = useSelector(state => state.userData.userData)



  useEffect(()=> {
    //setSender(message.sender._id)
    if(senderId=== userId){
      setOwn(true);
    }
  }, [])


  
 
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {
          message.receiver===userData.userId? 
           friendImg===""? <AiOutlineUser className="user_icon" /> :
            <img src={friendImg} className="message_userImg" alt="img" /> : <img src={userImg} className="message_userImg" alt="img" />
        }
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}