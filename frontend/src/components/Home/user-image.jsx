import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"




export const Userimage = (userId) => {

    const [pic, setPic] = useState("");

    useEffect(()=> {
        axios.get(`https://social-media-neha2.herokuapp.com/profilepic/get/single?userId=${userId.userId}`)
        .then(res => setPic(res.data)).catch()
    })


    return (
        <>
         <img className="comment_userImg" src={pic} alt="user-image" />
        </>
    )
}