import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/authContext"
import { useEffect } from "react"
// import { Navbar } from "../components/Navbar"
export const AuthLayout = () => {

  const { token} = useAuth()
  const navigete = useNavigate()

  useEffect(() => {
    if(token) {
        navigete('/private')
    }
  }, [token])

  return (
    <div>
        {/* <Navbar /> */}
        <Outlet />
    </div>
  )
}