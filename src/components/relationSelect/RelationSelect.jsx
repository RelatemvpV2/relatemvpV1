import React from 'react'
import {useNavigate} from "react-router-dom"

import LightBg from '../lightBg/LightBg'
import GreyBg from '../greyBg/GreyBg'
import Button from '../buttonCopmponent/Button'


import './relationselect.css'

const RelationSelect = () => {
    const navigate = useNavigate();

    const handleOnClickPartner= () => {
        navigate('/Intro', true)
    }

    return (
        <div>
            <LightBg height={"25vh"}>
                <h4>In which relation do you wish to be better? </h4>
            </LightBg>
            <GreyBg height={"75vh"}>
                <section className='relation-select-btns'>
                <p>Choose one</p>
                <Button text="Partner" type="normal" onclickMethod={handleOnClickPartner}/>
                <Button text="Sibling" type="normal" disabled={true}/>
                <Button text="Parent" type="normal" disabled={true}/>
                <Button text="Child" type="normal" disabled={true}/>
                <Button text="Friend" type="normal" disabled={true}/>
                </section>
            </GreyBg>
        </div>
    )
}

export default RelationSelect