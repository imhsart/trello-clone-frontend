import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default DashboardLayout