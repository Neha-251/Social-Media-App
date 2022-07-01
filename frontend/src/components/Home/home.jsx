import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navbar } from "../Navbar/navbar"
import "./home.css";
import { userContext } from "../context/usercontext";
import { FcLike, FcIdea } from "react-icons/fc";
import { RiEmotionLaughLine } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { FaHandHoldingHeart } from "react-icons/fa";
import { Comment } from "./comment";
import "@sweetalert2/themes/material-ui/material-ui.css";
import Swal from 'sweetalert2/src/sweetalert2.js'
import { useLocation, useNavigate } from "react-router-dom";
import { UserDetails } from "./userDetails";

export const Home = () => {

    const navigate = useNavigate();
    const search = useLocation().search;
    const page = new URLSearchParams(search).get('page') || 1;
    const pagesize = new URLSearchParams(search).get('pagesize') || 6;
    const sort = new URLSearchParams(search).get('sort') || -1;

    const { data, allData, userId, totalPage, datatotalPage, dataRefresh, refresh } = useContext(userContext);

    const [pages, setPages] = useState([])

    const getData = () => {
        axios.get(`https://social-media-neha2.herokuapp.com/post/get/all?page=${page}&pagesize=${pagesize}&sort=${sort}`).then(res => {
            allData(res.data.post);
            datatotalPage(res.data.total_pages);
           // console.log('res.data.post.length', res.data.post)
        })
            .catch(err => console.log(err))
        dataRefresh(false);

    }

    // useEffect(() => {
    //    // if (data.length === 0) {
    //         getData();
    //    // }

    // }, [])

    useEffect(() => {
       // if (data.length === 0) {
            getData();
       // }

    }, [refresh, page, pagesize, sort])

    const handlePage = (e) => {
        navigate(`/home?page=${e}&pagesize=${pagesize}&sort=${sort}`)
    }

    //console.log(refresh)

    useEffect(() => {

        let arr = [];
        let limit = Math.round(totalPage);
        //console.log('limit', limit)

        for (let i = 1; i <= limit; i++) {
            arr.push(i);
        }
        setPages(arr);
        // console.log("pages",pages)
    }, [data])

    const handleLike = (id, string) => {
        console.log("reactionId", id, string);
        let obj = {
            "user_id": userId,
            "reaction": string
        }

        axios.patch(`https://social-media-neha2.herokuapp.com/reaction/edit/${id}`, obj).then(res => {
            
            Swal.fire({
                position: 'top-end',
               // icon: 'warning',
                title: 'Your Reaction Successfully added',
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
        <>

            <Navbar />
            <div className="home_mainDiv">

                <p className="refresh_btn" onClick={() => { dataRefresh(true); alert("Please wait, data is being updated") }}>Refresh....</p>

                {
                    data.map((el) => {
                       // el.user_id.name
                      //  console.log('el.user_id.name', el.user_id.name)
                        return (
                            <div className="single_post" key={el._id}>
                                <div className="post_upperDiv">
                                    <div className="post_upper_left">
                                        <img className="post_userImg" src={el.profile_img} alt="user_profile_image" />
                                        <UserDetails user={el.user_id}/>
                                    </div>
                                    <div className="post_upper_right">
                                        <p>+ Follow</p>
                                    </div>
                                </div>

                                <div className="post_middleDiv">
                                    <p className="post_title">{el.title}</p>
                                    <p className="post_desc">{el.description}</p>
                                    <div className="post_main_imgDiv">
                                        {el.post_file.map((img) => {
                                            return <img className="post_main_img" src={img} alt="post_image" />
                                        })}
                                    </div>

                                </div>

                                <div className="likeCount_div">
                                    <p className="total_like_p">Total Likes {el.reaction_id.reactions.length}</p>
                                    <p className="total_comment_p">Total Comments {el.comment_id.comments.length}</p>
                                </div>


                               


                                <div className="post_lowerDiv1">
                                    <div className="reaction_icons_div">


                                        <FcLike onClick={() => handleLike(el.reaction_id._id, "love")} className="reaction_icons" />
                                        <RiEmotionLaughLine onClick={() => handleLike(el.reaction_id._id, "laugh")} className="reaction_icons" />
                                        <AiFillLike onClick={() => handleLike(el.reaction_id._id, "like")} className="reaction_icons" />
                                        <FaHandHoldingHeart onClick={() => handleLike(el.reaction_id._id, "heart")} className="reaction_icons" />
                                        <FcIdea onClick={() => handleLike(el.reaction_id._id, "idea")} className="reaction_icons" />

                                    </div>
                                    <div>Share</div>
                                </div>

                                <Comment el={el}/>
                                
                            </div>
                        )
                    })
                }

            </div>
            <div className="pageDiv">
                {
                    pages.map((e) => {
                        return (
                            <button key={e} onClick={() => handlePage(e)}>{e}</button>
                        )
                    })
                }
            </div>
        </>
    )
}