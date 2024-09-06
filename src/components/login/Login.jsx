import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation,useParams } from "react-router-dom"
import { auth } from '../../firebase_setup/firebase';
import {  getAuth,onAuthStateChanged } from "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';

import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';

import Button from '../buttonCopmponent/Button'
import Input from '../inputComponent/Input'
import LightBg from '../lightBg/LightBg'
import GreyBg from '../greyBg/GreyBg'

import './login.css'



const Login = () => {
const [loggeduser,setLoggeduser] = useState();

    const [userState, setUserState] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [loginLoading, setLoginLoading] = useState(false)
    const [loginError, setLoginError] = useState("")
    const [infoMsg, setInfoMsg] = useState("")

    const [initialLoading, setInitialLoading] = useState(false)
    const [initialError, setInitialError] = useState('')


    const [user] = useAuthState(auth);

    const navigate = useNavigate();
    const location = useLocation();
    let { email } = useParams();

    useEffect(() => {

       //if(user)
       if (user) {
                setUserState("User already logged in")
                navigate('/CompleteProfile', true)
        }
        else {

            /* User not signed in but link is valid  */
            if (isSignInWithEmailLink(auth, window.location.href)) {
                /* not in case user clicks the email link on a different device , we will ask for email confirmation */
                let email = localStorage.getItem('email');
                if (!email) {
                    email = window.prompt('Please provide your email')
                }
                //after thet we will complete the login process
                setInitialLoading(true)
                signInWithEmailLink(auth, localStorage.getItem('email'), window.location.href)
                //success of SigninwithEmailLink will redirect us to the next page (completeProfile) route
                    .then((result) => {
                        //we can get the user from result.user. But no need for this case.
                       
                        localStorage.removeItem("email")
                        setInitialLoading(false)
                        setInitialError("")
                        navigate('/Login')
                    }).catch((error) => {
                        setInitialLoading(false)
                        setInitialError(error.message)
                        navigate('/Login')
                    })
            }
            else {
               
                console.log('enter email and sign in')
            }
            /*  setUserState("User not signed in but link is valid")
             navigate('/Login', true) */
        }

        return () => {
                
        }
    }, [loggeduser, navigate])

  /*   console.log("user state : ", userState) */

    const handleOnChange = (e) => {
        setUserEmail(e.target.value)
    }

    const  handleOnClickLogin = (e) => {
        e.preventDefault();
        setLoginLoading(true)
        sendSignInLinkToEmail(auth, userEmail, {
            /* This is the url that we will redirect back to after clicking on the link in mailbox */
            url: 'http://localhost:3000/CompleteProfile',
            handleCodeInApp: true,
        }).then((res) => {
            console.log(res,"::::resssss")
            localStorage.setItem("email", userEmail);
            setLoginLoading(false)
            setLoginError("")
            setInfoMsg('We have sent you an email with a link to sign in. Please check your spam or trash if you cannot find the email in your inbox.')
        }).catch(error => {
            setLoginLoading(false)
            setLoginError(error.message)
        })

     
    }

    return (
        <div className='login-page'>

            {initialLoading ? (
                <div>Loading...</div>
            ) : (

                <>{
                    initialError !== '' ? (
                        <div className='error-msg'>{initialError}</div>
                    ) : (
/* We are checking user because, for a split of second we will not have user */
                        loggeduser ?(
                            <div>Please wait..</div>
                        ) :  (<>
                        {/* for a split secont we will see this screen */}
                            <GreyBg height={"75%"}>
                                <section className='login-btns-section'>
                                    <h2 className='create-account-header'>Create your account</h2>
                                    <p className='Para'>Continue with..</p>
                                   {/*  <Button text="Google" type="social" disabled='yes' />
                                    <Button text="Facebook" type="social" disabled='yes' />
                                    <Button text="Linkedin" type="social" disabled='yes' />
                                    <Button text="Microsoft" type="social" disabled='yes' /> */}
                                    <Input type='email' placeholder="Enter Email" required value={userEmail} onChangeMethod={handleOnChange} />
                                </section>
                            </GreyBg>
                            <LightBg height={"25%"}>
                                <section className='login-continue-btn'>{
                                    loginLoading ? (<span>Logging you in </span>) :
                                        <Button text={"Login"} type="normal" onclickMethod={handleOnClickLogin} />
                                }
                                    {/* show error msg */}
                                    {loginError !== "" && (<div className='error-msg'>{loginError}</div>)}
                                    {/* show info msg */}
                                    {infoMsg !== "" && (<div className='info-msg'>{infoMsg}</div>)}

                                </section>
                            </LightBg>
                        </>

                        )
                    )
                }
                </>
            )}

        </div>
    )
}

export default Login