import { Routes, Route } from "react-router-dom"
import { Home } from "../Home/home"
import { Login } from "../Login/login"
import { Post } from "../Post/post"
import { Profile } from "../Profile/profile"
import { Signup } from "../Signup/signup"



export const AllRoutes = () => {
    return (
        <>
          <Routes>
            <Route path="/signup" element={<Signup/>} />
            <Route path="/" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>} />
            <Route path="/post" element={<Post/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
          </Routes>
        </>
    )
}