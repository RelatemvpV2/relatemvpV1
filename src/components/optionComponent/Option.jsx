import React from 'react'

import Circle from '../circleComponent/Circle'

const Option = ({optionVal,text,bgColor,color,PWidth}) => {
  
  return (
    <section style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
    <Circle bgColor={bgColor} color={color} optionVal={optionVal} diameter={"40px"}/>
    <p style={{width:`${PWidth}`,textAlign:"left",maxHeight:'65px',margin:'10px'}}>{text}</p>    
    </section>
  )
}

export default Option