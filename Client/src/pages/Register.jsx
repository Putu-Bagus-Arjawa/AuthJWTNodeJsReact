import React from 'react'
import AuthForm from '../components/AuthForm'
import gambar from "../assets/dance cat.png"
import Button from '../components/Button'

const Register = () => {
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
        <AuthForm urlImage={gambar}>
            <h2 className='font-semibold text-2xl'>Welcome New User!</h2> 
            <p className='text-neutral-400 mb-4'>Register Before Using Our Apps</p>
            <div className='flex flex-col mb-4'>
                <label htmlFor="" className='mb-2 font-semibold'>Username</label>
                <input 
                    type="text"
                    className='focus:outline-none border-[0.5px] p-1 rounded-lg'
                    placeholder='Username'
                />
            </div>
            <div className='flex flex-col mb-4'>
                <label htmlFor="" className='mb-2 font-semibold'>Password</label>
                <input 
                    type="password"
                    className='focus:outline-none border-[0.5px] p-1 rounded-lg'
                    placeholder='Enter Your Password...'
                />
            </div>
            <div className='flex flex-col mb-4'>
                <label htmlFor="" className='mb-2 font-semibold'>Your Position</label>
                <select>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
            </div>
            <Button warna={'bg-emerald-400'}>Sign Up</Button>
        </AuthForm>
      
    </div>
  )
}

export default Register
