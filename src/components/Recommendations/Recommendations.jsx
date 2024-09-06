import React,{useState } from 'react'
import { NavLink, useNavigate,useLocation  } from 'react-router-dom';

import { updateDoc, doc } from "firebase/firestore";
import { db } from '../../firebase_setup/firebase';
import { auth } from '../../firebase_setup/firebase';
import { signOut } from "firebase/auth";

import Input from '../inputComponent/Input'
import Button from '../buttonCopmponent/Button'
import GreyBg from '../greyBg/GreyBg'
import LightBg from '../lightBg/LightBg'
import useGetRecomendation from '../../hooks/useGetRecomendation';


import './recommendations.css'

const Recommendations = () => {

    const [error,setError] = useState('')

    const location = useLocation()

    const {sortedScore} = useGetRecomendation(location.state.currentUserScoreObj, location.state.partnerScoreObj)

    console.log(location.state.currentUserScoreObj)
    console.log( location.state.partnerScoreObj)

    console.log( sortedScore)




    const navigate = useNavigate()

    const uid = window.localStorage.getItem('uid') || auth.currentUser.uid

    /* console.log(sortedScore) */

    const handleSignout = () => {

        const ref = doc(db, "Users", uid)

        const docRef = updateDoc(ref, {
            interestedInRecomendations: true
        })

        alert('Thank you for using Relate. We will let you know, when we will go live :-)')
        signOut(auth)
            .then(() => {
                //user logged out
                navigate('/Login', true)
            })
            .catch((error) => {
                setError(error)
            });
           
    }

    return (
        <main className='recommendations'>
            <GreyBg height={"70vh"}>
                <section className='recommendations-section'>
                    <h2 className='recommendations-header'>Recommendations</h2>
                    <p className='para'>Suggested topics to work with
                        together with your Partner</p>

                        {
                            sortedScore.map((c,i)=>{
                                if(i>2) return
                                else 
                                return <Button key={c.key} text={c.key} type="recommend" disabled/>
                            })
                        }
                   
                    <p className="recomend-facilitate">Do you want us to facilitate the dialogue?</p>
                    <p>{error!="" && error}</p>
                </section>
            </GreyBg>
            <LightBg height={"30vh"}>
                <section className='recommendations-btn-section'>
                    <Button text="That would be great" type="normal" onclickMethod={handleSignout} />
                    <NavLink to={'../Login'} className='No-thanks'>No Thanks</NavLink>

                </section>
            </LightBg>


        </main>
    )
}

export default Recommendations