import React, { useState, useEffect, useContext} from 'react'

import {useNavigate} from "react-router-dom"
import { UserContext } from '../../context/UserContext'

import Button from '../buttonCopmponent/Button'
import RelateImg from "../../asserts/relate-logo-web.png"
import GreyBg from '../greyBg/GreyBg'
import LightBg from '../lightBg/LightBg'

import "../welcome/welcome.css"

const FirstStep = () => {

    const navigate = useNavigate();

    const handleOnClickContinue = () => {
      /*   navigate('/RelationSelect', true) */
        navigate('/Intro',true)
    }

    return (
        <main className='welcome-page'>
            <LightBg height={"70%"}>
                <header>
                    <img src={RelateImg} alt="Logo-Relate" width={"120px"}/>
                    <h1 className='welcome-text'>Congrats!</h1>
                    <p className='welcome-desc'>You have taken first step to
                        improve your relations.
                        Please answer a few questions
                        to help us help you.</p>
                </header>
            </LightBg>
            <GreyBg height={"30%"}>
                <section className='welcome-btn-section'>
                    <Button text="Continue" type="normal"  onclickMethod={handleOnClickContinue}/>
                </section>
            </GreyBg>
        </main>
    )
}

export default FirstStep