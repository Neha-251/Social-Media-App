import { Routes, Route } from "react-router-dom"
import { Friends } from "../friends/friend"
import { Home } from "../Home/home"
import { Login } from "../Login/login"
import { Navbar } from "../Navbar/navbar"
import { Post } from "../Post/post"
import { Profile } from "../Profile/profile"
import { Signup } from "../Signup/signup"
import { MainChat } from "../Chat/MainChat/MainChat"
import { useEffect, useState } from "react"





export const AllRoutes = () => {


  return (
    <>

      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} > </Route>
        <Route path="/login" element={<Login />}> </Route>
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/friends" element={<Friends />} />
        <Route exact path="/chat" element={<MainChat />} />
      </Routes>
    </>
  )
}