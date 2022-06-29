import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/usercontext";
import { Navbar } from "../Navbar/navbar";
import "./profile.css"


export const Profile = () => {

    const navigate = useNavigate();
    const { userImg, userId, profile_img, userImgFile, profileimg_file } = useContext(userContext);

    const [profileimgBase, setProfileImgBase] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [profilePicPreview, setProfilePicPreview] = useState("");


    const [postFlag, setPostFlag] = useState(false);


    const getProfilePic = () => {


        axios.get(`http://localhost:5000/profilepic/get/single?userId=${userId}`)
            .then(res => {

                let singleData = res.data.data;

                setProfileImgBase(singleData);
                userImg(singleData)

            })
            .catch(error => console.error(error))
    }

    useEffect(() => {
        getProfilePic();
    }, [])

    const handleProfilePicChange = (e) => {
        let file = e.target.files[0];
        setProfilePic(file);
        changeFile(file);
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
        if (profile_img === "") {
            axios.post("http://localhost:5000/profilepic/create", formData)
                .then(res => {
                    userImg(profilePicPreview)
                    userImgFile(profilePic)
                }).then(res => alert("Profile Picture has been set")).catch(error => console.log(error))
        } else {
            axios.delete(`http://localhost:5000/profilepic/delete?userId=${userId}`)
                .then(
                    axios.post("http://localhost:5000/profilepic/create", formData)
                        .then(res => {
                            userImg(profilePicPreview)
                            userImgFile(profilePic)
                        }).then(res => alert("Profile Picture has been Updated")).catch(error => console.log(error))
                ).catch(err => alert("Something Went Wrong!!"))
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
                        <img src={profilePicPreview === "" ? `data:image/png;base64,${profile_img}` : profilePicPreview} className="profile_img" alt="profile_pic" />
                        {/* <img src={profileimgBase} className="profile_img" alt="profile_pic"/> */}
                    </div>

                    {/* <div >
                    <img src={profilePicPreview} alt="profilePic"/>
                </div> */}

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