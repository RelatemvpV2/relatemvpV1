import React from 'react'
import './button.css'

const Button = ({ text, type, disabled, onclickMethod }) => <button
    className={type === 'social' ?
        'button-Social-style' : type === 'recommend' ?
            'button-recommend-style' : 'button-style'}
    disabled={disabled ? 'disabled' : ""}
    onClick={onclickMethod}
>

    {text}</button>


export default Button