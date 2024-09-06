import React from 'react'
import {useNavigate} from "react-router-dom"


import Button from '../buttonCopmponent/Button'
import RelateImg from "../../asserts/Vector.png"
import GreyBg from '../greyBg/GreyBg'
import LightBg from '../lightBg/LightBg'

import "./welcome.css"

const Welcome = () => {

    const navigate = useNavigate();

    const handleOnClickContinue = () => {
        navigate('/Login', true)
    }

    
    return (
        <main className='welcome-page'>
            <GreyBg height={"70%"}>
            <header className='welcome-header'>
                <img src={RelateImg} alt="Logo-Relate" />
                <h1 className='welcome-text'>Welcome</h1>
                <p className='welcome-desc'>We are here to improve your
                    relations – whether it’s with your partner,
                    a family member or a good friend.</p>
            </header>
            </GreyBg>
            <LightBg height={"30%"}>
            <section className='welcome-btn-section'>
                <Button text="Continue" type="normal" onclickMethod={handleOnClickContinue}/>
            </section>
            </LightBg>
        </main>
    )
}

export default Welcome