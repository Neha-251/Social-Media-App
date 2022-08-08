import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/navbar"
import "./home.css";
import { FcLike, FcIdea } from "react-icons/fc";
import { RiEmotionLaughLine } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { FaHandHoldingHeart } from "react-icons/fa";
import { Comment } from "./comment";
import "@sweetalert2/themes/material-ui/material-ui.css";
import Swal from 'sweetalert2/src/sweetalert2.js'
import { useLocation, useNavigate } from "react-router-dom";
import { UserDetails } from "./userDetails";
import {useDispatch, useSelector} from 'react-redux'
import { setPostRefresh } from "../../redux/action/userAction";

export const Home = () => {

    const navigate = useNavigate();
    const search = useLocation().search;
    const page = new URLSearchParams(search).get('page') || 1;
    const pagesize = new URLSearchParams(search).get('pagesize') || 6;
    const sort = new URLSearchParams(search).get('sort') || -1;


    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData.userData);
    const postRefresh = useSelector(state => state.userData.postRefresh);

    const [pages, setPages] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [allData, setAllData] = useState([])

    const getData = () => {
        axios.get(`https://social-media-neha2.herokuapp.com/post/get/all?page=${page}&pagesize=${pagesize}&sort=${sort}`).then(res => {
            setAllData(res.data.post);
            setTotalPage(res.data.total_pages);
        })
            .catch()
        dispatch(setPostRefresh(false));

    }

    useEffect(() => {
        getData();

    }, [postRefresh, page, pagesize, sort])

    const handlePage = (e) => {
        navigate(`/home?page=${e}&pagesize=${pagesize}&sort=${sort}`)
    }


    useEffect(() => {

        let arr = [];
        let limit = Math.round(totalPage);

        for (let i = 1; i <= limit; i++) {
            arr.push(i);
        }
        setPages(arr);
    }, [allData])

    const handleLike = (id, string) => {
        let obj = {
            "user_id": userData.userId,
            "reaction": string
        }

        axios.patch(`https://social-media-neha2.herokuapp.com/reaction/edit/${id}`, obj).then(res => {

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
                title: 'You Liked a Post!'
            })
            dispatch(setPostRefresh(true))
        }).catch((err) => {
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
                icon: 'warning',
                title: 'Something went wrong!'
            })
        })
    }




    return (
        <>

            {
                userData.userId?
                    <div>

                        <div className="home_mainDiv">

                            <p className="refresh_btn" onClick={() => {
                                dispatch(setPostRefresh(true));

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
                                    title: 'Please wait, data is being updated!'
                                })
                            }}>Refresh....</p>

                            {
                                allData.map((el) => {
                                    console.log('el', el.profile_img)
                                    return (
                                        <div className="single_post" key={el._id}>
                                            <div className="post_upperDiv">
                                                <div className="post_upper_left">
                                                    <img className="post_userImg" src={el.profile_img} alt="el_img" />
                                                    <UserDetails user={el.user_id} />
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

                                            <Comment el={el} />

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
                    </div>

                    : <div style={{ width: "300px", margin: '50px auto' }}>
                        <div>You are not logged in Please login</div>

                        <button className="normal_btn" onClick={() => navigate("/register")}>Login</button>
                    </div>
            }

        </>
    )
}