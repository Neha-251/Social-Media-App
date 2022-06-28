import {FaUserAlt} from "react-icons/fa";
import {BsFillMoonStarsFill} from "react-icons/bs";
import {ImHome3} from "react-icons/im";
import "./navbar.css";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../context/usercontext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {

    const navigate = useNavigate();
    const {userImg, profile_img, userId, username, userImgFile} = useContext(userContext);
   
    const [loading, setLoading] = useState(false);
    const [userFirstName, setUserFirstName] = useState("")

    const [profileIMgBase, setProfileImgBase] = useState("");

    const getProfilePic = () => {
      if(userId) {
        axios.get(`https://social-media-neha.herokuapp.com/profilepic/get/single?userId=${userId}`)
        .then(res => {
           
            let singleData = res.data.data;
        
            setProfileImgBase(singleData);

            const convertBase64ToFile = function (image) {
                

                const byteString = atob(image.split(',')[1]);
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i += 1) {
                  ia[i] = byteString.charCodeAt(i);
                }
                const newBlob = new Blob([ab], {
                  type: 'image/jpeg',
                });
                return newBlob;
            };

            userImgFile(convertBase64ToFile(`data:image/png;base64,${singleData}`));


            userImg(singleData)
           
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
      }
       

    }

    useEffect(() => {
        // let name = ""
        // for(let i = 0; i < username.length; i++) {
        //     if(username[i] === " "){
        //         break;
        //     } else {
        //         name += username[i];
        //     }
        // }
        // setUserFirstName(name)
    }, [username])

    useEffect(()=> {
        getProfilePic();
    }, [])

    
    return (
        <nav>
            
            <div>{username}</div>
            
            <ImHome3 className="user_icon" onClick={()=> {navigate("/home")}}/>
            <div> 
                <FaUserAlt className={profile_img===""? "user_icon": "display_none"} onClick={()=> {navigate("/profile")}}/>
                <img src={`data:image/png;base64,${profile_img}`} onClick={()=> {navigate("/profile")}} 
                className={profile_img===""? "display_none":"profile_img_nav"}
                 alt="profile_img"/>
                
            </div>
            
        
        </nav>
    )
}