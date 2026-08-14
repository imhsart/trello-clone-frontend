import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "../Utils/UserContext"

const ProtectedRoute = () => {
  const { userData, loading } = useUserContext()
  if(loading){
    return <div>Loading...</div>
  }
  if(!userData){
    return <Navigate to={'/login'} replace />
  }
  return <Outlet />
}

export default ProtectedRoute