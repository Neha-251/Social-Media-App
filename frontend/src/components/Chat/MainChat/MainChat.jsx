import "./MainChat.css";
import { Conversation } from "../Conversation/Conversation";
import { Message } from "../Message/Message";
import { ChatOnline } from "../ChatOnline/ChatOnline";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {AiOutlineUser}  from "react-icons/ai";
import { CgMenuRound } from "react-icons/cg"
import {useSelector, useDispatch} from 'react-redux'
import { getFriendData, getFriendImg, setFriendListRefresh } from "../../../redux/action/userAction";


export const MainChat = () => {

  const [showOnline, setShowOnline] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  const [refresh, setRefresh] = useState(false);
  const [time, setTime] = useState(0)

  var timer = useRef(0)

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const friendData =  useSelector(state => state.userData.friendData)
  const friendImg =  useSelector(state => state.userData.friendImg)
  const userData =  useSelector(state => state.userData.userData)

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);


  useEffect(() => {
    if (currentChat) {
      for (let i = 0; i < currentChat.members.length; i++) {
        if (currentChat.members[i] !== userData.userId) {
          setCurrentFriend(currentChat.members[i])
        }
      }
    }
  }, [currentChat])

  useEffect(() => {

    dispatch(getFriendData(currentFriend))
    dispatch(getFriendImg(currentFriend))

  }, [currentFriend])

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`https://social-media-neha2.herokuapp.com/conversation/${userData.userId}`);
        setConversations(res.data);
      } catch (err) {
      }
    };
    getConversations();
     dispatch(setFriendListRefresh(false))

  }, [userData]);

  const getMessages = async () => {
    try {
      const res = await axios.get(`https://social-media-neha2.herokuapp.com/message/${currentChat._id}`);
      setMessages(res.data);
    } catch (err) {
      // console.log('err', err)
    }
    
  };

  useEffect(() => {
    
    getMessages();
    setArrivalMessage(false);
  }, [currentChat, newMessage]);

  useEffect(() => {
    timer.current = setInterval(() => {
      setRefresh(true)
      getMessages()
      setTime(prev => prev + 1)
    }, 5000)

    return ()=> {
      clearInterval(timer.current)
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage !== "") {

      const receiverId = currentChat.members.find(
        (member) => member !== userData.userId
      );

      const message = {
        sender: userData.userId,
        receiver: receiverId,
        text: newMessage,
        conversationId: currentChat._id
      };
      // socket.current.emit("sendMessage", {
      //   senderId: userId,
      //   receiverId: receiverId,
      //   text: newMessage,
      // });

      try {
        const res = await axios.post("https://social-media-neha2.herokuapp.com/message", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
      }
    }

    };

    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    return (
      
      <>
      {
        userData.userId!=="undefined"? 
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input placeholder="Search for friends" className="chatMenuInput" />
              {conversations.map((c) => {
                return (<div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUserName={userData.username} currentUserImg={friendImg} currentUserId={userData.userId} />
                </div>)
              })}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxhead">
                    {
                      friendImg===""? <AiOutlineUser className="user_icon" /> :
                      <img src={friendImg} className="message_userImg" alt="" />
                    }
                    <div className="post_user">
                      <p className="post_username">{friendData.name}</p>
                      <p className="post_usercity">{friendData.city}</p>
                    </div>
                  </div>
                  <div className="chatBoxTop">
                    {messages.map((m) => {

                      return (
                        <div ref={scrollRef}>
                          <Message message={m} senderId={m.sender} userId={userData.userId} />
                        </div>
                      )
                    })}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Open a conversation to start a chat.
                </span>
              )}
            </div>
          </div>
          <div className="chatOnline">
          <span><CgMenuRound onClick={()=> 
             {
              showOnline? setShowOnline(false): setShowOnline(true)
             }
            } className="menu_icon" /></span>
            <div className={ showOnline? "chatOnlineWrapper": "display_none"}>
            
             
              <ChatOnline
                onlineUsers={onlineUsers}
                currentId={userData.userId}
                setCurrentChat={setCurrentChat}
              />
            </div>
          </div>
        </div>
        :
        <div style={{width: "300px", margin: '50px auto'}}>
          <div>You are not logged in Please login</div>
          
          <button className="normal_btn" onClick={()=> navigate("/register")}>Login</button>
        </div> 
      }
        
      </>
    );
  }