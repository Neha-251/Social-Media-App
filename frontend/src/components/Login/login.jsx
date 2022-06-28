import { useContext, useEffect, useState } from "react";
import GoogleLogin from 'react-google-login';
import axios from "axios";
import spinner from "../image/spinner3.gif";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userContext } from "../context/usercontext";
import { Navbar } from "../Navbar/navbar";


export const Login = () => {

    const { userLogin, userId } = useContext(userContext);

    const [userDetails, setuserDetails] = useState({
        username: "",
        userId: "",
        isLoggedIn: false
    })

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    

    const [userData, setUserData] = useState({});


    const responseGoogleSuccess = async(response) => {
       setLoading(true);
      
        console.log("response-success", response.profileObj);
        let email = response.profileObj.email
       
        try{
            console.log('email', email)

            //`https://social-media-neha.herokuapp.com/users/single?emailId=${email}`
            //let res = await fetch("https://social-media-neha.herokuapp.com/users/single?emailId=nehasen2510@gmail.com")
           
            
            let res = await fetch(`https://social-media-neha.herokuapp.com/users/single?emailId=${email}`)
            let data = await res.json();
            console.log('data', data)
    
           // setUserData(data)
            setuserDetails({ ...userDetails, username: data.name, userId: data._id, isLoggedIn: true });
            
                
            
        }
        catch(err) {
            console.error('err', err)
            setLoading(false);
        }
       
       
    }

    useEffect(()=> {
        userLogin(userDetails);
        //console.log('userDetails', userDetails)
        setLoading(false);
        if(userId){
            navigate("/profile")
        }
    }, [userDetails, userId])
    
    const responseGoogleFailure = (response) => {
        console.error("response-failure", response);
    }


    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const handleLogin = () => {
       // console.log("googleInfo", googleInfo)
        let email = data.email;
        console.log('email', email)
        //
      //  https://social-media-neha.herokuapp.com/users/single?emailId=neha712513@gmail.com
        axios.get(`https://social-media-neha.herokuapp.com/users/single?emailId=${email}`).then(res => setUserData(res.data)).catch(err => {
            alert(err)
            console.log('err', err)
            setLoading(false)
        })

    }

    useEffect(() => {
       console.log("userData", userData)
       setuserDetails({ ...userDetails, username: userData.name, userId: userData._id, isLoggedIn: true });
       userLogin(userDetails);
       setLoading(false)
       if(userId){
        navigate("/profile")
       }
    }, [userData, userId])

   // console.log(userDetails)
    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(data)
        axios.post("https://social-media-neha.herokuapp.com/users/login", data).then(res => {
            console.log('res', res)

            handleLogin()
        }).catch(err => {
            alert(err)
            console.log('errPost', err)
            setLoading(false)
        })
            
    }



    //console.log(data);

    return (
        <><div className={loading === true ? "loading_screen" : "display_none"}>
            <img src={spinner} alt="spinner" />
        </div>

        <Navbar/>
            <div className="signup_form">

                <h1 className="heading_register">Log In</h1>

                <GoogleLogin
                    clientId="684237123379-9inof3f9a3sqa680bt3kikpngok2buil.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    theme="light"
                    onSuccess={responseGoogleSuccess}
                    onFailure={responseGoogleFailure}
                    cookiePolicy={'single_host_origin'}
                />

                <div className="or">OR</div>

                <form action="" onSubmit={handleSubmit} >

                    <input type="text" placeholder="Alexa Bardot" name="name" onChange={handleChange} value={data.name} className="form_inp" /> <br />
                    <input type="email" placeholder="alexa@gmail.com" name="email" onChange={handleChange} value={data.email} className="form_inp" /><br />
                    <input type="password" placeholder="*******" name="password" onChange={handleChange} value={data.password} className="form_inp" /><br />
                    {/* <input type="text" placeholder="Delhi" className="form_inp" /><br />
                <input type="date" placeholder="DD/MM/YYYY" className="form_inp" /> */}

                    <input type="submit" value="Log In" className="signup_btn normal_btn" />

                    <div className="altDiv">New User?<Link to="/signup"> <span className="text_btn">Create a new account</span></Link></div>
                </form>


            </div>
        </>
    )
}

