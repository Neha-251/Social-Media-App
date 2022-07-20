import "./Message.css";
import { format } from "timeago.js";
import { Userimage } from "./user-image";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import {AiOutlineUser}  from "react-icons/ai";
import { userContext } from "../../context/usercontext";

export const Message = ({ message, userId, senderId }) => {
  const [own, setOwn] = useState(false)

 

  const {profile_img, friendImg} = useContext(userContext);



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
          message.receiver===userId? 
           friendImg===""? <AiOutlineUser className="user_icon" /> :
            <img src={friendImg} className="message_userImg" alt="img" /> : <img src={profile_img} className="message_userImg" alt="img" />
        }
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}