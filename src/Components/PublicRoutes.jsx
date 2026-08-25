import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "../Utils/UserContext"

const PublicRoute = () => {
  const {userData, loading} = useUserContext()

  if(loading){
    return <div className="flex min-h-screen bg-[#080D1A] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
      </div>
  }
  if(userData){
    return <Navigate to={"/dashboard"} replace />
  }
  return <Outlet />
}

export default PublicRoute