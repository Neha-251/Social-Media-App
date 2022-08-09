import { useContext, useEffect, useState } from "react";
import GoogleLogin from 'react-google-login';
import axios from "axios";
import spinner from "../image/spinner3.gif";
import { Link, useNavigate } from "react-router-dom";
import "@sweetalert2/themes/material-ui/material-ui.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/action/userAction";
import Swal from 'sweetalert2/src/sweetalert2.js'

export const Login = () => {


    const dispatch = useDispatch()
    const userData = useSelector(state => state.userData.userData)


    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post("https://social-media-neha2.herokuapp.com/users/login", data).then(res => {
            axios.get(`https://social-media-neha2.herokuapp.com/users/single?emailId=${data.email}`).then(res => {
                localStorage.setItem("userId_socialMedia", res.data._id)
                localStorage.setItem("username_socialMedia", res.data.name)
                localStorage.setItem("usercity_socialMedia", res.data.city)
                localStorage.setItem("userdob_socialMedia", res.data.dob)
                localStorage.setItem("useremail_socialMedia", res.data.email)
                dispatch(setUserData(res.data))
                setLoading(false)
                navigate('/profile')
            })
        }).catch(err => {


            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'warning',
                title: 'Email is not Registered!'
            })
            setLoading(false)
        })

    }




    return (
        <><div className={loading === true ? "loading_screen" : "display_none"}>
            <img src={spinner} alt="spinner" />
        </div>

            <div className="signup_form">

                <h1 className="heading_register">Log In</h1>


                <form action="" onSubmit={handleSubmit} >

                    <input type="text" placeholder="Alexa Bardot" name="name" onChange={handleChange} value={data.name} className="form_inp" /> <br />
                    <input type="email" placeholder="alexa@gmail.com" name="email" onChange={handleChange} value={data.email} className="form_inp" /><br />
                    <input type="password" placeholder="*******" name="password" onChange={handleChange} value={data.password} className="form_inp" /><br />


                    <input type="submit" value="Log In" className="signup_btn normal_btn" />

                    <div className="altDiv">New User?<Link to="/"> <span className="text_btn">Create a new account</span></Link></div>
                </form>


            </div>
        </>
    )
}

