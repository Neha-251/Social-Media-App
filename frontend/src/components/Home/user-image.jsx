import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"




export const Userimage = (userId) => {

    const [pic, setPic] = useState("");

    useEffect(()=> {
        axios.get(`http://localhost:5000/profilepic/get/single?userId=${userId.userId}`)
        .then(res => setPic(res.data)).catch(err => console.log(err))
    })


    return (
        <>
         <img className="comment_userImg" src={pic} alt="user-image" />
        </>
    )
}