import { useContext, useEffect, useState } from "react";
import GoogleLogin from 'react-google-login';
import axios from "axios";
import spinner from "../image/spinner3.gif";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/usercontext";
import "@sweetalert2/themes/material-ui/material-ui.css";
import Swal from 'sweetalert2/src/sweetalert2.js'

export const Login = () => {

    const { userLogin, userId } = useContext(userContext);

    const [uDetails, setuDetails] = useState({
        username: "",
        userId: "",
        isLoggedIn: false,
        email: "",
        password: "",
        city: "",
        dob: "",
    })

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });



    const [userData, setUserData] = useState({});


    useEffect(() => {
        userLogin(uDetails);
        

        setLoading(false);
        if (userId!==undefined && userId!=='undefined' && userId!=="") {
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
                icon: 'success',
                title: 'Signed in successfully'
            })


            navigate("/profile")


        } else {

        }
    }, [uDetails, userId])

    // const responseGoogleFailure = (response) => {
    //     //console.error("response-failure", response);
    //     const Toast = Swal.mixin({
    //         toast: true,
    //         position: 'top-end',
    //         showConfirmButton: false,
    //         timer: 3000,
    //         timerProgressBar: true,
    //         didOpen: (toast) => {
    //             toast.addEventListener('mouseenter', Swal.stopTimer)
    //             toast.addEventListener('mouseleave', Swal.resumeTimer)
    //         }
    //     })

    //     Toast.fire({
    //         icon: 'warning',
    //         title: 'Something Went Wrong!'
    //     })
    // }


    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const handleLogin = () => {

        let email = data.email;


        axios.get(`https://social-media-neha2.herokuapp.com/users/single?emailId=${email}`).then(res => setUserData(res.data)).catch(err => {

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
                title: 'Email is not registered!'
            })
            setLoading(false)
        })

    }

    useEffect(() => {
       
        setuDetails({ ...uDetails, username: userData.name, userId: userData._id, isLoggedIn: true, password: userData.password,
            email: userData.email, dob: userData.dob, city: userData.city });
        userLogin(uDetails);
        setLoading(false)

        localStorage.setItem("userId_socialMedia", userData._id)
        localStorage.setItem("username_socialMedia", userData.name)
        localStorage.setItem("userdob_socialMedia", userData.dob)
        localStorage.setItem("usercity_socialMedia", userData.city)
        localStorage.setItem("useremail_socialMedia", userData.email)


        if (userId!==undefined && userId!=='undefined' && userId!=="") {
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
                icon: 'success',
                title: 'Signed in successfully'
            })

            navigate("/profile")
        } 
    }, [userData, userId])

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post("https://social-media-neha2.herokuapp.com/users/login", data).then(res => {


            handleLogin()
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

