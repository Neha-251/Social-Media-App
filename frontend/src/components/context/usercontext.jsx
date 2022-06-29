import { createContext, useState } from "react";



export const userContext = createContext()



export const  UserContextProvider = ({children}) => {
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [profile_img, setProfile_img] = useState("");
    //console.log('profile_img', profile_img)
    const [profileimg_file, setProfileimg_file] = useState("");
    //console.log('profileimg_file', profileimg_file)

    const [data, setData] = useState([]);
    console.log('data', data)
   

    const userLogin = (data) => {
        setUsername(data.username)
        setUserId(data.userId)
        setIsLoggedin(data.isLoggedin)
    }

    const userImg = (data) => {
      setProfile_img(data);
    }

    const userImgFile = (data) => {
      setProfileimg_file(data);
    }

    const allData = (data) => {
      setData(data);
    }
    
   
    return <userContext.Provider value={{data, allData, username, userId, profile_img, profileimg_file, isLoggedin, userLogin, userImg, userImgFile}} > {children}</userContext.Provider>
}


