import { useLayoutEffect, useState } from "react";
import { useContext } from "react";
import { Outlet,Navigate } from "react-router-dom";
import { auth } from '../firebase_setup/firebase';
import { onAuthStateChanged } from "firebase/auth";



const PrivateRoutes = () => {
    const [uid,setUid] = useState('')

    useLayoutEffect(()=>{
        const cachedUser = window.localStorage.getItem("uid") || auth.currentUser.uid;
        console.log("cashedUser in useEffect", cachedUser)
        setUid(cachedUser)
    },[])
  
/* console.log("cashedUser", uid)
console.log("auth", auth.currentUser.uid) */

    return  uid!== null &&
    uid!== undefined ? <Outlet uid={uid}/>: <Navigate to = {'/Login'}/>
}

export default PrivateRoutes