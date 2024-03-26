import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"

export const ShopLayout = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}