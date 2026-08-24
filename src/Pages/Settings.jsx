import { useRef, useState } from "react"
import { useUserContext } from "../Utils/UserContext"
import EditableField from "../Components/EditableField"
import ImageUpload from "../Components/ImageUpload"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Settings = () => {
  const { userData } = useUserContext()
  const [isEditUser, setIsEditUser] = useState(false)
  const [isEditOrg, setIsEditOrg] = useState(false)
  const [isEditPassword, setIsEditPassword] = useState(false)
  const oldPassRef = useRef(null)
  const newPassRef = useRef(null)
  const navigate = useNavigate()

  async function handleLogout(){
    const confirmLogout = window.confirm("Do you want to log out?")
    if(!confirmLogout){
      return
    }
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/logout`,null, {withCredentials: true})
      toast.success(response.data.message)
      navigate("/login")
    } 
    catch(error){
      console.log(error)
      toast.error(error.response?.data?.message || "Failed to log out!")
    }
  }
  async function handleChangePassword(e){
    e.preventDefault()
    if(!oldPassRef.current.value || !newPassRef.current.value){
      toast.error("Please fill in all the fields!")
      return
    }
    try{
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/change-pass`, {
        oldPassword: oldPassRef.current.value,
        newPassword: newPassRef.current.value 
      }, {withCredentials: true})
      oldPassRef.current.value = ""
      newPassRef.current.value = ""
      setIsEditPassword(false)
      toast.success(`${response.data.message} Please login again!`)
      navigate("/login")
    }
    catch(error){
      console.log(error)
      toast.error(error.response?.data?.message || "Failed to change password!")
    }
  }

  return (
    <div className="flex-1 px-4 py-6 font-mono sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-slate-400">Manage your account and preferences.</p>
      </div>
      {/* Account */}
      <div className="mb-6 rounded-xl border border-slate-800 bg-[#0D1626] shadow-sm">
        <div className="border-b border-slate-800 px-6 py-5 sm:px-8">
          <h2 className="text-lg font-bold text-slate-100">Account</h2>
          <p className="mt-1 text-sm text-slate-400">Manage your profile information.</p>
        </div>
        <div className="px-6 py-2 sm:px-8">
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 py-5">
            <div>
              <h3 className="text-sm font-medium text-slate-100">Username</h3>
              <p className="mt-1 text-xs text-slate-500">Change your username.</p>
            </div>
            {!isEditUser && <button onClick={() => {
              setIsEditUser(true)
            }} type="button" className="cursor-pointer rounded-lg border border-slate-700 bg-[#151F36] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300">Edit</button>}
          </div>
            {
              isEditUser && (
                <EditableField label="Username" value={userData.data.username} field="username" onSave={() => setIsEditUser(false)} onCancel={() => setIsEditUser(false)} />
              )
            }
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 py-5">
            <div>
              <h3 className="text-sm font-medium text-slate-100">Profile Picture</h3>
              <p className="mt-1 text-xs text-slate-500">Update your profile picture.</p>
            </div>
            <ImageUpload mode="button" />
          </div>
          <div className="flex items-center justify-between gap-4 py-5">
            <div>
              <h3 className="text-sm font-medium text-slate-100">Organization</h3>
              <p className="mt-1 text-xs text-slate-500">Update your organization.</p>
            </div>
            {!isEditOrg && <button onClick={() => {
              setIsEditOrg(true)
            }} type="button" className="cursor-pointer rounded-lg border border-slate-700 bg-[#151F36] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300">Update</button>}
          </div>
            {
              isEditOrg && (
                <EditableField label="Organization" value={userData.data.organization || ""} field="organization" onSave={() => setIsEditOrg(false)} onCancel={() => setIsEditOrg(false)} />
              )
            }
        </div>
      </div>
      {/* Preferences */}
      {/* <div className="mb-6 rounded-xl border border-slate-800 bg-[#0D1626] shadow-sm">
        <div className="border-b border-slate-800 px-6 py-5 sm:px-8">
          <h2 className="text-lg font-bold text-slate-100">Preferences</h2>
          <p className="mt-1 text-sm text-slate-400">Customize your experience.</p>
        </div>
        <div className="px-6 py-2 sm:px-8">
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 py-5">
            <div>
              <h3 className="text-sm font-medium text-slate-100">Theme</h3>
              <p className="mt-1 text-xs text-slate-500">Choose your preferred appearance.</p>
            </div>
            <button type="button" className="cursor-pointer rounded-lg border border-slate-700 bg-[#151F36] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300">Dark</button>
          </div>
          <div className="flex items-center justify-between gap-4 py-5">
            <div>
              <h3 className="text-sm font-medium text-slate-100">Notifications</h3>
              <p className="mt-1 text-xs text-slate-500">Manage notification preferences.</p>
            </div>
            <button type="button" className="relative h-6 w-11 cursor-pointer rounded-full bg-violet-600 transition hover:bg-violet-500">
              <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>
        </div>
      </div> */}
      {/* Security */}
      <div className="mb-6 rounded-xl border border-slate-800 bg-[#0D1626] shadow-sm">
        <div className="border-b border-slate-800 px-6 py-5 sm:px-8">
          <h2 className="text-lg font-bold text-slate-100">Security</h2>
          <p className="mt-1 text-sm text-slate-400">Manage your account security.</p>
        </div>
        <div className="px-6 py-2 sm:px-8">
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 py-5">
            <div>
              <h3 className="text-sm font-medium text-slate-100">Change Password</h3>
              <p className="mt-1 text-xs text-slate-500">Update your account password.</p>
            </div>
            {
              !isEditPassword && <button onClick={() => setIsEditPassword(true)} type="button" className="cursor-pointer rounded-lg border border-slate-700 bg-[#151F36] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300">Change</button>
            }
          </div>
          {
            isEditPassword && (
              <div className="mt-4 rounded-xl border border-slate-800 bg-[#151F36] p-4">
                <form onSubmit={handleChangePassword}>
                  <label htmlFor="old-password" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Old Password</label>
                  <input id="old-password" type="password" ref={oldPassRef} placeholder="Enter old password" className="w-full rounded-lg border border-slate-700 bg-[#0B1020] px-3 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20" />
                  <label htmlFor="new-password" className="mt-5 mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">New Password</label>
                  <input id="new-password" type="password" ref={newPassRef}  placeholder="Enter new password" className="w-full rounded-lg border border-slate-700 bg-[#0B1020] px-3 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20" />
                  <div className="mt-2 flex justify-end gap-2 items-center">
                    <button onClick={() => setIsEditPassword(false)} type="button" className="cursor-pointer rounded-lg border border-slate-700 px-3.5 py-2 font-medium text-slate-400 transition hover:bg-slate-800 hover:text-slate-200">Cancel</button>
                    <button type="submit" className="cursor-pointer rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500 active:translate-y-px">Change Password</button>
                  </div>
                </form>
              </div>
            )
          }
          <div className="flex items-center justify-between gap-4 py-5">
            <div>
              <h3 className="text-sm font-medium text-slate-100">Logout</h3>
              <p className="mt-1 text-xs text-slate-500">Sign out of your account.</p>
            </div>
            <button onClick={handleLogout} type="button" className="cursor-pointer rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300">Logout</button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 py-3 text-xs text-slate-500">
        <span>🔒</span>
        <span>Your account settings are private and secure.</span>
      </div>
    </div>
  )
}

export default Settings