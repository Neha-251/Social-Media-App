import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navbar } from "../Navbar/navbar"
import "./home.css";
import { FiSend } from "react-icons/fi";
import { userContext } from "../context/usercontext";
import {FcLike, FcIdea} from "react-icons/fc";
import {RiEmotionLaughLine} from "react-icons/ri";
import {AiFillLike} from "react-icons/ai";
import {FaHandHoldingHeart} from "react-icons/fa";


export const Home = () => {


    const {data, allData, userId, profile_img} = useContext(userContext);
    const [refresh, setRefresh] = useState(false);

    const [commentInp, setCommentInp] = useState("");

    const getData = () => {
        axios.get("http://localhost:5000/post/get/all").then(res => {
            allData(res.data.post);
            console.log('res.data.post.length', res.data.post)
        })
        .catch(err => console.log(err))
        setRefresh(false);

    }

    useEffect(() => {
       if(data.length === 0 || refresh === true){
          getData();
        }

    }, [refresh])

    //console.log(refresh)


    const handleLike = (id, string) => {
        console.log("reactionId" ,id, string);
        let obj = {
            "user_id": userId,
            "reaction": string
        }

        axios.patch(`http://localhost:5000/reaction/edit/${id}`, obj).then(res => {
            console.log(res.data)
            alert("Your Reaction Successfully added");
        }).catch(err => alert("something went wrong"))
    }

   
    const handleClickComment = (id) => {
       // console.log("reactionId" ,id, string);
        let obj = {
            "user_id": userId,
            "reaction": commentInp
        }

        axios.patch(`http://localhost:5000/comment/edit/${id}`, obj).then(res => {
            console.log(res.data)
            alert("Your Comment Successfully added");
        }).catch(err => alert("something went wrong"))
    }
    console.log('commentInp', commentInp)

    return (
        <>

            <Navbar />
            <div className="home_mainDiv">
               
            <p className="refresh_btn" onClick={()=> {setRefresh(true); alert("Please wait, data is being updated")}}>Refresh....</p>
                
                {
                    data.map((el) => {
                        return (
                            <div className="single_post" key={el._id}>
                                <div className="post_upperDiv">
                                    <div className="post_upper_left">
                                        <img className="post_userImg" src={`data:image/png;base64,${el.profile_img.data}`} alt="user_profile_image" />
                                        <div>
                                            <p className="post_username">{el.user_id.name}</p>
                                            <p className="post_usercity">{el.user_id.city}</p>
                                        </div>
                                    </div>
                                    <div className="post_upper_right">
                                        <p>+ Follow</p>
                                    </div>
                                </div>

                                <div className="post_middleDiv">
                                    <p className="post_title">{el.title}</p>
                                    <p className="post_desc">{el.description}</p>
                                    <img className="post_main_img" src={`data:image/png;base64,${el.post_file.data}`} alt="post_image" />
                                </div>

                                <div className="likeCount_div">
                                    <p>Total Likes {el.reaction_id.reactions.length}</p>
                                    <p>Total Comments {el.comment_id.comments.length}</p>
                                </div>

                                <div className="post_lowerDiv1">
                                    <div className="reaction_icons_div">
                                       
                                      
                                            <FcLike onClick={()=> handleLike(el.reaction_id._id, "love")} className="reaction_icons"/>
                                            <RiEmotionLaughLine onClick={()=> handleLike(el.reaction_id._id, "laugh")} className="reaction_icons"/>
                                            <AiFillLike onClick={()=> handleLike(el.reaction_id._id, "like")} className="reaction_icons"/>
                                            <FaHandHoldingHeart onClick={()=> handleLike(el.reaction_id._id, "heart")} className="reaction_icons"/>
                                            <FcIdea onClick={()=> handleLike(el.reaction_id._id, "idea")} className="reaction_icons"/>
                                        
                                    </div>
                                    <div>Share</div>
                                </div>

                                <div className="post_lowerDiv2">
                                    <div className="post_comment1">
                                        <img className="post_userImg_comment" src={`data:image/png;base64,${profile_img}`} alt="" />

                                        <input type="text" placeholder="Add a Comment..." value={commentInp} onChange={(e) => {setCommentInp(e.target.value)}} className="post_comment_inp" />
                                        <FiSend className="comment_inp_send_icon" onClick={()=> handleClickComment(el.comment_id._id)} />

                                    </div>
                                    <div className="post_comment2">

                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}