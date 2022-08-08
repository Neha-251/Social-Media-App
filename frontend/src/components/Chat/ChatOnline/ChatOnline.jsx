import axios from "axios";
import { useEffect, useState } from "react";
import { UserDetails } from "../../friends/UserDetails";
import { Userimage } from "../../Home/user-image";
import {useDispatch} from 'react-redux'
import { setFriendListRefresh } from "../../../redux/action/userAction";
import "./ChatOnline.css";
import Swal from 'sweetalert2/src/sweetalert2.js'

export const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`https://social-media-neha2.herokuapp.com/friends/${currentId}`);
      setFriends(res.data[0].friends);
    };

    getFriends();
  }, [currentId]);

  const handleAddConversation = (el) => {
    let data = {
      senderId: currentId,
      receiverId: el
    }
    axios.post("https://social-media-neha2.herokuapp.com/conversation", data).then(res => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Congrats! a new Conversation'
      })
      dispatch(setFriendListRefresh(true))

    }).catch(err => console.log(err))
  }

  return (
    <>

      <div>
        {
          friends.map((el) => {
            return (
              <div key={el} className="chatOnline_div" onClick={() => handleAddConversation(el)}>
                <div>
                  <Userimage userId={el} />
                  <UserDetails user={el} />
                </div>
                <button className="normal_btn chat_btn">Chat</button>
              </div>
            )
          })
        }
      </div>
    </>
  )

}