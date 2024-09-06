import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useNavigate } from "react-router-dom"


import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase_setup/firebase';
import { auth } from '../../firebase_setup/firebase';

import Circle from '../circleComponent/Circle'
import HLine from "../../asserts/HLine.png"
import LightBg from '../lightBg/LightBg'
import GreyBg from '../greyBg/GreyBg'
import Button from '../buttonCopmponent/Button'

import './summary.css'

/* const catagories = [
    "Communication", "Share of responsibilities", 
    "Interests", "Future dreams", "Alignment of expectations", 
    "Closeness and Intimacy", "Economy", "Child rearing"] */
const catagories = {
    ChildRearing: 0,
    Communication: 0,
    Expectations: 0,
    FutureDreams: 0,
    Interests: 0,
    Intimacy: 0,
    Relation: 0,
    Responsibilities: 0
}

//create context api for questionnaire and score


const Summary = ()=> {
    const [scores, setScores] = useState(catagories);
    const [document, setDoc] = useState();
    const [ error,setError ] = useState('')

    const keys = Object.keys(scores);


    const uid = window.localStorage.getItem('uid') || auth.currentUser.uid

    const navigate = useNavigate();
    

    useLayoutEffect(() => {

        window.localStorage.setItem('uid',uid)
        
     
        const docRef = doc(db, "Users", uid)
        getDoc(docRef)
            .then((doc) => {
                setDoc(doc.data())
                if ((doc.data().hasOwnProperty('partnerEmail'))  && doc.data().partnerResponded ) {
                    navigate('/CompareResults', true)
                }
                else navigate('/Summary', true)
            })

    }, [])


    useEffect(() => {
       
        const scoresCollectionRef = doc(db, `Users`, uid, `Scores`, 'scoresDocId')
        if (auth.currentUser != null) {

            //getting data from the firestore.
            // **********important code donot remove get doc 

            getDoc(scoresCollectionRef)
                .then((docs) => {
                 
                    if (Object.keys(docs.data()).length === 9) {

                        try {
                            //send data to the database - fire store
                            const ref = doc(db, "Users", uid)

                            const docRef = updateDoc(ref, {
                                /* date:serverTimestamp, */
                                filledQuestionnaire: true
                            })

                            setScores(docs.data())

                        } catch (e) {
                            setError(`Error in adding document:${e}`)
                        }
                    }

                    else {
                        alert('please answer all questions')
                        navigate(`/Questionnaire/1`, true)
                    }


                }
                )

        }

        else navigate('/Login', true)


    }, [])

    const handleOnClickSubmit = () => {
/* console.log(document) */
        if (document.hasOwnProperty('partnerEmail')) {
            navigate('/Welldone',  { state: { partnerEmail: document.partnerEmail } })
        }
        else
            navigate('/InvitePartner', true)
    }

    return (
        (uid!== null && uid !== undefined) ? <div className='summary-page'>
            <GreyBg height={"25%"}>
                <section className='summary-header-section'>
                    <h2 style={{ fontSize: "35px" }}>Your summary</h2>
                    <p className='para'>First step completed in improving
                        your relation. Here are your answers.</p>
                </section>
            </GreyBg>
            <LightBg height={"75%"}>
                <section className='summary-score-section'>
                    {keys.map((c, i) => <section key={`catogory${i}`} /* className='summary-scores' */>

                        {c === 'Relation' && <><section className='summary-q1-score'>
                            <p>{c}</p>
                            {/* option value is score here */}
                            <Circle bgColor={"#C68977"} color={"#F9EEE1"} optionVal={`${scores[c]}`} diameter={"30px"} />
                        </section>

                            <img src={HLine} alt="Line" width={'300px'} className='Hline-style' />
                        </>}
                    </section>)}

                    {keys.map((c, i) => <section key={`catogory${i}`} className='summary-scores'>

                        {c !== 'Relation' && <><p>{c}</p>

                            <Circle bgColor={"#C68977"} color={"#F9EEE1"} optionVal={`${scores[c]}`} diameter={"30px"} />
                        </>}
                    </section>
                    )}

                    <section className='score-contineBtn-section'>
                        <Button text="Continue" type="normal" onclickMethod={handleOnClickSubmit} />
                       
                    </section>
                    {error!=="" && <p>{error}</p>}

                </section>

            </LightBg >

        </div >:<p>Loading...</p>
    )
}

export default Summary