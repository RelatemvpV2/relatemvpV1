import React from 'react'

const LightBg = ({height,children}) => {

  const h=height;
  return (
    <div style={{backgroundColor:"#F9EEE1",minHeight:`${height}`,display:"flex",flexDirection:"column",justifyContent:"center",color:"#41414E",alignItems:"center"}}>{children}</div>
  )
}

export default LightBg