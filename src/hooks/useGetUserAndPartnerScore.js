import React, { useEffect,useState} from 'react'
import { getDocs, collection, onSnapshot,doc,getDoc } from "firebase/firestore";
import { db } from '../firebase_setup/firebase';
import { auth } from '../firebase_setup/firebase';

const useGetUserAndPartnerScore = () => {

    const [currentUserObj, setCurrentUserObj] = useState()
    const [partnerObj, setPartnerObj] = useState()

    const [currentUserScoreObj, setCurrentUserScoreObj] = useState()
    const [partnerScoreObj, setPartnerScoreObj] = useState()

   /*  console.log("useGetUserAndPartnerScore") */

 useEffect(() => {

    const userCollectionRef = collection(db, 'Users')
        onSnapshot(userCollectionRef, (snapshot) => {

            let users = []
            snapshot.docs.forEach((doc) => {
                users.push({ ...doc.data(), id: doc.id })
            })

       /*      console.log(users)
            console.log(auth) */


            const currentuser = users.filter((user) => user.email === auth.currentUser.email)
            const partner = users.filter((user) => user.partnerEmail === auth.currentUser.email)
           /*  console.log(currentuser.id, 'current user')
            console.log(partner, "partner") */
            setCurrentUserObj(currentuser)
            setPartnerObj(partner)

       
   
    const currentUserScoreCollectionRef = doc(db, 'Users', currentuser[0].id, 'Scores', 'scoresDocId')
    const parnerScoreCollectionRef = doc(db, 'Users', partner[0].id, 'Scores', 'scoresDocId')


   

        let CurrUserScore = []
        getDoc(currentUserScoreCollectionRef)
        .then((doc) => {
            setCurrentUserScoreObj(doc.data())
        })
        
    

        let partnerScore = []
        getDoc(parnerScoreCollectionRef)
        .then((doc) => {
            setPartnerScoreObj(doc.data())
        })

    })
  
 }, [])

 return {currentUserScoreObj, partnerScoreObj}
 
}

export default useGetUserAndPartnerScore