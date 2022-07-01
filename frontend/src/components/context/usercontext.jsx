import { createContext, useState } from "react";



export const userContext = createContext()



export const  UserContextProvider = ({children}) => {
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [profile_img, setProfile_img] = useState("");
    
    const [refresh, setRefresh] = useState(false);


    const [data, setData] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    
    //console.log('data', data)
   

    const userLogin = (data) => {
        setUsername(data.username)
        setUserId(data.userId)
        setIsLoggedin(data.isLoggedin)
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
   
    return <userContext.Provider value={{datatotalPage, totalPage, data, allData, username, userId, profile_img, isLoggedin, userLogin, userImg, dataRefresh, refresh}} > {children}</userContext.Provider>
}


