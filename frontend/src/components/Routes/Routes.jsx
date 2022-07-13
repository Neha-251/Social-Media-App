import { Routes, Route } from "react-router-dom"
import { Friends } from "../friends/friend"
import { Home } from "../Home/home"
import { Login } from "../Login/login"
import { Navbar } from "../Navbar/navbar"
import { Post } from "../Post/post"
import { Profile } from "../Profile/profile"
import { Signup } from "../Signup/signup"
import { MainChat } from "../Chat/MainChat/MainChat"




export const AllRoutes = () => {
    return (
        <>

          <Navbar/>
          <Routes>
            <Route path="/signup" element={<Signup/>} />
            <Route path="/" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>} />
            {/* <Route path="/post" element={<Post/>}></Route> */}
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/friends" element={<Friends/>} />
            <Route path="/chat" element={<MainChat/>} />
          </Routes>
        </>
    )
}