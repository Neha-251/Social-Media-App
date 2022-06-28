import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/navbar"
import "./home.css";
import { FiSend } from "react-icons/fi";


export const Home = () => {


    const [data, setData] = useState([]);



    const getData = () => {
        axios.get("http://localhost:5000/post/get/all").then(res => {
            setData(res.data.post);

            console.log('res.data.post.length', res.data.post)
        })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getData();

    }, [])




   
    console.log('data', data)

    return (
        <>

            <Navbar />

            <div className="home_mainDiv">
               
                
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
                                    <p>Total Likes {el.comment_id.comments.length}</p>
                                </div>

                                <div className="post_lowerDiv1">
                                    <div>Like</div>
                                    <div>Share</div>
                                </div>

                                <div className="post_lowerDiv2">
                                    <div className="post_comment1">
                                        <img className="post_userImg_comment" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" alt="" />

                                        <input type="text" placeholder="Add a Comment..." className="post_comment_inp" />
                                        <FiSend className="comment_inp_send_icon" />

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