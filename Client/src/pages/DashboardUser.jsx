import React from 'react'
import Card from '../components/Card'
import AuthForm from '../components/AuthForm'

const Dashboard = () => {
  const data =[
    {
      username: "Budi Doremi", 
      role: "USER",
    },
]
  return (
    <div>
      <h2>Halaman User</h2>
      <div>
      {data.map((item, i)=>(
          <AuthForm key={i}>
            <div>
              <p>{item.username}</p>
              <p>{item.role}</p>
            </div>
          </AuthForm>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
