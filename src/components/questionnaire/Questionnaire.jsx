import React, { useState, useEffect } from 'react'
import { json, useNavigate, useParams } from "react-router-dom"

//firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../../firebase_setup/firebase';
import { auth } from '../../firebase_setup/firebase';
import { addDoc, collection, serverTimestamp, getDocs, updateDoc, doc, onSnapshot } from 'firebase/firestore';

import Question from '../question/Question'
import "./questionnaire.css"

const questions = [{
    id: 1,
    Property: "Relation",
    Header: "Overall relation to your partner",
    Q1: "How good is your overall relation to your partner today?",

},
{
    id: 2,
    Property: "Communication",
    Header: "Communication",
    Q1: "How good is the communication between you and your partner?",

},
{
    id: 3,
    Property: "Values",
    Header: "Values",
    Q1: "How aligned are you and your partner when it comes to sharing values?",

},
{
    id: 4,
    Property: "Everyday life",
    Header: "Everyday life",
    Q1: "How aligned are you and your partner in your everyday life obligations?",

},
{
    id: 5,
    Property: "Trust",
    Header: "Trust",
    Q1: "To what level do you have trust in your partner?",

},
{
    id: 6,
    Property: "Boundaries",
    Header: "Boundaries",
    Q1: "To what level do you have respect for personal boundaries in your relationship?",

},
{
    id: 7,
    Property: "Intimacy",
    Header: "Intimacy",
    Q1: "How good is your intimate relationship?",

},
{
    id: 8,
    Property: "Economy",
    Header: "Economy",
    Q1: "To what level do you have insight into your shared economy?",

},
{
    id: 9,
    Property: "Child rearing",
    Header: "Child rearing",
    Q1: "To what level are you aligned when it comes to raising your children?",

}
]



const Questionnaire = () => {

    const [uid, setUid] = useState('')
    const [userInvited, setUserInvited] = useState(false)
    const [partnerEmail, setPartnerEmail] = useState('')
    const [error,setError] = useState()


    let { id } = useParams();
    id = Number(id);

    useEffect(()=>{

        const email = window.localStorage.getItem('email') || auth.currentUser.email 
      
         //finding Partner object
    const findPartner = (userEmail) => {
        console.log('finding parner')
        //collection ref
        const userCollectionRef = collection(db, 'Users')
        onSnapshot(userCollectionRef, (snapshot) => {
            let users = []
            
            snapshot.docs.forEach((doc) => {
                users.push({ ...doc.data(), id: doc.id })
            })

            let findPartner = users.filter((user) =>
                user.partnerEmail ? user.partnerEmail === userEmail : ""
            )
        /*  console.log(findPartner[0].id) */

            if (findPartner.length && findPartner.length === 1) {
                setUserInvited(true)
                setPartnerEmail(findPartner[0].email)

                //updating partner1 property 'partner responded' to true when the partner2 is responding

                const ref = doc(db, "Users", findPartner[0].id)
    
                try{const docRef = updateDoc(ref, {
                    partnerResponded:true,
                })}
                catch(e){
                    setError(e.message)
                }
            }
            

        })
       
    }

    findPartner(email)

    },[])


    //REfresh Load page
    useEffect(() => {

        const id = window.localStorage.getItem("uid")
        if (id !== null) setUid(id)

    }, [uid])

    const navigate = useNavigate();

    const handleOnclickForNextQuestion = (next) => {

        if (id >= questions.length)

            if(userInvited) {

                try {
                    //send partnerEmail to the database - fire store
                    const ref = doc(db, "Users", uid)
    
                    const docRef = updateDoc(ref, {
                        partnerEmail:partnerEmail,
                        partnerResponded:true,
                        filledQuestionnaire:true
                    })
    
                    navigate('/CompareResults',{state: {
                        email:auth.currentUser.email,
                        partnerEmail:partnerEmail
                    }})
    
                } catch (e) {
                    setError(e.message)
                }
               
            }
            else navigate(`/Summary`, true) 

        else {
            navigate(`/Questionnaire/${next}`, true)
        }
    }

    const handleOnclickForPreviousQuestion = (prev) => {
        navigate(`/Questionnaire/${prev}`, true)
    }

    return (
        <div className='Questionnaire-page'>

            {uid ? <Question
                error={error}
                setError={setError}
                uid={uid}
                qArray={questions}
                catogory={questions[id - 1]}
                key={id}
                handleOnclickForNextQuestion={() => handleOnclickForNextQuestion(id + 1)}
                handleOnclickForPreviousQuestion={() => handleOnclickForPreviousQuestion(id - 1)}
            /> : <div>Loading....</div>
            }

            {/*   {questions.length
            ? questions.map((catogory,i, qArray) => <Question 
            qArray={qArray} 
            catogory={catogory} 
            key={catogory.id} 
            handleOnclickForNextQuestion={()=>handleOnclickForNextQuestion(i)}
            />)
            : "Loading questions..."} */}



        </div>
    )
}

export default Questionnaire