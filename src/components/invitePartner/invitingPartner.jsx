import React, { useState, useEffect, useRef } from 'react'
import { useNavigate,NavLink } from "react-router-dom"
import { sendForm } from '@emailjs/browser'
import { db } from '../../firebase_setup/firebase';
import { auth } from '../../firebase_setup/firebase';
import { updateDoc, doc } from 'firebase/firestore';


import Input from '../inputComponent/Input'
import GreyBg from '../greyBg/GreyBg'
import LightBg from '../lightBg/LightBg'
import Button from '../buttonCopmponent/Button'

import './invitePartner.css'

const InvitePartner = () => {
  const [recepientEmail, setRecepientEmail] = useState("")
  const [fromName, setFromName] = useState("")
  const [ infoMsg,setInfoMsg ] = useState("")

  const form = useRef();

  const navigate = useNavigate();

  let fromEmail;
  let name;
  let recepientName;

  useEffect(() => {

    fromEmail = window.localStorage.getItem('email')
    name = fromEmail.substring(0, fromEmail.indexOf('@'));
    setFromName(name)
    recepientName = recepientEmail || recepientEmail.substring(0, recepientEmail.indexOf('@'));

  }, [recepientEmail])

  const handleOnInput = (e) => {

    let {currentTarget:{value}} = e

    e.preventDefault()
    let name = value.substring(0, value.indexOf('@'));
    setRecepientEmail(value)
  }


  const handleOnChange = (e) => {

    let {target:{value}} = e
    e.preventDefault()
    setRecepientEmail(value)

  }

  const handleOnClickSubmit = async(e) => {
    e.preventDefault()

    if(recepientEmail && recepientEmail!==fromEmail){
    const ref = doc(db, "Users", auth.currentUser.uid)

   /*  sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, process.env.REACT_APP_PUBLIC_KEY)
      .then((result) => {
        const docRef = updateDoc(ref, {
          partnerEmail: recepientEmail,
          date:new Date()
        }) */

        const sendForm = await sendEmail();
        navigate('/Welldone', {state:{partnerEmail:recepientEmail}})
        /* console.log(result.text, " SUCCESS") */
    /*   }, (error) => { */
        // show the user an error
        setInfoMsg(`**FAILED to send the email to${recepientEmail},\n ${error.text}`)
      /* }); */
    }
    else 
    setInfoMsg('*Please enter your parners right email id.')
  }

  return (
    <main className='next-step-page'>
      <GreyBg height={"75%"}>
        <header className='next-step-header'>
          {/* <img src={RelateImg} alt="Logo-Relate" /> */}
          <h1 className='next-step-text'>Next step</h1>
          <p className='next-step-desc'>Your replies are now saved and confidential.
            Please invite your Partner to answer the same questions</p>
          <form ref={form}>
            <input 
            className='input-style' 
            type='email' name='to_email' 
            placeholder="Insert your partners e-mail" 
            required 
            value={recepientEmail} 
            onChange={handleOnChange} 
            onInput={handleOnInput} />
            <input type='hidden' name='to_Name' placeholder="to-Name" required defaultValue={recepientEmail.length ? (recepientEmail.substring(0, recepientEmail.indexOf('@'))): ''}/>
           {/*  <input  type='email' name='Name' placeholder="from-email" required value={'relatemvp@gmail.com'} readOnly /> */}
            <input type='hidden' name='from_name' placeholder="Parner-Name" required defaultValue={fromName} readOnly/>

          </form>

          <NavLink to={'../Summary'} className='go-back'>Go back</NavLink>
          
        </header>
      </GreyBg>
      <LightBg height={"25%"}>
        <section className='next-step-btn-section'>
          <Button text="Invite" type="normal" onclickMethod={handleOnClickSubmit} />
        </section>
        {infoMsg!=='' && <p style={{color:'#C68977'}}>{infoMsg}</p>}
      </LightBg>
    </main>
  )
}

export default InvitePartner