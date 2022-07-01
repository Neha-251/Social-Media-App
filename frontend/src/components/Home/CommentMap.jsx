import { userContext } from "../context/usercontext"
import axios from "axios";
import { useContext, useState, useEffect } from "react"
import { Userimage } from "./user-image";



export const CommentMap = (parentId) => {
   // console.log('parentId', parentId)

    const { profile_img, userId, dataRefresh, refresh } = useContext(userContext);

    const [commentData, setCommentData] = useState([]);

    const getComment = () => {
        axios.get(`http://localhost:5000/comment/get?parentId=${parentId.parentId}`).then(res => {
            setCommentData(res.data.comments);


        })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getComment()

    }, [refresh]);

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