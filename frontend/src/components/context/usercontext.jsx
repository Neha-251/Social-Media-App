import { createContext, useState } from "react";



export const userContext = createContext()



export const  UserContextProvider = ({children}) => {
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userPassword, setUserPassword] = useState("");
    const [userCity, setUserCity] = useState("");
    const [userDob, setUserDob] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [profile_img, setProfile_img] = useState("");
    
    const [refresh, setRefresh] = useState(false);
    const [postFlag, setPostFlag] = useState(false);


    const [data, setData] = useState([]);
    const [totalPage, setTotalPage] = useState(0);


    const [friendName, setFriendName] = useState("");
    const [friendCity, setFriendCity] = useState("");
    const [friendImg, setFriendImg] = useState("");


    const[friendListRefresh, setFriendListRefresh] = useState(false)
    
    

    const userLogin = (data) => {
        setUsername(data.username)
        setUserId(data.userId)
        setIsLoggedin(true)
        setUserCity(data.city)
        setUserPassword(data.password)
        setUserDob(data.dob);
        setUserEmail(data.email);
    }

    const userImg = (data) => {
      setProfile_img(data);
    }

    
    const allData = (data) => {
      setData(data);
    }

    const datatotalPage = (data) => {
      setTotalPage(data);
    }
    
    const dataRefresh = (data) => {
      setRefresh(data);
    }
   
    return <userContext.Provider value={{
      datatotalPage, totalPage, data, allData, 
      username, userId, profile_img, isLoggedin, userLogin, userImg,
      userDob, userCity, userEmail, userPassword,
      dataRefresh, refresh, postFlag, setPostFlag,
      setFriendCity, friendCity, setFriendImg, friendImg, setFriendName, friendName,
      friendListRefresh, setFriendListRefresh, setUserId

    }} > {children}</userContext.Provider>
}


