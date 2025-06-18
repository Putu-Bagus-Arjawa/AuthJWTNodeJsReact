import AuthForm from '../components/AuthForm'
import gambar from "../assets/dance cat.png"
import Button from '../components/Button'
import { Link } from 'react-router'
import { useState } from 'react'


const Register = () => {

    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "USER"
    })

    const [message, setMessage] = useState({pesan:"", tipe: ""});

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setMessage('')

        try {

        const respons = await fetch('http://localhost:8084/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        const hasil  = await respons.json()
        console.log(respons)


        if(respons.ok){  
            setForm({
                username:"",
                password: "",
                role: 'USER'
            });
            setMessage({pesan: hasil.message, tipe: "success"})
        } else{
            if(form.password.length < 8){
                setMessage({pesan: hasil.message, tipe:"failed"})
           }

           setMessage({pesan: hasil.message, tipe:"failed"})
        }
        } catch (error) {
            setMessage({pesan: error, tipe: "failed"})
        }
    }

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
        <AuthForm urlImage={gambar} handleSubmit={handleSubmit}>
            <h2 className='font-semibold text-2xl'>Welcome New User!</h2> 
            <p className='text-neutral-400 mb-4'>Register Before Using Our Apps</p>
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
            <div className='flex flex-col mb-4'>
                <label htmlFor="" className='mb-2 font-semibold'>Your Position</label>
                <select
                    value={form.role}
                    onChange={(e) =>{ 
                        setForm(restOf => ({...restOf, role: e.target.value}))
                        if (message.pesan) setMessage({pesan:"", tipe: ""}) 
                    }} 
                >
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                </select>
            </div>
            {message.pesan && (
                <p className={`${message.tipe == "success"? "text-green-600":"text-red-600"}`}>
                    {message.pesan}
                </p>
            )}
            <Button type={"submit"} warna={'bg-emerald-400'}>Sign Up</Button>
            <Link to={"/login"} className='text-gray-600'>Already have an account?Sign In</Link>
        </AuthForm>
      
    </div>
  )
}

export default Register
