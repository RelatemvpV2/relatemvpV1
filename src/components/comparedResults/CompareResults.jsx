import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
 


import GreyBg from '../greyBg/GreyBg'
import LightBg from '../lightBg/LightBg'
import Button from '../buttonCopmponent/Button'
import HLine from '../../asserts/HLine.png'
import VLineShort from '../../asserts/VLineShort.png'
import VLineLong from '../../asserts/VLinelong.png'
import useGetUserAndPartnerScore from '../../hooks/useGetUserAndPartnerScore';

import './compareresults.css'

const catagories = [{
    name: 'Communication',
    ScoreName: "Communication"
},
{
    name: 'Share of responsibilities',
    ScoreName: "Values"
},
{
    name: 'Interests',
    ScoreName: "Everyday life"
},
{
    name: 'Child rearing',
    ScoreName: "Child rearing"
},
{
    name: 'Economy',
    ScoreName: "Economy"
},
{
    name: 'Expectations',
    ScoreName: "Boundaries"
},
{
    name: 'Future dreams',
    ScoreName: "Trust"
},
{
    name: 'Intimacy',
    ScoreName: "Intimacy"
},
{
    name: 'Relation',
    ScoreName: "Relation"
},

]

/* const catagories = ["Communication", "Share of responsibilities", "Interests", "Future dreams", "Alignment of expectations", "Closeness and Intimacy", "Economy", "Child rearing"] */


const CompareResults = () => {


    const navigate = useNavigate();
    const location = useLocation();

    const style = { height: '15px', margin: '1px', color: 'white', fontSize: '8px', textAlign: 'left', borderRadius: '2px' ,display:'flex',alignItems:"center"}

    const { currentUserScoreObj, partnerScoreObj } = useGetUserAndPartnerScore()

    const handleOnClickContinue= () => {
        navigate('/Recommendations', { state: {
            currentUserScoreObj:currentUserScoreObj,
            partnerScoreObj:partnerScoreObj
        } })
    }


    return (
        <main className='compared-results-page'>
            <GreyBg height={"25vh"}>
                <header className='compared-results-header'>
                    <h4 className='compared-results-text'>Here are your compared results</h4>
                </header>
            </GreyBg>
            <LightBg height={"75vh"}>

                <section className='compared-results-q1-score'>
                    {currentUserScoreObj && partnerScoreObj && <section className='catagory'>
                        <p className='catagory-name'>Relation to your partner</p>
                        <section className='bar'>

                            <section
                                className='Score-bar-section'>
                                <p className='Your-score'>{currentUserScoreObj.Relation}</p>
                                <div
                                    style={{
                                        ...style,
                                        
                                        width: Number(`${currentUserScoreObj.Relation}`) * 25,
                                        backgroundColor: '#C68977'
                                    }}>
                                   <p>You</p> 
                                </div>
                            </section>

                            <section
                                className='Score-bar-section'>
                                <p className='partner-score'>{partnerScoreObj.Relation}</p>
                                <div
                                    style={{
                                        ...style,
                                        width: Number(`${partnerScoreObj.Relation}`) * 25 || '75px',
                                        backgroundColor: '#41414E'
                                    }}>
                                    <p>Partner</p>
                                </div>
                            </section>

                        </section>
                      {/*   <section className='short-Vlines'>

                            <img src={VLineShort} alt={"VLineShort"} width="1px" />
                            <img src={VLineShort} alt={"VLineShort"} width="1px" />
                            <img src={VLineShort} alt={"VLineShort"} width="1px" />
                            <img src={VLineShort} alt={"VLineShort"} width="1px" />
                            <img src={VLineShort} alt={"VLineShort"} width="1px" />
                            <img src={VLineShort} alt={"VLineShort"} width="1px" />

                        </section> */}

                    </section>}


                </section>
                <img src={HLine} alt="Line" width={'300px'} className='Hline-style' />

                <section className='compared-results-q1-score'>
                    <section style={{ width: '100%' }}>
                        {currentUserScoreObj && partnerScoreObj && catagories.map((c, i) => <section className='catagory' key={`catogory${i}`}>

                            {c.name !== 'Relation' && <>
                                <p className='catagory-name'>{c.ScoreName}</p>
                                <section className='bar'>

                                    {/* 
                                    <div style={{ ...style, width: Number(`${currentUserScoreObj[c]}`) * 15 || '75px', backgroundColor: '#C68977' }}></div>

                                    <div style={{ ...style, width: Number(`${partnerScoreObj[c]}`) * 15 || '75px', backgroundColor: '#41414E' }}></div> */}


                                    <section
                                        className='Score-bar-section'>
                                        <p className='Your-score'>{currentUserScoreObj[c.ScoreName]}</p>
                                        <div
                                            style={{
                                                ...style,
                                                width: Number(`${currentUserScoreObj[c.ScoreName]}`) * 25 || '75px',
                                                backgroundColor: '#C68977'
                                            }}>

                                        </div>
                                    </section>

                                    <section
                                        className='Score-bar-section'>
                                        <p className='partner-score'>{partnerScoreObj[c.ScoreName]}</p>
                                        <div
                                            style={{
                                                ...style,
                                                width: Number(`${partnerScoreObj[c.ScoreName]}`) * 25 || '75px',
                                                backgroundColor: '#41414E'
                                            }}>

                                        </div>
                                    </section>

                                </section>

                            </>}
                            
                        </section>)}

                    </section>


                </section>
                <section className='compared-results-btn-section'>
                    <Button text="Continue" type="normal" onclickMethod={handleOnClickContinue}/>
                </section>
            </LightBg>
        </main >
    )
}

export default CompareResults