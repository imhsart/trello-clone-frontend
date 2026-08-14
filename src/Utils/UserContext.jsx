import { Children, createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext()

export function UserProvider({children}){
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUserData(){
      try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_USER_URL}/users/get-user-data`, {withCredentials: true})
        setUserData(response.data)
      }
      catch(error){
        console.error(error)
      }
      finally{
        setLoading(false)
      }
    }

    getUserData()
  }, [])

  return (
    <UserContext.Provider value={{userData, loading}}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext(){
  return useContext(UserContext)
}