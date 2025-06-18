import React from 'react'
import AuthForm from '../components/AuthForm'

const DashboardAdmin = () => {
    const data =[
            {
      username: "Budi Doremi", 
      role: "ADMIN",
    },    {
      username: "Budi Tanoer", 
      role: "USER",
    },    {
      username: "JuJu Wenjun", 
      role: "ADMIN",
    },    {
      username: "Arka Jawara", 
      role: "USER",
    },
    ]
  return (
    <div>
        <h2>Halaman Admin</h2>
        <div>
            {data.map((item, i)=>(
                <AuthForm key={i}>
                    <div className=''>
                        <p className=''>{item.username}</p>
                        <p>{item.role}</p>
                    </div>
                </AuthForm>
                ))}
        </div>
    </div>
  )
}

export default DashboardAdmin
