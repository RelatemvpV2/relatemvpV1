import React,{useState,useEffect} from 'react'
import { addDoc, collection, serverTimestamp, getDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase_setup/firebase';


const useUpdateDocHook = (id,obj) => {

    const [document,setDocument] = useState()
    const [error,setError] = useState()


    useEffect(() => {
        try {
            const ref = doc(db, "Users", id)
    
             updateDoc(ref, obj)
             .then((res)=>console.log(res))
            
            
        } catch (e) {
        
            setError(e.message)
            return null
          
        }
    
    }, [])
    
return {document,error}
   
}

export default useUpdateDocHook