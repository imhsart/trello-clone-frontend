import { useContext } from "react"
import { UserContext } from "../Utils/UserContext"


const Dashboard = () => {
  const {userData} = useContext(UserContext)
  return (
    <div>
      <h1>{userData.message}</h1>
      <p>First name : {userData.data.firstname}</p>
      <p>Last name : {userData.data.lastname}</p>
    </div>
  )
}

export default Dashboard