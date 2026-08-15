import { Children, createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext()

export function UserProvider({children}){
  const [userData, setUserData] = useState(null)

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext(){
  return useContext(UserContext)
}