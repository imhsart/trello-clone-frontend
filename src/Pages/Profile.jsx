import axios from "axios"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { useUserContext } from "../Utils/UserContext"
import { useNavigate } from "react-router-dom"
import ImageUpload from "../Components/ImageUpload"

const Profile = () => {
  const { userData } = useUserContext()
  const [tasks, setTasks] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(null)
  const totalTasks = tasks?.length ?? 0
  const completedTasks = tasks?.filter(task => task.status === 'complete').length ?? 0
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks/totalTasks)*100)
  const createdDate = userData?.data?.createdAt ? new Date(userData.data.createdAt) : null
  const memberSince = createdDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  })
  const today = new Date()
  const daysActive = createdDate ? Math.floor((today - createdDate)/(1000*60*60*24)) : 0

  async function handleDataFetch(){
    try{
      setIsLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/get`, {withCredentials: true})
      setTasks(response.data.data)
    }
    catch(error){
      console.log(error)
      toast.error(error.response?.data?.message || 'Failed to fetch tasks.')
    }
    finally{
      setIsLoading(false)
    }
  }
  useEffect(() => {
    handleDataFetch()
  }, [])

  if(isLoading){
    return (
      <div className="flex min-h-screen bg-[#080D1A] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
      </div>
    )
  }
  return (
    <div className="flex-1 px-4 py-6 font-mono sm:px-6 lg:px-8">
      {/*  PROFILE HEADER */}
      <div className="mb-6 flex min-h-[280px] flex-col gap-8 rounded-xl border border-slate-800 bg-gradient-to-r from-[#0D1629] via-[#10152B] to-[#211044] px-6 py-8 shadow-sm sm:px-8 lg:flex-row lg:items-center lg:px-10">
        {/* Left side - Profile picture + quick details */}
        <div className="flex flex-1 items-center gap-6">
          {/* Profile Picture */}
          <div className="relative shrink-0">
            <div className="h-36 w-36 overflow-hidden rounded-full border-2 border-violet-400/50 bg-slate-800 shadow-lg shadow-violet-950/30 sm:h-40 sm:w-40">
              <img
                src={selectedImage || userData.data.profilePicture || "https://img.icons8.com/nolan/720/user-default.png"}
                className="h-full w-full object-cover"
              />
            </div>
           <ImageUpload selectedImage={selectedImage} setSelectedImage={setSelectedImage} mode="camera" />
          </div>

          {/* Name */}
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">{userData.data.firstname || "-"}{" "}{userData.data.lastname || "-"}</h1>
            <p className="mt-1 text-sm font-semibold text-violet-400 sm:text-base">{`@${userData.data.username}` || "-"}</p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Stay focused, stay consistent,<br />and make progress every day.</p>
          </div>
        </div>
        {/* Right side - Quick details */}
        <div className="w-full border-t border-slate-800 pt-6 lg:w-[42%] lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="w-24 shrink-0 text-sm text-slate-400">Email</span>
              <span className="truncate text-sm font-medium text-slate-100">{userData.data.email || "-"}</span>
            </div>
            <div className="group flex items-center gap-4">
              <span className="w-24 shrink-0 text-sm text-slate-400">Username</span>
              <div className="flex min-w-0 items-center gap-2">
                <span className="truncate text-sm font-medium text-slate-100">{`@${userData.data.username}` || "-"}</span>
                <button type="button" aria-label="Edit username" className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-slate-500 opacity-100 transition hover:bg-slate-800 hover:text-violet-400 sm:opacity-0 sm:group-hover:opacity-100" onClick={() => navigate("/settings")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="group flex items-center gap-4">
              <span className="w-24 shrink-0 text-sm text-slate-400">Organization</span>
              <div className=" group flex min-w-0 items-center gap-2">
                <span className="text-sm font-medium text-slate-100">{userData.data.organization || "-"}</span>
                <button type="button" aria-label="Edit organization" className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-slate-500 opacity-100 transition hover:bg-slate-800 hover:text-violet-400 sm:opacity-0 sm:group-hover:opacity-100" onClick={() => navigate("/settings")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-24 shrink-0 text-sm text-slate-400">Member Since</span>
              <span className="text-sm font-medium text-slate-100">{memberSince || "-"}</span>
            </div>
          </div>
        </div>
      </div>
      {/*  PERSONAL INFORMATION  */}
      <div className="mb-6 rounded-xl border border-slate-800 bg-[#0D1626] shadow-sm">
        {/* Heading */}
        <div className="flex items-center gap-4 border-b border-slate-800 px-6 py-5 sm:px-8">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-xl text-violet-400">👤</div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Personal Information</h2>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">Your personal details and information.</p>
          </div>
        </div>
      {/* Details */}
        <div className="px-6 py-2 sm:px-8">
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 py-4">
            <span className="text-sm text-slate-400">First Name</span>
            <span className="text-sm font-medium text-slate-100">{userData.data.firstname || "-"}</span>
          </div>
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 py-4">
            <span className="text-sm text-slate-400">Last Name</span>
            <span className="text-sm font-medium text-slate-100">{userData.data.lastname || "-"}</span>
          </div>
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 py-4">
            <span className="text-sm text-slate-400">Username</span>
            <span className="text-sm font-medium text-slate-100">{`@${userData.data.username}` || "-"}</span>
          </div>
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 py-4">
            <span className="text-sm text-slate-400">Email</span>
            <span className="truncate text-sm font-medium text-slate-100">{userData.data.email || "-"}</span>
          </div>
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 py-4">
            <span className="text-sm text-slate-400">Date of Birth</span>
            <span className="text-sm font-medium text-slate-100">{userData.data.DOB || "-"}</span>
          </div>
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 py-4">
            <span className="text-sm text-slate-400">Gender</span>
            <span className="text-sm font-medium text-slate-100">{userData.data.gender || "-"}</span>
          </div>
          <div className="flex items-center justify-between gap-4 py-4">
            <span className="text-sm text-slate-400">Organization</span>
            <span className="text-sm font-medium text-slate-100">{userData.data.organization || "-"}</span>
          </div>
        </div>
      </div>
      {/*  ACCOUNT OVERVIEW  */}
      <div className="mb-6 rounded-xl border border-slate-800 bg-[#0D1626] shadow-sm">
        {/* Heading */}
        <div className="flex items-center gap-4 border-b border-slate-800 px-6 py-5 sm:px-8">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-xl text-violet-400">📊</div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Account Overview</h2>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">A quick overview of your account.</p>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 sm:p-8">
          <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-[#151F36] p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xl text-blue-400">📋</div>
            <div>
              <h3 className="text-2xl font-bold text-slate-100">{totalTasks}</h3>
              <p className="text-sm font-medium text-slate-200">Tasks Created</p>
              <p className="mt-1 text-xs text-slate-500">Total tasks you've added</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-[#151F36] p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xl text-emerald-400">✓</div>
            <div>
              <h3 className="text-2xl font-bold text-slate-100">{completionRate}%</h3>
              <p className="text-sm font-medium text-slate-200">Tasks Completed</p>
              <p className="mt-1 text-xs text-slate-500">Overall completion rate</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-[#151F36] p-5 sm:col-span-2 lg:col-span-1">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-xl text-orange-400">📅</div>
            <div>
              <h3 className="text-2xl font-bold text-slate-100">{daysActive}</h3>
              <p className="text-sm font-medium text-slate-200">Days Active</p>
              <p className="mt-1 text-xs text-slate-500">Since you joined</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 py-3 text-xs text-slate-500">
        <span>🔒</span>
        <span>Your data is private and secure.</span>
      </div>
    </div>
  )
}

export default Profile