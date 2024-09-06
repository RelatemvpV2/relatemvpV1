import React, {useState} from 'react'
import { useNavigate, useLocation, NavLink } from 'react-router-dom'

import { auth } from '../../firebase_setup/firebase';
import { signOut } from "firebase/auth";

import Button from '../buttonCopmponent/Button'
import RelateImg from "../../asserts/relate-logo-web.png"
import GreyBg from '../greyBg/GreyBg'
import LightBg from '../lightBg/LightBg'
import invitePartner from '../invitePartner/InvitePartner'

import "./welldone.css"

const Welldone = () => {
  const [infoMsg,setInfoMsg] = useState('')

  const navigate = useNavigate();
  const location = useLocation()

  const handleSignout = () => {
    signOut(auth)
    .then(() => {
        //user logged out
        navigate('/Login', true)
    })
    .catch((error) => {
      setInfoMsg('failed to logout')
    });
  }

  return (
    <main className='welldone-page'>
    <LightBg height={"75%"}>
        <header>
            <img src={RelateImg} alt="Logo-Relate" width={"120px"} />
            <h1 className='welldone-text'>Well done!</h1>
            <p className='welldone-desc'>Your Partner has now been invited to answer answer 
            questions via below email. We will notify you when your Partner has replied.</p>

                      <p className='email'> {location.state.partnerEmail}</p>
        </header>
    </LightBg>
    <GreyBg height={"25%"}>
        <section className='welldone-btn-section'>
            <Button text="Ok" type="normal" onclickMethod={handleSignout}/>
            <NavLink to={'../Summary'} className='go-to-summary'>Go to summary</NavLink>
           {/*  navigate('/Summary', true) */}
        </section>
        <NavLink to={'../invitePartner'} className='change-email'>Change email</NavLink>
        {infoMsg!="" && <p>{infoMsg}</p>}
    </GreyBg>
</main>
  )
}

export default Welldone