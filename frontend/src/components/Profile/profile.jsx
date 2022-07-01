import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/usercontext";
import { Navbar } from "../Navbar/navbar";
import "./profile.css";
import "@sweetalert2/themes/material-ui/material-ui.css";
import Swal from 'sweetalert2/src/sweetalert2.js'


export const Profile = () => {

    const navigate = useNavigate();
    const { userImg, userId, profile_img } = useContext(userContext);
    const [profilePicPreview, setProfilePicPreview] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [postFlag, setPostFlag] = useState(false);


    const getProfilePic = () => {
        axios.get(`http://localhost:5000/profilepic/get/single?userId=${userId}`)
            .then(res => {
                userImg(res.data)
            })
            .catch(error =>   
               {console.log(error);

            //     Swal.fire({
            //     position: 'top-end',
            //     icon: 'warning',
            //     title: 'Something Went Wrong!',
            //     showConfirmButton: false,
            //     timer: 2000,
            //     timerProgressBar: true,
            //     heightAuto: false
            // })
        })
    }

    useEffect(() => {
        getProfilePic();
    }, [])

    const handleProfilePicChange = (e) => {
        let file = e.target.files[0];
        setProfilePic(file);
        changeFile(file)
    }

    const changeFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProfilePicPreview(reader.result);
        };
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("profile_pic", profilePic);
        formData.append("user_id", userId);
        //let userId = "62b5dbf70d1f6f18934eabf7";


        console.log('userId', userId)
        if (profilePicPreview === "") {
            axios.post("http://localhost:5000/profilepic/create", formData)
                .then(res => {

                }).then(res => 
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'Profile Picture has been set!',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        heightAuto: false
                    })
                    ).catch(error => console.log(error))
        } else {
            axios.delete(`http://localhost:5000/profilepic/delete?userId=${userId}`)
                .then(
                    axios.post("http://localhost:5000/profilepic/create", formData)
                        .then(res => {
                            userImg(profilePic)
                        }).then(res => 
                            Swal.fire({
                                position: 'top-end',
                                icon: 'warning',
                                title: 'Profile Picture has been updated!',
                                showConfirmButton: false,
                                timer: 2000,
                                timerProgressBar: true,
                                heightAuto: false
                            })
                            
                            ).catch(error => console.log(error))
                ).catch(err => 
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'Something Went Wrong!',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        heightAuto: false
                    })
                )
        }

    }

   

    return (
        <>
            <Navbar />

            <div>
                {postFlag===true && navigate("/post")}
            </div>

            <div className="profile_container">

                <div className="profile_mainDiv">
                    <div className="profile_pic_div">
                        <img src={profilePicPreview === "" ? profile_img : profilePicPreview} className="profile_img" alt="profile_pic" />
                    </div>


                    <form action="" className="profile_form" onSubmit={handleSubmit}>
                        <input type="file" onChange={handleProfilePicChange} className="pic_inp" /> <br />
                        <input type="submit" value="Upload" className="pic_btn" />
                    </form>
                </div>

            </div>



            <div className="create_post">
                <p>Create a new Post...</p>
                <button onClick={() => { setPostFlag(true) }} className="normal_btn">Post</button>
            </div>



        </>
    )
}