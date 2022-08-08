import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./post.css";
import "@sweetalert2/themes/material-ui/material-ui.css";
import Swal from 'sweetalert2/src/sweetalert2.js'
import spinner from "../image/spinner3.gif";
import { useDispatch, useSelector } from "react-redux";
import { setPostFlag } from "../../redux/action/userAction";


export const Modal = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData.userData)
    const userImg = useSelector(state => state.userData.userImg)
    const postFlag = useSelector(state => state.userData.postFlag)

    const [loading, setLoading] = useState(false);


    const [postImg, setPostImg] = useState([]);
    const [postPreview, setPostPreview] = useState([]);


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [submitFlag, setSubmitFlag] = useState(true);

    const handleChangetitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangedescription = (e) => {
        setDescription(e.target.value);
    }


    const handleClearImgDiv = () => {

        if (window.confirm("You want to clear files!!")) {
            setPostImg([]);
            setPostPreview([]);
            // document.querySelector(".post_pic_div").src = "";
        }

    }

    const handlePostPicChange = (e) => {
        let file = e.target.files[0];

        setPostImg([
            ...postImg,
            file
        ]);


    }


    const changeFile = () => {
        let files = postImg;
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onloadend = () => {
                //setPostPreview(reader.result);
                setPostPreview([
                    ...postPreview,
                    reader.result
                ])
            };
        }

    }
    useEffect(() => {
        changeFile();
    }, [postImg])


    const [reactionId, setReactionId] = useState("");
    const [commentId, setCommentId] = useState("");
    const [parentId, setParentId] = useState("");

    const handleDelaySubmit = (e) => {
        e.preventDefault();
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
            title: 'Please wait a few seconds to create another post!'
        })
        setTimeout(() => {
            setSubmitFlag(true);
        }, 15000)
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        if (submitFlag === true) {

            setLoading(true);

            let parent_id = Math.random();

            let reactionData = {
                parent_id: parent_id,
                reactions: []
            }

            let commentData = {
                parent_id: parent_id,
                comments: []
            }


            axios.post("https://social-media-neha2.herokuapp.com/reaction/create", reactionData)
                .then(res => {
                    setReactionId(res.data._id);


                }).catch(error => {
                    setLoading(false);
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
                        icon: 'error',
                        title: "Your post Failed"
                    })
                })

            axios.post("https://social-media-neha2.herokuapp.com/comment/create", commentData)
                .then(res => {
                    setCommentId(res.data._id);
                    setParentId(parent_id)


                }).catch(error => {
                    setLoading(false);
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
                        icon: 'error',
                        title: "Your post Failed"
                    })
                })
            setSubmitFlag(false)

        }
    }

    const createPost = () => {
        
        if (reactionId && commentId) {

            let formData = new FormData();


            for (let i = 0; i < postImg.length; i++) {
                formData.append("post_file", postImg[i]);
            }
            formData.append("title", title);
            formData.append("description", description);
            formData.append("parent_id", parentId);
            formData.append("user_id", userData.userId);

            formData.append("comment_id", commentId);
            formData.append("reaction_id", reactionId);
            formData.append("profile_img", userImg);


            axios.post("https://social-media-neha2.herokuapp.com/post/create", formData)
                .then(res => {
                    setLoading(false);

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
                        title: "Your post is successful"
                    })
                }).catch(error => {
                    setLoading(false);
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
                        icon: 'error',
                        title: "Your post Failed"
                    })
                })
        }
    }

    useEffect(() => {
        createPost()
    }, [commentId, reactionId])


    return (

        <>

            <div className={loading === true ? "loading_screen" : "display_none"}>
                <img src={spinner} alt="spinner" />
            </div>
            <div className="post_popup_div">
                <div className="wrong_symbol" onClick={() => dispatch(setPostFlag(false))}>✖</div>
                <div className="post_mainDiv">

                    <div onClick={handleClearImgDiv} className="imgCorss">✖</div>

                    <div className="post_pic_div">
                        {postPreview.map((el) => {
                            return (

                                <img src={el} className="post_img" alt="choose file to see preview" />

                            )

                        })}

                    </div>

                    <form action="" className="post_form_div" onSubmit={submitFlag === true ? handleSubmit : handleDelaySubmit}>
                        <textarea name="" value={title} onChange={handleChangetitle} placeholder="Title..." cols="46" rows="1" className="title_post"></textarea> <br />
                        <textarea name="" value={description} onChange={handleChangedescription} placeholder="Description..." cols="46" rows="2" className="desc_post"></textarea> <br />

                        <input name="post" type="file" multiple="multiple" max="5" onChange={handlePostPicChange} className="post_inp" />
                        <input type="submit" value="Post" className="normal_btn" />
                    </form>
                </div>
            </div>
        </>
    )
}