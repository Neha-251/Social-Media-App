import "./MainChat.css";
import { Conversation } from "../Conversation/Conversation";
import { Message } from "../Message/Message";
import { ChatOnline } from "../ChatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { userContext } from "../../context/usercontext";
import { useNavigate } from "react-router-dom";


export const MainChat = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentFriend, setCurrentFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userId, username, profile_img } = useContext(userContext);
  const scrollRef = useRef();
  const [refresh, setRefresh] = useState(false);
  const [time, setTime] = useState(0)
  const { setFriendName, friendName, friendImg, friendCity, setFriendImg, setFriendCity, friendListRefresh, setFriendListRefresh } = useContext(userContext)

  var timer = useRef(0)

  const navigate = useNavigate()

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);


  useEffect(() => {
    if (currentChat) {
      for (let i = 0; i < currentChat.members.length; i++) {
        if (currentChat.members[i] !== userId) {
          setCurrentFriend(currentChat.members[i])
        }
      }
    }
  }, [currentChat])

  useEffect(() => {

    axios.get(`https://social-media-neha2.herokuapp.com/users/${currentFriend}`)
      .then(res => {
        setFriendName(res.data.name);
        setFriendCity(res.data.city);
      }
      )

    axios.get(`https://social-media-neha2.herokuapp.com/profilepic/get/single?userId=${currentFriend}`)
      .then(res => setFriendImg(res.data)).catch()

  }, [currentFriend])

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`https://social-media-neha2.herokuapp.com/conversation/${userId}`);
        setConversations(res.data);
      } catch (err) {
      }
    };
    getConversations();
    setFriendListRefresh(false)

  }, [userId, friendListRefresh]);

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
        (member) => member !== userId
      );

      const message = {
        sender: userId,
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
        userId!=="undefined"? 
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input placeholder="Search for friends" className="chatMenuInput" />
              {conversations.map((c) => {
                return (<div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUserName={username} currentUserImg={profile_img} currentUserId={userId} />
                </div>)
              })}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxhead">
                    <img src={friendImg} className="comment_userImg" alt="" />
                    <div className="post_user">
                      <p className="post_username">{friendName}</p>
                      <p className="post_usercity">{friendCity}</p>
                    </div>
                  </div>
                  <div className="chatBoxTop">
                    {messages.map((m) => {

                      return (
                        <div ref={scrollRef}>
                          <Message message={m} senderId={m.sender} userId={userId} />
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
            <div className="chatOnlineWrapper">
              <ChatOnline
                onlineUsers={onlineUsers}
                currentId={userId}
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