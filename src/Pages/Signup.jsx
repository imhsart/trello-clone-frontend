import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    DOB: '',
    gender: '',
    password: '',
  })
  const navigate = useNavigate()

  function handleInputChange(e){
    const name = e.target.name
    const val = e.target.value
    setUserData({
      ...userData,
      [name]: val
    })
  }
  function handleFormSubmit(e){
    e.preventDefault()
     if(!(userData.firstname && userData.lastname && userData.username && userData.email && userData.DOB && userData.gender && userData.password)){
      return
     }
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/signup`, userData)
    .then(data => toast.success(data.data.message))
    .catch(error => toast.error(error?.response?.data?.message || "Sign Up failed. Please try again."))
    .finally(() => {
      setUserData({firstname: '', lastname: '', username: '', email: '', DOB: '', gender: '', password: ''})
    })
  }

  return (
    <div className="min-h-screen bg-[#F3F4FF] flex items-center justify-center px-4 py-10">
      {/* if circle bg isnt needed , change rounded-lg and sm:px-12 */}
      <form onSubmit={handleFormSubmit} className="w-full max-w-2xl bg-white px-7 py-7 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.12)] sm:px-18">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Create Your Account</h1>
          <p className="mt-1 text-sm text-slate-500">Join us today! It's quick and easy.</p>
        </div>
        <div className="mb-3 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstname" className="text-sm font-medium text-slate-800">First name:</label>
            <input id="firstname" type="text" name="firstname" value={userData.firstname} placeholder="Enter your first name" onChange={handleInputChange} className="h-10 rounded-lg border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-100" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastname" className="text-sm font-medium text-slate-800">Last name:</label>
            <input id="lastname" type="text" name="lastname" value={userData.lastname} placeholder="Enter your last name" onChange={handleInputChange} className="h-10 rounded-lg border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-100" />
          </div>
        </div>
        <div className="mb-3 flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-medium text-slate-800">Username:</label>
          <input id="username" type="text" name="username" value={userData.username} placeholder="Choose a username" onChange={handleInputChange} className="h-10 rounded-lg border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-100" />
        </div>
        <div className="mb-3 flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-800">Email:</label>
          <input id="email" type="email" name="email" value={userData.email} placeholder="Enter your email address" onChange={handleInputChange} className="h-10 rounded-lg border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-100" />
        </div>
        <div className="mb-3 flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-slate-800">Password:</label>
          <input id="password" type="password" name="password" value={userData.password} placeholder="Create a strong password" onChange={handleInputChange} className="h-10 rounded-lg border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-100" />
        </div>
        <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="dob" className="text-sm font-medium text-slate-800">Date of Birth:</label>
            <input id="dob" type="date" name="DOB" value={userData.DOB} onChange={handleInputChange} className="h-10 rounded-lg border border-slate-200 px-4 text-sm text-slate-600 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="gender" className="text-sm font-medium text-slate-800">Gender:</label>
            <select name="gender" onChange={handleInputChange} value={userData.gender} id="gender" className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100">
              <option value='' defaultValue={true}>Select</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='others'>Others</option>
            </select>
          </div>
        </div>
        <button type="submit" className="h-10 w-full rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 text-base font-semibold text-white shadow-md shadow-violet-200 cursor-pointer transition hover:from-violet-700 hover:to-blue-600 active:scale-[0.99]">Create Account</button>
        <div className="my-4 flex items-center gap-4 px-6">
          <div className="h-px flex-1 bg-slate-300"></div>
            <span className="text-sm text-slate-400">or</span>
          <div className="h-px flex-1 bg-slate-300"></div>
        </div>
        <div className="text-center text-sm text-slate-600">Already have an account?{" "}
          <span onClick={() => navigate('/login')} className="cursor-pointer font-medium text-violet-600 hover:text-violet-800">Sign in</span>
        </div>
      </form>
    </div>
  )
}

export default Signup