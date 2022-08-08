import axios from "axios";
import { useState, useEffect } from "react"
import { Userimage } from "./user-image";
import {useDispatch, useSelector} from 'react-redux'



export const CommentMap = (parentId) => {

    const dispatch = useDispatch();
    const postRefresh = useSelector(state => state.userData.postRefresh)
    const [commentData, setCommentData] = useState([]);

    const getComment = () => {
        axios.get(`https://social-media-neha2.herokuapp.com/comment/get?parentId=${parentId.parentId}`).then(res => {
            setCommentData(res.data.comments);


        })
            .catch()
    }

    useEffect(() => {
        getComment()

    }, [postRefresh]);

    return (
        <>
            {
                commentData ?
                    commentData.map((piece) => {
                        return <div className="commentMaindiv" key={piece._id}>

                            <Userimage userId={piece.user_id._id} />
                            <div className="comment_text">
                                <p className="comment_username">{piece.user_id.name} <b className="comment_author">Author</b></p>
                                <p className="comment_comment">{piece.comment}</p>
                            </div>
                        </div>
                    })
                    : <p>No Comment</p>
            }
        </>
    )

}