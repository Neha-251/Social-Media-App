import { useEffect, useState } from "react";



export const UserDetails = (user) => {
   const [userD, setUserD] = useState({});
    
   useEffect(()=> {
    setUserD(user.user);

   }, [user])
    



    return (
        <div className="post_user">
            <p className="post_username">{userD.name}</p>
            <p className="post_usercity">{userD.city}</p> 
        </div>
    )
}