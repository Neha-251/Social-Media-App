import axios from "axios";
import { useEffect, useState } from "react";
import { UserDetails } from "../../friends/UserDetails";
import { Userimage } from "../../Home/user-image";
import "./Conversation.css";

export const Conversation = ({ conversation, currentUserName, currentUserImg, currentUserId }) => {
  const [friendId, setFriendId] = useState("");
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUserId);
    setFriendId(friendId)

    const getUser = async () => {
      try {
        // const res = await axios("/users?userId=" + friendId);
        // setUser(res.data);
      } catch (err) {
      }
    };
    getUser();
  }, [currentUserId, conversation]);

  return (

    <div className="conversation">
      <Userimage userId={friendId} />
      <UserDetails user={friendId} />
      {/* <span className="conversationName">{user?.username}</span> */}
    </div>
  );
}