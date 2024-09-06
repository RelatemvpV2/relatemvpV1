import React, { useState ,useEffect} from 'react'

import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase_setup/firebase';
import { auth } from '../../firebase_setup/firebase';

import GreyBg from '../greyBg/GreyBg'
import LightBg from '../lightBg/LightBg'
import Option from '../optionComponent/Option'
import Button from '../buttonCopmponent/Button'

import './question.css'
import { NavLink } from 'react-router-dom'



const options = [
    {
        id: 5,
        option: "Very good",
        selected: false,
        score: 5
    },
    {
        id: 4,
        option: "Good",
        selected: false,
        score: 4
    },
    {
        id: 3,
        option: "Okay",
        selected: false,
        score: 3
    },
    {
        id: 2,
        option: "Bad",
        selected: false,
        score: 2
    },
    {
        id: 1,
        option: "Very bad",
        selected: false,
        score: 1
    }
]


const Question = ({ qArray, catogory, handleOnclickForNextQuestion,uid ,error,setError}) => {

    const [isScoreSelected, setIsScoreSelected] = useState(false)
    const [optionActiveId ,setOptionActiveId] = useState()
   
    const [info,setInfo] = useState()
   /*  const [error,setError] =useState('') */

    const scoresCollectionRef = doc(db, `Users`, uid, `Scores`, 'scoresDocId')

     const saveScoreinDB = (score, property) => {
       /*  console.log(score, property) */
    
       
      if(score!==0) 
      
      {
        setIsScoreSelected(score!==0)
       setInfo(false)

        try {

            const docRef = setDoc(scoresCollectionRef, {
                [property]: score,
            }, { merge: true })         

        } catch (e) {
           /*  console.log("error in adding document: ", e) */
            setError(`error in adding document ${e}`)

        }}
        else {
            setInfo(true)
            setIsScoreSelected(false)
        }
       
    }

    return (
        
        <section className='Question-page'>
            <GreyBg height={"25%"} style={{display:"flex",flexDirection:"column",justifyContent:"space-between",color:"#F9EEE1",alignItems:"center"}}>
                <h5 className='question-Header'>{catogory.Header}</h5>
                <p className='para'>{catogory.Q1}</p>
            </GreyBg>

            <LightBg height={"75%"}>
                 <p style = {{color:"#C68977",height:'20px'}}>{info&&'Please select an option'}</p>
                <p className='Qno'>{`Question ${catogory.id} / ${qArray.length}`}</p>
                <div className='options-div' >
                    {options.length &&
                        options.map((opt, i) => {
                            return <section onClick={() => {
                                setOptionActiveId(opt.id)
                                saveScoreinDB(opt.score, catogory.Property)
                                }} className={`Options-section ${optionActiveId === opt.id && 'option-active'}`} key={`option${i + 1}`}>
                                    {console.log(optionActiveId)}
                                <Option optionVal={opt.score} text={opt.option} bgColor={"#41414E"} color={"#F9EEE1"} PWidth={"140px"} />
                            </section>
                        })
                       }
                </div>

               {/*  <div style={{ margin: "2% 0" }}> */}
                    <p>{error!='' && error}</p>
                    <Button text="Continue" type="normal" onclickMethod={()=>{
                        if(!isScoreSelected) {
                            setInfo(true)}
                        else{
                        setInfo(false)
                        handleOnclickForNextQuestion()}}} />
                    {/*  {catogory.id > 1 && <button onclickMethod={handleOnclickForPreviousQuestion} > Go back </button>} */}
                    <NavLink to={`/Questionnaire/${Number(catogory.id - 1)}`} className={"go-back-link"} >{Number(catogory.id) > 1 &&  "Go back "}</NavLink>

               {/*  </div> */}
            </LightBg>
        </section>

    )
}

export default Question