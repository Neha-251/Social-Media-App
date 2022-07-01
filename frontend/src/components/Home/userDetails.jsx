import { useEffect, useState } from "react";



export const UserDetails = (user) => {
   // console.log('user', user)
   const [userD, setUserD] = useState({});
   console.log('userD', userD)
    
   useEffect(()=> {
    setUserD(user.user);

   }, [])
    



    return (
        <div className="post_user">
            <p className="post_username">{userD.name}</p>
            <p className="post_usercity">{userD.city}</p> 
        </div>
    )
}