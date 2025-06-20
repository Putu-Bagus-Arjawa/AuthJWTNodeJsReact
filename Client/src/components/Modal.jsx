

const Modal = ({open, onExit, children}) => {
  return (
    <div className='flex justify-center'>
        <div             
            className={` bg-white rounded-xl shadow-xl p-6 w-50 transition-all  ${open?'scale-125 opacity-100': 'scale-100 opacity-0'}`}
        >
            <div className='flex justify-end'>
                <button onClick={onExit} className=''> X </button>
            </div>

            {children}
        </div>
    </div>
  )
}

export default Modal
