import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./App.css"
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/DashboardUser.jsx'
import DashboardAdmin from './pages/DashboardAdmin.jsx'

const routes = createBrowserRouter([
  {path: "/", element : <App/>},
   {path: "/user", element : <Dashboard/>},
    {path: "/admin", element : <DashboardAdmin/>},
  {path: "/login", element : <Login/>},
  {path: "/register", element : <Register/>},
  {path: "*", element : <NotFound/>},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
