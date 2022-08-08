import { USER_DATA, IS_LOGGEDIN, USER_IMG,
     FRIEND_DATA, FRIEND_IMG, FRIEND_LIST_REFRESH, POST_REFRESH, POST_FLAG } from "../constant/userConstant";


const initialState = {
    userData: {},
    isLoggedIn: false,
    userImg: '',
    friendData: {},
    friendImg: '',
    friendListRefresh: false,
    postRefresh: false,
    postFlag: false
}


export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case IS_LOGGEDIN:
            return { ...state, isLoggedIn: payload }
        case USER_IMG:
            return { ...state, userImg: payload }
        case USER_DATA:
            return { ...state, userData: payload, isLoggedIn: true }
        case FRIEND_DATA:
            return { ...state, friendData: payload }
        case FRIEND_IMG:
            return { ...state, friendImg: payload }
        case FRIEND_LIST_REFRESH:
            return {...state, friendListRefresh: payload}
        case POST_REFRESH:
            return {...state, postRefresh: payload}
        case POST_FLAG:
            return {...state, postFlag: payload}
        default:
            return state
    }
}