import { FaUserAlt, FaUserFriends } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { ImHome3 } from "react-icons/im";
import { TbMessage } from "react-icons/tb";
import { AiOutlineLogout } from "react-icons/ai";
import "./navbar.css";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../context/usercontext";
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "@sweetalert2/themes/material-ui/material-ui.css";
import Swal from 'sweetalert2/src/sweetalert2.js'

export const Navbar = () => {

    const navigate = useNavigate();
    const { userImg, profile_img, userId, isLoggedin, username, datatotalPage, allData, setUserId, userLogin } = useContext(userContext);
    console.log('profile_img', profile_img)
    // console.log('userImg', userImg)

    const [loading, setLoading] = useState(false);


    const search = useLocation().search;
    const page = new URLSearchParams(search).get('page') || 1;
    const pagesize = new URLSearchParams(search).get('pagesize') || 6;
    const sort = new URLSearchParams(search).get('sort') || -1;

    useEffect(()=> {
        let data = {
            userId : localStorage.getItem("userId_socialMedia"),
            username : localStorage.getItem("username_socialMedia"),
            city : localStorage.getItem("usercity_socialMedia"),
            dob : localStorage.getItem("userdob_socialMedia"),
            email : localStorage.getItem("useremail_socialMedia")
        }
        userLogin(data)
    }, [])

    const getProfilePic = () => {
        if (userId) {
            axios.get(`https://social-media-neha2.herokuapp.com/profilepic/get/single?userId=${userId}`)
                .then(res => {

                    let singleData = res.data;

                    userImg(singleData);


                })
                .catch(err => {
                    setLoading(false)
                })
        }


    }

    
    const handlelogOut = () => {

        if (window.confirm("Are You Sure you want to logout?") === true) {
            alert(true)
           // userLogin(null);
            userImg("");
            navigate("/");
        }

    }
  


    const getData = () => {
        axios.get(`https://social-media-neha2.herokuapp.com/post/get/all?page=${page}&pagesize=${pagesize}&sort=${sort}`).then(res => {
            datatotalPage(res.data.total_pages);
            allData(res.data.post);
        })
            .catch()

    }

    useEffect(() => {
        getProfilePic();
        getData();
    }, [userId])


    return (
        <>
        <nav>

            {userId ?
                <>
                    <div className="userIcons">

                        <div>

                            <FaUserAlt className={profile_img === "" ? "user_icon" : "display_none"} onClick={() => { navigate("/profile") }} />
                            <img src={profile_img} onClick={() => { navigate("/profile") }}
                                className={profile_img === "" ? "display_none" : "profile_img_nav"}
                                alt="profile_img"
                            />
                            {/* <p>{username}</p> */}

                        </div>

                        <ImHome3 className="user_icon" onClick={() => { navigate("/home") }} />

                        <FaUserFriends className="friends_icon user_icon" onClick={() => { navigate("/friends") }} />

                        <TbMessage className="friends_icon user_icon" onClick={() => { navigate("/chat") }} />

                    </div>
                    <div onClick={handlelogOut} className="logout_btn_div" >
                        <AiOutlineLogout className="user_icon text_btn" />
                        <p className="text_btn logout_btn">Logout</p>
                    </div>
                </>
                : null
            }
        </nav>
        <div className="nav"></div>
        </>
    )
}