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
            <Route exact path="/" element={<Signup/>} />
            <Route exact path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>} />
            {/* <Route path="/post" element={<Post/>}></Route> */}
            <Route exact path="/home" element={<Home/>}></Route>
            <Route exact path="/friends" element={<Friends/>} />
            <Route exact path="/chat" element={<MainChat/>} />
          </Routes>
        </>
    )
}