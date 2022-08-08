import "./friends.css";
import axios from "axios"
import { useEffect, useState } from "react";
import { Userimage } from "../Home/user-image";
import "@sweetalert2/themes/material-ui/material-ui.css";
import Swal from 'sweetalert2/src/sweetalert2.js'
import { UserDetails } from "./UserDetails";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';

export const Friends = () => {

    const [users, setUsers] = useState([])
    const [friends, setFriends] = useState([])

    const [friendList, setFriendList] = useState([])
    const [friendId, setFriendId] = useState("")
    const [ready, setReady] = useState(false)
    const [refresh, setRefresh] = useState(false);

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData.userData)
    const userImg = useSelector(state => state.userData.userImg)



    const getData = () => {
        axios.get("https://social-media-neha2.herokuapp.com/users").then(res => setUsers(res.data))
            .catch(err => console.log(err))

        axios.get(`https://social-media-neha2.herokuapp.com/friends/${userData.userId}`).then(res => {setFriends(res.data[0].friends)})

    }

    useEffect(() => {
        getData()
    }, [refresh])

    const handleConnect = (id) => {
        axios.get(`https://social-media-neha2.herokuapp.com/friends/${userData.userId}`)
            .then(res => {
                if (res.data.length === 0) {
                    setFriendList([]);
                    setReady(true);
                    setFriendId(id)
                } else {
                    setFriendList(res.data[0].friends);
                    let count = 0;
                    for (let i = 0; i < friendList.length; i++) {
                        if (friendList[i] === id) {
                            count++;
                        }
                    }
                    if (count === 0) {
                        setReady(true);
                        setFriendId(id)
                    }
                }
            }).catch(err => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'warning',
                    title: 'Something went wrong!'
                })

            })
    }

    useEffect(() => {
        const addFriend = () => {

            if (friendList.length === 0) {

                let data = {
                    "friendId": friendId,
                    "userId": userData.userId
                }
                axios.post("https://social-media-neha2.herokuapp.com/friends", data)
                    .then(res => {

                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'success',
                            title: 'Congrats! a new friend'
                        })
                        setRefresh(true)

                    }).catch(err => alert(err))
            } else {
                let data = {
                    "friendId": friendId
                }
                axios.patch(`https://social-media-neha2.herokuapp.com/friends/add/${userData.userId}`, data)
                    .then(res => {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'success',
                            title: 'Congrats! a new friend'
                        })
                        setRefresh(true)
                    }).catch(err => alert(err))

            }
        }

        if (ready === true) {
            addFriend()
            setReady(false)
        }
        setRefresh(false)

    }, [friendId])



    return (
        <>
        {
            userData.userId? 
            <div className="friend_Main_Container">
            <div className="friends_mainDiv1">
                <h3>Your Friends</h3>
                {
                    friends.map((el)=> {
                        return (
                            <div key={el} className="friends_div">
                                <div>
                                    <Userimage userId={el} />
                                    <UserDetails user={el}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="friends_mainDiv2">
                <h3>You may know</h3>
                {
                    users.map((el) => {
                        return (
                            <div key={el._id} className="friends_div">
                                <div>
                                    <Userimage userId={el._id} />
                                    <div>
                                        <p>{el.name}</p>
                                        <p>{el.city}</p>
                                    </div>
                                </div>
                                <button className="connect_btn" onClick={() => handleConnect(el._id)}>Connect</button>

                            </div>
                        )
                    })
                }
            </div>
        </div>
        : 
        <div style={{ width: "300px", margin: '50px auto' }}>
        <div>You are not logged in Please login</div>

        <button className="normal_btn" onClick={() => navigate("/register")}>Login</button>
    </div>
        }
        
        </>
    )
}