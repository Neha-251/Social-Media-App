import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/usercontext";
import { Navbar } from "../Navbar/navbar";
import "./profile.css";
import "@sweetalert2/themes/material-ui/material-ui.css";
import { AiOutlineLogout } from "react-icons/ai";
import Swal from 'sweetalert2/src/sweetalert2.js'
import { Modal } from "../Post/post";


export const Profile = () => {

    const navigate = useNavigate();
    const { username, userImg, userId, profile_img, userDob, userCity, userEmail, userPassword, userLogin, postFlag, setPostFlag } = useContext(userContext);

    const [profilePicPreview, setProfilePicPreview] = useState("");
    const [profilePic, setProfilePic] = useState("");



    const getProfilePic = () => {
        axios.get(`https://social-media-neha2.herokuapp.com/profilepic/get/single?userId=${userId}`)
            .then(res => {
                userImg(res.data)
            })
            .catch(error => {

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

        if (userId) {
            let file = e.target.files[0];
            setProfilePic(file);
            changeFile(file)
        }
        else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'warning',
                title: 'Please Login to Set Profile Picture!'
            })
        }

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


        if (profilePicPreview === "") {
            axios.post("https://social-media-neha2.herokuapp.com/profilepic/create", formData)
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
                ).catch()
        } else {
            axios.delete(`https://social-media-neha2.herokuapp.com/profilepic/delete?userId=${userId}`)
                .then(
                    axios.post("https://social-media-neha2.herokuapp.com/profilepic/create", formData)
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

                        ).catch()
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

    const handlePostBtn = () => {
        if (userId) {
            setPostFlag(true)
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'warning',
                title: 'Please Login to post!'
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



    return (
        <>
            {userId !== "undefined" && userId !== undefined && userId !== "" && userId !== null ?

               ( <div>

                    <div>
                        {postFlag === true && <Modal />}
                    </div>

                    <div className="profile_container">

                        <div className="profile_mainDiv">
                            <div className="profile_pic_div">
                                <img src={profilePicPreview === "" ? profile_img : profilePicPreview} className="profile_img" alt="profile_pic" />
                            </div>


                            <form action="" className="profile_form" onSubmit={handleSubmit}>
                                <input type="file" onChange={handleProfilePicChange} className="pic_inp" /> <br />
                                <input type="submit" value="Upload" className="normal_btn pic_btn" />
                            </form>
                        </div>

                        <div className="userDetails">
                            <div className="showUserDetails">
                                <p>Name: {username}</p>
                                <p>Date of Birth: {userDob}</p>
                                <p>City: {userCity}</p>
                                <p>Email: {userEmail}</p>

                            </div>

                       
                        </div>


                    </div>



                    <div className="create_post">
                        {/* <p>Create a new Post...</p> */}
                        <button onClick={() => handlePostBtn()} className="normal_btn">Create a new Post...</button>
                    </div>

                </div>)
                :
                (<div style={{ width: "300px", margin: '50px auto' }}>
                    <div>You are not logged in Please login</div>

                    <button className="normal_btn" onClick={() => navigate("/register")}>Login</button>
                </div>)
            }

        </>


    )
}