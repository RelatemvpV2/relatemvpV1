import React,{useEffect} from 'react'
import { useNavigate } from "react-router-dom"

import {  doc,  getDoc } from "firebase/firestore";
import { db } from "../../firebase_setup/firebase";
import { auth } from '../../firebase_setup/firebase';


import Button from '../buttonCopmponent/Button'
import GreyBg from '../greyBg/GreyBg'
import LightBg from '../lightBg/LightBg'
/* import Circle from '../circleComponent/Circle' */
import Option from '../optionComponent/Option'

import './intro.css'

const Intro = () => {

    const navigate = useNavigate();
    const uid = localStorage.getItem("uid")

    useEffect(() => {
        if (auth.currentUser != null) {
           
            //getting data from the firestore.
            const docRef = doc(db, "Users", auth.currentUser.uid)


           // **********important code donot remove get doc 

            getDoc(docRef)
                .then((doc) => {
               //navigate to next page if the fields are filled already
               if(!doc.data().filledQuestionnaire) {
                    
                    navigate('/Intro', true)
                }
             
                   else {
                    navigate('/Summary', true)
                   }

                }
                )

        }

        else navigate('/Login',true)
     
    }, [])
    


    const handleOnClickContinue = () => {
      
        navigate('/Questionnaire/1', true)
    }

    return (
        /* Intro for Parner, use if else incase of using more than one categories */
        <main className='intro-page'>
            <LightBg height={"30%"}>
                <h2 style={{ fontSize: "35px",margin:'5px' }}>Great!</h2>
                <p style={{width:'330px'}}>Please follow the next steps to continue improving your relation</p>
            </LightBg>
            <GreyBg height={"70%"}>
                <section>
                    <Option optionVal={"1"} text={"Answer 9 questions"} bgColor={"#F9EEE1"} color={"#41414E"} PWidth={'200px'} />
                    <Option optionVal={"2"} text={"Invite your Partner to answer the same questions"} bgColor={"#F9EEE1"} color={"#41414E"}  PWidth={'200px'}/>
                    <Option optionVal={"3"} text={"Your Partner will answer questions"} bgColor={"#F9EEE1"} color={"#41414E"} PWidth={'200px'} />
                    <Option optionVal={"4"} text={"We identify topics for you to work on"} bgColor={"#F9EEE1"} color={"#41414E"} PWidth={'200px'} />

                    <div style={{ margin: "5vh 0 1vh" }}>
                        <Button text="Continue" type="normal" onclickMethod={handleOnClickContinue} />
                    </div>

                </section>
            </GreyBg>
        </main>
    )
}

export default Intro