import { useState } from 'react'
import AuthForm from '../components/AuthForm'
import Button from '../components/Button'
import { useEffect } from 'react'
import { useAuth } from '../components/AuthContext'

const DashboardAdmin = () => {

const {logout} = useAuth()

  const [form, setForm] = useState({
          username: "",
          role: "",
      })

  

  const loadData = async ()=>{
    try {
        const respons = await fetch('http://localhost:8084/user', {credentials:"include"});
        const respon2 = await fetch('http://localhost:8084/admin', {credentials:"include"});
        const hasil = await respons.json()
        const data = await respon2.json()
        console.log(hasil)
        console.log(data)

        if(respons.ok){
            setForm(hasil)
        }
    } catch (error) {
           console.error(error)
    }
  }

  const handleLogout = async ()=>{
     await logout()
  }

  useEffect(()=>{loadData()},[])

  return (
    <div>
      <h2>Halaman Admin</h2>
      <div>
         <div className='flex justify-end px-8'>
             <div className='rounded-full bg-amber-500 text-white w-8 h-8 flex justify-center items-center p-8 text-2xl'>
                {form.username.charAt(0).toUpperCase()}
            </div>
         </div>


          <AuthForm>
            <div>
              <p>{form.username}</p>
              <p>{form.role}</p>
              <p>{form.username.length}</p>
              <p className='bg-green-500 p-4 text-white flex justify-center items-center rounded-xl'></p>
            </div>
          </AuthForm>
      </div>
      <Button handleClick={handleLogout} warna={"bg-linear-to-tr from-magenta-700 to-indigo-600 text-white"}>Logout</Button>


      <Button warna={"bg-blue-600"}>See All User</Button>
    </div>
  )
}

export default DashboardAdmin
