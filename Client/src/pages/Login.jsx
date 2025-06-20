import AuthForm from '../components/AuthForm'
import gambar from "../assets/dance cat.png"
import Button from '../components/Button'
import { Link, useNavigate, } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../components/AuthContext'

const Login = () => {
   const navigate = useNavigate()
   const {verify} = useAuth()
   const [form, setForm] = useState({
          username: "",
          password: "",
      })
  
    const [message, setMessage] = useState({pesan:"", tipe: ""});

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try {
      const respons = await fetch('http://localhost:8084/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify(form)
      });

      const hasil = await respons.json()
      console.log(respons)
      
      if(respons.ok){
           await verify()
          setTimeout(() => {
            navigate(hasil.redirectUrl)
          }, 1000);


            setForm({
                username:"",
                password: "",
            });
            setMessage({pesan: hasil.message, tipe: "success"})
      }else{
           setMessage({pesan: hasil.message, tipe:"failed"})
      }

    } catch (error) {
      setMessage({pesan: error, tipe: "failed"})
    }
  }
  
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <AuthForm urlImage={gambar} handleSubmit={handleSubmit}>
            <h2 className='font-semibold text-2xl'>Welcome Back</h2> 
            <p className='text-neutral-400 mb-4'>Insert Your Identity First Before In!</p>
            <div className='flex flex-col mb-4'>
                <label htmlFor="" className='mb-2 font-semibold'>Username</label>
                <input 
                    type="text"
                    className='focus:outline-none border-[0.5px] p-1 rounded-lg'
                    placeholder='Username'
                    value={form.username}
                    onChange={(e)=>{
                        setForm(restOf =>({...restOf, username: e.target.value}))
                        if (message.message) setMessage({message:"", type: ""})
                    }}
                />
            </div>
            <div className='flex flex-col mb-4'>
                <label htmlFor="" className='mb-2 font-semibold'>Password</label>
                <input 
                    type="password"
                    className='focus:outline-none border-[0.5px] p-1 rounded-lg'
                    placeholder='Enter Your Password...'
                    value={form.password}
                    onChange={(e)=>{
                        setForm(restOf =>({...restOf, password: e.target.value}))
                        if (message.pesan) setMessage({pesan:"", tipe: ""}) 
                    }}
                />
            </div>
              {message.pesan && (
                <p className={`${message.tipe == "success"? "text-green-600":"text-red-600"}`}>
                    {message.pesan}
                </p>
            )}
            <Button 
                warna={'bg-emerald-400'}
                type={"submit"}
            >
                Sign In
            </Button>
            <Link className='text-gray-600' to={"/register"}>Don't Have an Account? Sign Up</Link>
      </AuthForm>
    </div>
  )
}

export default Login
