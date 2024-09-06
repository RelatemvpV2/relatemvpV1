import React, { useState, useEffect, useLayoutEffect} from 'react'

import { useNavigate, NavLink,useLocation } from "react-router-dom"

import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../../firebase_setup/firebase';
import { auth } from '../../firebase_setup/firebase';
import { signOut } from "firebase/auth";
import { addDoc, collection, serverTimestamp, getDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore';



import Input from '../inputComponent/Input'
import Button from '../buttonCopmponent/Button'

import './completeprofile.css'
import GreyBg from '../greyBg/GreyBg'
import LightBg from '../lightBg/LightBg'



const CompleteProfile = () => {
    const [uid, setUid] = useState()
    const [document, setDocument] = useState()
    const [error, setError] = useState('')
    const [filledQuestionnaire,setFilledQuestionnaire] = useState(false)

    const [age, setAge] = useState('')
    const [gender, setGender] = useState("")
    const [noOfChildren, setNoOfChildren] = useState(0)

    const navigate = useNavigate();
    const location = useLocation()
    

    useLayoutEffect(() => {

        if (auth.currentUser != null) {
            setUid(auth.currentUser.uid)

            //getting data from the firestore.
            const docRef = doc(db, "Users", auth.currentUser.uid)


           // **********important code donot remove get doc 

            getDoc(docRef)
                .then((doc) => {
                    setDocument(doc.data())
                    
                /*      console.log(doc.data())  */

                    // console.log(doc.data().age && doc.data().children && doc.data().gender) 
                    if(doc.data().age && doc.data().children && doc.data().gender && doc.data().filledQuestionnaire) {
              
                        setFilledQuestionnaire(true)
                        navigate('/Summary', true)}
                      

                    //navigate to next page if the fields are filled already
                   else if(doc.data().age && doc.data().children && doc.data().gender && !doc.data().filledQuestionnaire) {
                    
                    navigate('/Intro', true)
                }
                else if(!(doc.data().age && doc.data().children && doc.data().gender)) {
                    
                    navigate('/CompleteProfile', true)
                }
                   else {
                    navigate('/CompleteProfile', true)
                   }

                }
                )

        }

        else navigate('/Login',true)


    }, [uid])


    const onAgeChange = (e) => {
        setAge(e.target.value)
    }

    const onGenderChange = (e) => {
        setGender(e.target.value)
    }

    const onChildrenChange = (e) => {
        setNoOfChildren(e.target.value)
    }

    const handleOnClickSubmit = () => {

        if (age <= 16) {
            setError("age should be above 16")
        }
        else if (gender == 0) {

            setError("please select gender")
        }
        else if (noOfChildren == 0) {

            setError("please select children")
        }
        else {

            try {
                //send age , gender and children values to the database - fire store
                const ref = doc(db, "Users", uid)

                const docRef = updateDoc(ref, {
                  /*   date:serverTimestamp, */
                    age: age,
                    gender: gender,
                    children: noOfChildren,
                    filledQuestionnaire:filledQuestionnaire
                })

                navigate('/FirstStep', true)

            } catch (e) {
               /*  console.log("error in adding document: ", e) */
                navigate('/CompleteProfile', true)
            }



        }

    }


    return (
        <main className='complete-profile'>

            {(

                <>

                    <GreyBg height={"70%"}>
                        <section className='profile-input-section'>
                            <h2 className='complete-profile-header'>Complete profile</h2>
                            <p className='para'>To improve quality of our help,
                                we kindly ask you to provide
                                some information about yourself.</p>
                            <input type="number" placeholder={'age'} className='age' onChange={onAgeChange} value={age} min={16} />
                            {/* <Input type="text" placeholder="Gender" className='gender' onChangeMethod={onGenderChange} value={gender} /> */}

                            <select id="gender" name="gender" className='gender' onChange={onGenderChange}>
                                <option value="0">-Choose gender-</option>

                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {/* <Input type="number" placeholder="Children" className='children' onChangeMethod={onChildrenChange} value={noOfChildren} /> */}
                            <select id="children" name="children" className='children' onChange={onChildrenChange}>
                                <option value="0">-Do you have Children?-</option>

                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <NavLink to={`/FirstStep`} className={"skip"} > Skip </NavLink>
                            {error ? <div style={{ color: "orange" }}>{error}</div> : ""}
                        </section>
                    </GreyBg>
                    <LightBg height={"30%"}>
                        <section className='profile-submit-btn'>
                            <Button text="Submit" type="normal" onclickMethod={handleOnClickSubmit} />
                            {/* <Button text="signout" type="normal" onclickMethod={handleOnClickSignout} /> */}


                        </section>
                    </LightBg>
                    {/*  </>
                    ):"some thing went wrong"} */}
                </>
            )}



        </main>
    )
}

export default CompleteProfile