import React from 'react'

const Button = ({children, warna, handleClick, type}) => {
  return (
    <button
        type={type}
        className={`px-2 py-1 text-center rounded-xl w-full ${warna}`}
        onClick={handleClick}
    > 
        {children}
    </button>
  )
}

export default Button
