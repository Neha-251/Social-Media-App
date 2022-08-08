import axios from 'axios';
import { USER_DATA, IS_LOGGEDIN, USER_IMG, FRIEND_DATA,
     FRIEND_IMG, FRIEND_LIST_REFRESH, POST_REFRESH, POST_FLAG } from '../constant/userConstant';

export const setUserData = (payload) => {
    return {
        type: USER_DATA,
        payload: payload
    }
}

export const setUserImg = (payload) => {
    return {
        type: USER_IMG,
        payload: payload
    }
}


export const setIsLoggedIn = (payload) => {
    return {
        type: IS_LOGGEDIN,
        payload: payload
    }
}

export const setFriendData = (payload) => {
    return {
        type: FRIEND_DATA,
        payload: payload
    }
}


export const setFriendImg = (payload) => {
    return {
        type: FRIEND_IMG,
        payload: payload
    }
}

export const setFriendListRefresh= (payload) => {
    return {
        type: FRIEND_LIST_REFRESH,
        payload: payload
    }
}

export const setPostRefresh = (payload) => {
    return {
        type: POST_REFRESH,
        payload: payload
    }
}

export const setPostFlag = (payload) => {
    return {
        type: POST_FLAG,
        payload: payload
    }
}


export const getUserData = () => (dispatch) => {
    let data = {
        userId: localStorage.getItem("userId_socialMedia"),
        username: localStorage.getItem("username_socialMedia"),
        city: localStorage.getItem("usercity_socialMedia"),
        dob: localStorage.getItem("userdob_socialMedia"),
        email: localStorage.getItem("useremail_socialMedia")
    }
    dispatch(setUserData(data))
    dispatch(setIsLoggedIn(true))
}

export const getUserImg = (userId) => (dispatch) => {

    axios(`https://social-media-neha2.herokuapp.com/profilepic/get/single?userId=${userId}`)
        .then((res) => {

            dispatch(setUserImg(res.data))
            console.log('res.data', res.data)

        })
        .catch()
}

export const getFriendData = (friendId) => (dispatch)=> {
    axios.get(`https://social-media-neha2.herokuapp.com/users/${friendId}`)
    .then(res => dispatch(setFriendData(res.data)))
}

export const getFriendImg = (friendId) => (dispatch) => {
    axios.get(`https://social-media-neha2.herokuapp.com/profilepic/get/single?userId=${friendId}`)
    .then(res => dispatch(setFriendImg(res.data)))
}