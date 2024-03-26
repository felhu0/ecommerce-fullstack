import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/authContext"
import { Navbar } from "../components/Navbar"
import '../pages/OrderHistory.css'


export const OrderLayout = () => {


  const { token } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    if(!token) {
        navigate('/Auth/login')
    }
  }, [token, navigate])
  return (
    <>
       <Navbar />
       <Outlet />
    </>
  )
}