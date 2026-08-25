import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const UserContext = createContext()

export function UserProvider({children}){
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <UserContext.Provider value={{userData, setUserData, loading, checkAuth}}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext(){
  return useContext(UserContext)
}