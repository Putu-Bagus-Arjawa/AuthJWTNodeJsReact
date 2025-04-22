import React, { useState } from 'react'
import Modal from './components/Modal'
import { Link } from 'react-router'

const App = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className={ ` bg-linear-to-r from-gray-200 to-neutral-400 `}>
      <button onClick={()=> setOpen(!open)} className='cursor-pointer'>Tekan ini brow</button>

      <div className={`flex justify-center items-center h-screen w-screen`}>
        <Modal open={open} onExit={()=> setOpen(false)}>
          <div className='flex flex-col'>
            <h2 className='text-[12px] font-semibold mb-6'>You Want to Go Where?</h2>
            <div className='flex justify-around'>
              <Link className='bg-green-400 rounded-xl px-2 py-1 min-w-18 max-w-18 text-center' to={"/login"}>Login</Link>
              <Link className='bg-red-400 rounded-xl px-2 py-1 min-w-18 max-w-18' to={"/register"}>Register</Link>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default App
