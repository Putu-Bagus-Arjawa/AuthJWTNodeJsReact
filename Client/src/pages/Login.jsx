import AuthForm from '../components/AuthForm'
import gambar from "../assets/dance cat.png"
import Button from '../components/Button'
import { Link } from 'react-router'

const Login = () => {
  
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <AuthForm urlImage={gambar}>
            <h2 className='font-semibold text-2xl'>Welcome Back</h2> 
            <p className='text-neutral-400 mb-4'>Insert Your Identity First Before In!</p>
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
            <Button 
                warna={'bg-emerald-400'}
                type={"button"}
            >
                Sign In
            </Button>
            <Link className='text-gray-600' to={"/register"}>Don't Have an Account? Sign Up</Link>
      </AuthForm>
    </div>
  )
}

export default Login
