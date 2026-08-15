import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// check th code in the repository and video starts from 20;00


const Login = () => {
  const [userInputData, setUserInputData] = useState({
    email: '',
    username: '',
    password: ''
  })
  const navigate = useNavigate()
  function handleInputChange(e){
    setUserInputData({
      ...userInputData,
      [e.target.name] : e.target.value
    })
  }
  async function handleFormSubmit(e){
    e.preventDefault()
    try{
      if(userInputData.password && (userInputData.email || userInputData.username)){
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, userInputData, {withCredentials: true})
        toast.success(response.data.message)
        navigate('/dashboard')
      }
    }
    catch(error){
      toast.error(error?.response?.data?.message || "Login failed. Please try again.")
    }
    setUserInputData({email: '', username: '', password: ''})
  }

  return (
    <div className="min-h-screen bg-[#F3F4FF] flex items-center justify-center px-4 py-10">
      <form onSubmit={handleFormSubmit} className="w-full max-w-xl bg-white px-7 py-12 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.12)] sm:px-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back!</h1>
          <p className="mt-1 text-sm text-slate-500">Login to continue to your account</p>
        </div>
        <div className="mb-3 flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-800">Email</label>
          <input type="email" name="email" id="email" placeholder="wang@nihao.com" value={userInputData.email} onChange={handleInputChange} className="h-10 rounded-lg border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
        </div>
        <div className="my-4 flex items-center gap-5">
          <div className="h-px flex-1 bg-slate-300" />
          <span className="text-sm text-slate-400">or</span>
          <div className="h-px flex-1 bg-slate-300" />
        </div>
        <div className="mb-3 flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-medium text-slate-800">Username</label>
          <input type="text" name="username" id="username" placeholder="wangnihao" value={userInputData.username} onChange={handleInputChange} className="h-10 rounded-lg border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
        </div>
        <div className="mb-3 flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-slate-800">Password</label>
          <input type="password" name="password" id="password" placeholder="*********" value={userInputData.password} onChange={handleInputChange} className="h-10 rounded-lg border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
        </div>
        <button type="submit" className="h-10 w-full rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 text-base font-semibold text-white shadow-md shadow-violet-200 cursor-pointer transition hover:from-violet-700 hover:to-blue-600 active:scale-[0.99]">Login</button>
        <div className="m-5 h-px bg-slate-300" />
        <div className="text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <span onClick={() => navigate('/signup')} className="cursor-pointer font-medium text-violet-600 hover:text-violet-800">Sign Up</span>
        </div>
      </form>
    </div>
  )
}

export default Login