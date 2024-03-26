import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/authContext"
import { useEffect } from "react"
import { Navbar } from "../components/Navbar"

export const PrivateLayout = () => {


  const { token, loginSuccessMessage } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if(!token) {
        navigate('/auth/login')
    }
  }, [token])

  return (
    <>
       <Navbar />
      { loginSuccessMessage && <p className='success-message login-successmessage'>{loginSuccessMessage}</p>} 
      <Outlet />
      
    </>
  )
}