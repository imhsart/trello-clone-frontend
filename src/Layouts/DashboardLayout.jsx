import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout