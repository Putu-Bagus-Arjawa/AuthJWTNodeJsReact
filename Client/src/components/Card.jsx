import React from 'react'

const Card = ({children}) => {
  return (
    <div className='shadow-lg rounded-2xl p-4'>
      { children }
    </div>
  )
}

export default Card
