import React from 'react'
import './input.css'

const Input = ({type,placeholder,value, onChangeMethod/* , min=0 */}) => {
  return (
    <div>
        <input type={type} 
        className='input-style' 
        placeholder={placeholder} 
        onChange={onChangeMethod}
        value={value || ""}
       /*  min={min ||0} */ 
        />
       
    </div>
  )
}

export default Input