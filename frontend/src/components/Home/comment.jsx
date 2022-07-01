import { useContext, useState, useEffect } from "react"
import { userContext } from "../context/usercontext"
import { FiSend } from "react-icons/fi";
import axios from "axios";
import { CommentMap } from "./CommentMap";
import "@sweetalert2/themes/material-ui/material-ui.css";
import Swal from 'sweetalert2/src/sweetalert2.js'


export const Comment = (el, setRefresh) => {

    const { profile_img, userId, dataRefresh, refresh } = useContext(userContext);
    const [commentInp, setCommentInp] = useState("");
    const [commentData, setCommentData] = useState({});


    const handleClickComment = (id) => {
        // console.log("reactionId" ,id, string);
        let obj = {
            "user_id": userId,
            "reaction": commentInp
        }

        axios.patch(`https://social-media-neha.herokuapp.com/comment/edit/${id}`, obj).then(res => {
            console.log(res.data)
            
            Swal.fire({
                position: 'top-end',
               // icon: 'warning',
                title: 'Your Comment Successfully added',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                heightAuto: false
            })
            dataRefresh(true)

        }).catch(err => 
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Something went wrong',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                heightAuto: false
            }))
    }




    return (
        <div className="post_lowerDiv2">
            <div className="post_comment1">
                <img className="post_userImg_comment" src={profile_img} alt="" />

                <input type="text" placeholder="Add a Comment..." value={commentInp} onChange={(e) => { setCommentInp(e.target.value) }} className="post_comment_inp" />
                <FiSend className="comment_inp_send_icon" onClick={() => handleClickComment(el.el.comment_id._id)} />

            </div>
            
                {/* // setTimeout(() => { */}
                    <CommentMap parentId={el.el.comment_id.parent_id} />
                {/* // }, 2000) */}
            
           
        </div>
    )
}