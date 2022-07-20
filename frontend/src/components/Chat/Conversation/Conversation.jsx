import axios from "axios";
import {Userimage} from "./user-image";
import { useEffect, useState } from "react";
import "./Conversation.css";

export const Conversation = ({ conversation, currentUserName, currentUserImg, currentUserId }) => {
  const [friendId, setFriendId] = useState("");
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [userD, setUserD] = useState({});


  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUserId);
    setFriendId(friendId)
    axios.get(`https://social-media-neha2.herokuapp.com/users/${friendId}`)
    .then(res=> 
        {
            setUserD(res.data);
        }
    )
    
  }, [currentUserId, conversation]);

    

  return (

    <div className="conversation">
      <Userimage userId={friendId} />
      <div className="post_user">
            <p className="con_username">{userD.name}</p>
            <p className="con_usercity">{userD.city}</p> 
      </div>
      {/* <span className="conversationName">{user?.username}</span> */}
    </div>
  );
}