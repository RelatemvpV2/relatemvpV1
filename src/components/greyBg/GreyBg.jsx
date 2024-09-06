import React from 'react'


const GreyBg = ({height,children}) => {

   const GreyBgStyle = {minHeight:`${height}`,backgroundColor:"#41414E",display:"flex",flexDirection:"column",justifyContent:"center",color:"#F9EEE1",alignItems:"center"}

    return (
        <div style={GreyBgStyle}>{children}</div>
    )
}

export default GreyBg