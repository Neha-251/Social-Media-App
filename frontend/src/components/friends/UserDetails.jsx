import axios from "axios";
import { useEffect, useState } from "react";



export const UserDetails = ({user}) => {
   
   const [userD, setUserD] = useState({});
    
   useEffect(()=> {
    axios.get(`https://social-media-neha2.herokuapp.com/users/${user}`)
    .then(res=> 
        {
            setUserD(res.data);
        }
    )
   }, [])
    


    return (
        <div className="post_user">
            <p className="post_username">{userD.name}</p>
            
            <p className="post_usercity">{userD.city}</p> 
        </div>
    )
}