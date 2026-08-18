import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "../Utils/UserContext"
import { useState, useEffect } from "react"
import axios from "axios"

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true)
  const {userData, setUserData} = useUserContext()

  useEffect(() => {
    getUserData()
  }, [])

  async function getUserData(){
      try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/get-user-data`, {withCredentials: true})
        setUserData(response.data)
      }
      catch(error){
        if (error.response?.status === 401) {
        setUserData(null)
      } else {
        console.error('Failed to fetch user data:', error)
      }
      }
      finally{
        setLoading(false)
      }
    }

    if(loading){
      return <div className="flex min-h-screen bg-[#080D1A] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
      </div>
    }
     if(!userData){
      return <Navigate to={'/login'} replace />
    }
    return <Outlet />
}

export default ProtectedRoute