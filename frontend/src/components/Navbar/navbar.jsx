import { FaUserAlt, FaUserFriends } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { ImHome3 } from "react-icons/im";
import { TbMessage } from "react-icons/tb";
import { AiOutlineLogout } from "react-icons/ai";
import "./navbar.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "@sweetalert2/themes/material-ui/material-ui.css";
import Swal from 'sweetalert2/src/sweetalert2.js'
import { getUserImg, setUserData, getUserData, setIsLoggedIn, setUserImg } from "../../redux/action/userAction";

export const Navbar = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch()
    
    const userData = useSelector(state=> state.userData.userData)
    const userImg = useSelector(state=> state.userData.userImg)


    
    useEffect(()=> {
        let data = {
            _id: localStorage.getItem("userId_socialMedia"),
            name: localStorage.getItem("username_socialMedia"),
            city: localStorage.getItem("usercity_socialMedia"),
            dob: localStorage.getItem("userdob_socialMedia"),
            email: localStorage.getItem("useremail_socialMedia")
        }
        dispatch(setUserData(data))
        dispatch(setIsLoggedIn(true))

    }, [])


    useEffect(()=> {
        if(userData._id && !userImg) {
            dispatch(getUserImg(userData._id))
        }
    }, [userData])

    const handlelogOut = () => {

        if (window.confirm("Are You Sure you want to logout?") === true) {
            alert(true)
            let data = {}

            dispatch(setUserData(data))


            localStorage.removeItem("userId_socialMedia")
            localStorage.removeItem("username_socialMedia")
            localStorage.removeItem("userdob_socialMedia")
            localStorage.removeItem("usercity_socialMedia")
            localStorage.removeItem("useremail_socialMedia")

            dispatch(setUserImg(null));
            navigate("/");
        }

    }





    return (
        <>
            <nav>

                {/* {userId ? */}
                    <>
                        <div className="userIcons">

                            <div>

                                <FaUserAlt className={userImg === "" ? "user_icon" : "display_none"} onClick={() => { navigate("/profile") }} />
                                <img src={userImg} onClick={() => { navigate("/profile") }}
                                    className={userImg === "" ? "display_none" : "profile_img_nav"}
                                    alt="profile_img"
                                /> 
                                {/* <p>{userData.username}</p> */}

                            </div>

                            <ImHome3 className="user_icon" onClick={() => { navigate("/home") }} />

                            <FaUserFriends className="friends_icon user_icon" onClick={() => { navigate("/friends") }} />

                            <TbMessage className="friends_icon user_icon" onClick={() => { navigate("/chat") }} />

                        </div>
                        <div onClick={handlelogOut} className="logout_btn_div" >
                            <AiOutlineLogout className="user_icon text_btn" />
                            {/* <p className="text_btn logout_btn">Logout</p> */}
                        </div>
                    </>
                    {/* : null
                } */}
            </nav>
            <div className="nav"></div>
        </>
    )
}