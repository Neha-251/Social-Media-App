import { useState } from "react";
import "./signup.css";
import axios from "axios";
import spinner from "../image/spinner3.gif";
import { Link, useNavigate } from "react-router-dom";
import "@sweetalert2/themes/material-ui/material-ui.css";
import Swal from 'sweetalert2/src/sweetalert2.js'
// @import '~@sweetalert2/themes/dark/dark.scss';

export const Signup = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        city: "",
        dob: ""
    });



    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();

        if (data.name === "" || data.email === "" || data.password === "" || data.city === "" || data.dob === "") {
            // alert("Please fill all the details")
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: 'Please Fill All of the Details'
            })

           
            setLoading(false);

        } else {
            axios.post("https://social-media-neha2.herokuapp.com/users/signup", data)
                .then(res => {
                    setLoading(false)
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
                        title: 'SignUp Successful'
                    })
                    navigate("/login")
                }).catch(err=> {
                    setLoading(false)

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'warning',
                        title: 'Email is already registered!'
                    })
                })
        }
    }




    return (
        <>

            <div className={loading === true ? "loading_screen" : "display_none"}>
                <img src={spinner} alt="spinner" />
            </div>

            <div className="signup_form">

                <h1 className="heading_register">Create a New Account</h1>


                <form action="" onSubmit={handleSubmit} >

                    <input type="text" placeholder="Alexa Bardot" name="name" onChange={handleChange} value={data.name} className="form_inp" /> <br />
                    <input type="email" placeholder="alexa@gmail.com" name="email" onChange={handleChange} value={data.email} className="form_inp" /><br />
                    <input type="password" placeholder="*******" name="password" onChange={handleChange} value={data.password} className="form_inp" /><br />
                    <input type="text" placeholder="Delhi" name="city" value={data.city} onChange={handleChange} className="form_inp" /><br />
                    <input type="date" min="1950-1-1" max="2022-1-1" placeholder="Date of Birth" name="dob" value={data.dob} onChange={handleChange} className="form_inp" />

                    <input type="submit" value="Create Account" className="signup_btn normal_btn" />

                    <div className="altDiv">
                        Already have an account?
                        <Link to="/login" >
                            <span className="text_btn"> Sign In</span>
                        </Link>
                    </div>
                </form>


            </div>
        </>
    )
}

