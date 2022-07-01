import {FaUserAlt} from "react-icons/fa";
import {BsFillMoonStarsFill} from "react-icons/bs";
import {ImHome3} from "react-icons/im";
import {AiOutlineLogout} from "react-icons/ai";
import "./navbar.css";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../context/usercontext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "@sweetalert2/themes/material-ui/material-ui.css";
import Swal from 'sweetalert2/src/sweetalert2.js'

export const Navbar = () => {

    const navigate = useNavigate();
    const {userImg, profile_img, userId, username, datatotalPage, allData, userLogin} = useContext(userContext);
   
    const [loading, setLoading] = useState(false);


    const search = useLocation().search;
    const page = new URLSearchParams(search).get('page') || 1;
    const pagesize = new URLSearchParams(search).get('pagesize') || 6;
    const sort = new URLSearchParams(search).get('sort') || -1;

    const getProfilePic = () => {
      if(userId) {
        axios.get(`https://social-media-neha2.herokuapp.com/profilepic/get/single?userId=${userId}`)
        .then(res => {
           
            let singleData = res.data;
        
            userImg(singleData);

        
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
      }
       

    }

    const handlelogOut = () => {
       
       if(window.confirm("Are Ypu Sure you want to logout?") === true){
        userLogin("");
        userImg("");
        navigate("/");
       }
       
    }


    const getData = () => {
        axios.get(`https://social-media-neha2.herokuapp.com/post/get/all?page=${page}&pagesize=${pagesize}&sort=${sort}`).then(res => {
            datatotalPage(res.data.total_pages);
            //console.log('res.data', res)
            allData(res.data.post);
            //console.log('res.data.post.totalpages', res.data.total_pages)
        })
        .catch(err => console.log(err))
    
    }

    useEffect(()=> {
        getProfilePic();
        getData();
    }, [])

    
    return (
        <nav>
            
            
            <div className="userIcons"> 
                <div>{username}</div>
                <FaUserAlt className={profile_img===""? "user_icon": "display_none"} onClick={()=> {navigate("/profile")}}/>
                <img src={profile_img} onClick={()=> {navigate("/profile")}} 
                className={profile_img===""? "display_none":"profile_img_nav"}
                 alt="profile_img"/>
                <ImHome3 className="user_icon" onClick={()=> {navigate("/home")}}/>
                
            </div>
            <div className="logout_btn_div" >
               <AiOutlineLogout className="user_icon text_btn" />
               <p onClick={handlelogOut} className="text_btn logout_btn">Logout</p>
            </div>
        
        </nav>
    )
}