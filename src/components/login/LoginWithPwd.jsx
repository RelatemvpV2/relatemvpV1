
import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";


import Button from '../buttonCopmponent/Button'
import Input from '../inputComponent/Input'
import LightBg from '../lightBg/LightBg'
import GreyBg from '../greyBg/GreyBg'

import { db } from "../../firebase_setup/firebase";
import { addDoc, collection, setDoc, doc, serverTimestamp, onSnapshot } from "firebase/firestore";


import {
    getAuth, createUserWithEmailAndPassword, signOut,
    signInWithEmailAndPassword,/* , onAuthStateChanged */
    AuthErrorCodes,
    sendPasswordResetEmail
}
    from "firebase/auth";




import './login.css'



const LoginWithPwd = () => {

    const auth = getAuth();

    const navigate = useNavigate();

    const [user, setUser] = useState()
    const [uid, setUid] = useState();
    const [userEmail, setUserEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginLoading, setLoginLoading] = useState(false)
    const [loginError, setLoginError] = useState("")
    const [infoMsg, setInfoMsg] = useState("")
    const [initialLoading, setInitialLoading] = useState(false)
    const [initialError, setInitialError] = useState('')
    const [signInPage, setSignInPage] = useState(false)
    const [forgotPwd, setForgotPwd] = useState(false)
    const [error,setError] = useState('')


    const location = useLocation()

    useEffect(() => {

        /*  const cachedUser = window.localStorage.getItem("uid");
         if(cachedUser)
         navigate("/CompleteProfile") */

        window.localStorage.setItem("uid", "");
        window.localStorage.setItem("email", "")

    }, [])


    const handleSigninPClick = () => {
        setSignInPage(true)
        setForgotPwd(false)
        navigate('/Login', true)
    }
    const handleSignUpPClick = () => {
        setSignInPage(false)
        setForgotPwd(false)
        navigate('/Login', true)
    }


    //signin user
    const handleSignIn = (e) => {
        e.preventDefault();
        setInfoMsg("signed you in ..")
        setForgotPwd(false)

        signInWithEmailAndPassword(auth, userEmail, password)
            .then((userCredential) => {
                setLoginLoading(false)

                const user = userCredential.user;

                
                /* console.log(user, "user signed in") */
                setUid(user.uid)
                window.localStorage.setItem("uid", user.uid)
                window.localStorage.setItem("email", userEmail)

                setUserEmail("");
                setPassword("")
                navigate("/CompleteProfile", { state: { email: userEmail } })
            })
            .catch((err) => {
                setLoginError(err.message)
            })
    }

    const handleOnClickSignUp = (e) => {
        e.preventDefault();
        setInfoMsg("creating an user..")
        setLoginLoading(true)
        setForgotPwd(false)

        //signup user
        createUserWithEmailAndPassword(auth, userEmail, password)
            .then(async (userCredential) => {
                setLoginLoading(false)

                const user = userCredential.user;
                setUser(user)
                setUid(user.uid)
                /*   try {
                    const docRef = await addDoc(collection(db,"Users"),{
                        email:userEmail,
                        userId : `${userCredential.user.uid}` 

                       
                    });
                }*/

                try {
                    const ref = doc(db, "Users", userCredential.user.uid)
                    const docRef = await setDoc(ref, { email: userEmail })

                    window.localStorage.setItem("uid", user.uid)
                    window.localStorage.setItem("email", userEmail)

                    setUserEmail("");
                    setPassword("");

                    navigate("/CompleteProfile")

                }
                catch (e) {
                    setError(`error in adding document ${e}`)
                   /*  console.log("error in adding document: ", e) */
                }

            })
            .catch(error => {
                setLoginLoading(false)
                if (error.code === "auth/email-already-in-use")
                    setLoginError("email already in use. Try signin")

                else if (error.code === AuthErrorCodes.WEAK_PASSWORD)
                    setLoginError("Passward must be 6 charecters")

                else
                    setLoginError(error.message)
            })


    }

    const handleOnChangeEmail = (e) => {
        setUserEmail(e.target.value)

    }
    const handleOnChangePwd = (e) => {
        setPassword(e.target.value)
    }

    const handleForgotPassword = (e) => {

        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('Password reset email sent')
            }).catch(error => {
                setLoginError(` ${error.message} ${userEmail}. Try signing up`)
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
                        (<>
                            {/* for a split secont we will see this screen */}
                            <GreyBg height={"70%"}>
                                <section className='login-btns-section'>
                                    {<h2 className='create-account-header'>{
                                        forgotPwd
                                            ? "Forgot password "
                                            : signInPage
                                                ? "Login "
                                                : "Create your account"}</h2>}
                                    <p className='Para'>Continue with..</p>
                                    <Input type='email' placeholder="Enter Email" required value={userEmail} onChangeMethod={handleOnChangeEmail} />
                                    {!forgotPwd && <Input type='password' placeholder="Enter Password" required value={password} onChangeMethod={handleOnChangePwd} />}
                                    {!forgotPwd && signInPage ? <>

                                        <p className={"signIn-text"} onClick={handleSignUpPClick}><span>Sign up here</span></p>
                                        {<p className={"forgot-password"} onClick={() => setForgotPwd(true)}>Forgot password</p>}

                                    </>
                                        : <><p className={"signIn-text"} onClick={handleSigninPClick}><span>Sign in here</span></p></>}
                                    {/*  {signInPage && <><p className={"forgot-password"} onClick={handleForgotPassword}>Forgot password</p></>} */}
                                    {/* show error msg */}
                                    {loginError !== "" && (<div className='error-msg'>{loginError}</div>)}
                                    {/* show info msg */}
                                    {infoMsg !== "" && (<div className='info-msg'>{infoMsg}</div>)}
                                </section>
                            </GreyBg>
                            <LightBg height={"30%"}>

                                <section className='login-continue-btn'>{
                                    loginLoading ? (<span>Logging you in... </span>) : forgotPwd ?
                                        <Button text={"Forgot password"} type="normal" onclickMethod={handleForgotPassword} />
                                        :

                                        signInPage ?
                                            <Button text={"Login"} type="normal" onclickMethod={handleSignIn} />
                                            : <Button text={"Sign up"} type="normal" onclickMethod={handleOnClickSignUp} />

                                }


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

export default LoginWithPwd




