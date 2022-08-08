import { useState, useEffect } from "react"
import { FiSend } from "react-icons/fi";
import axios from "axios";
import { CommentMap } from "./CommentMap";
import "@sweetalert2/themes/material-ui/material-ui.css";
import Swal from 'sweetalert2/src/sweetalert2.js'
import {useSelector, useDispatch} from 'react-redux';
import { setPostRefresh } from "../../redux/action/userAction";


export const Comment = (el, setRefresh) => {

    const [commentInp, setCommentInp] = useState("");

    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData.userData)
    const userImg = useSelector(state => state.userData.userImg)


    const handleClickComment = (id) => {
        let obj = {
            "user_id": userData.userId,
            "reaction": commentInp
        }

        axios.patch(`https://social-media-neha2.herokuapp.com/comment/edit/${id}`, obj).then(res => {
            
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Your Comment is added!'
            })
            dispatch(setPostRefresh(true))

        }).catch((err) => 
            {const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'warning',
                title: 'Something went wrong!'
            })
        })
    }




    return (
        <div className="post_lowerDiv2">
            <div className="post_comment1">
                <img className="comment_userImg" src={userImg} alt="" />

                <input type="text" placeholder="Add a Comment..." value={commentInp} onChange={(e) => { setCommentInp(e.target.value) }} className="post_comment_inp" />
                <FiSend className="comment_inp_send_icon" onClick={() => handleClickComment(el.el.comment_id._id)} />

            </div>
            
                {/* // setTimeout(() => { */}
                    <CommentMap parentId={el.el.comment_id.parent_id} />
                {/* // }, 2000) */}
            
           
        </div>
    )
}