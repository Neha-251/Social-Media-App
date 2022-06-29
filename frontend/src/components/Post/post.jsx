import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/usercontext";
import "./post.css";


export const Post = () => {

    const { userId, profile_img, profileimg_file } = useContext(userContext);
    console.log('profileimg_file', profileimg_file)
    const navigate = useNavigate();

    const [postImg1, setPostImg1] = useState("");
    const [postPreview, setPostPreview] = useState("");


    console.log('profileimg_file', profileimg_file)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleChangetitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangedescription = (e) => {
        setDescription(e.target.value);
    }


    const handlePostPicChange = (e) => {
        let file = e.target.files[0];
        setPostImg1(file);
        changeFile(file);
    }

    const changeFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPostPreview(reader.result);
        };
    }


    const [reactionId, setReactionId] = useState("");
    const [commentId, setCommentId] = useState("");
    const [parentId, setParentId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        let parent_id = Math.random();

        let reactionData = {
            parent_id: parent_id,
            reactions: []
        }

        let commentData = {
            parent_id: parent_id,
            comments: []
        }


        axios.post("http://localhost:5000/reaction/create", reactionData)
            .then(res => {
                console.log(res.data)
                setReactionId(res.data._id);
                console.log('res.data._id', res.data._id)


            }).catch(error => console.log(error))

        axios.post("http://localhost:5000/comment/create", commentData)
            .then(res => {
                console.log(res.data)
                console.log('res.data._id', res.data._id)
                setCommentId(res.data._id);
                setParentId(parent_id)
                // setTimeout(()=>{
                //     createPost(parentId);
                // }, 10000)

            }).catch(error => console.log(error))
    }

    const createPost = () => {
        console.log('commentId', commentId)
        console.log('reactionId', reactionId)
        if (reactionId && commentId) {

            let formData = new FormData();
            formData.append("post_file", postImg1);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("parent_id", parentId);
            formData.append("user_id", userId);

            formData.append("comment_id", commentId);
            console.log('commentId', commentId)
            formData.append("reaction_id", reactionId);
            console.log('reactionId', reactionId)
            formData.append("profile_img", profileimg_file);

            axios.post("http://localhost:5000/post/create/single", formData)
                .then(res => {
                    console.log(res.data)

                }).catch(error => console.log(error))
        }
    }

    useEffect(() => {
        createPost()
    }, [commentId, reactionId])


    return (
        <div className="post_popup_div">
            <div className="wrong_symbol" onClick={() => { navigate("/profile") }}>✖</div>
            <div className="post_mainDiv">
                <div className="post_pic_div">
                    <img src={postPreview} className="post_img" alt="Please upload file within 5mb" />
                </div>

                <form action="" className="post_form_div" onSubmit={handleSubmit}>
                    <textarea name="" value={title} onChange={handleChangetitle} placeholder="Title..." cols="46" rows="1" className="title_post"></textarea> <br />
                    <textarea name="" value={description} onChange={handleChangedescription} placeholder="Description..." cols="46" rows="2" className="desc_post"></textarea> <br />

                    <input name="post" type="file" onChange={handlePostPicChange} className="post_inp" />
                    <input type="submit" value="Post" className="normal_btn" />
                </form>
            </div>
        </div>
    )
}