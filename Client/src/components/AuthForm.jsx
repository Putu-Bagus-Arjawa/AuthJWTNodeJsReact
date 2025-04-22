import React from 'react'

const AuthForm = ({children, urlImage, handleSubmit}) => {
  return (
    <div className=' flex flex-col lg:flex-row justify-around shadow-lg p-8 w-1/2 gap-4 bg-neutral-100'>
        <img src={urlImage} className='rounded-full w-full lg:w-1/2'/>
        <form onSubmit={handleSubmit}>
            {children}
        </form>
    </div>
  )
}

export default AuthForm
