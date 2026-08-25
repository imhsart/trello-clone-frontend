import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import taskFlowLogo from '../Assets/taskflow_logo.png'

const Navbar = () => {
  const [isHamOPen, setIsHamOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="relative flex h-16 items-center justify-between border-b border-slate-200 bg-white px-3 md:px-8 shadow-sm dark:border-slate-800 dark:bg-[#0B1020]">
      {/* Left */}
      <div className="flex items-center gap-3 md:gap-8">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <img src={taskFlowLogo} alt="TaskFlow" className="h-12 w-auto object-contain" />
        </div>
        {/* Navigation */}
        <div className="flex items-center gap-1 hidden md:flex">
          <NavLink to="/dashboard" className={({ isActive }) => `rounded-lg px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-violet-500/15 text-violet-300" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>Dashboard</NavLink>
          <NavLink to="/profile" className={({ isActive }) => `rounded-lg px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-violet-500/15 text-violet-300" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>Profile</NavLink>
          <NavLink to="/settings" className={({ isActive }) => `rounded-lg px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-violet-500/15 text-violet-300" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>Settings</NavLink>        
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Avatar */}
        <div onClick={() => navigate("/profile")} className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-full bg-violet-600 text-sm font-semibold text-white shadow-sm">Pr</div>
        {/* hamburger menu button on smaller screens */}
        <button onClick={() => setIsHamOpen(prev => !prev)} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-300 hover:bg-slate-800 md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      </div>
      {
        isHamOPen && (
          <div className="absolute left-0 top-16 z-50 w-full border-b border-slate-800 bg-[#0B1020] px-3 py-3 shadow-lg md:hidden">
            <div className="flex flex-col gap-1">
                <NavLink to="/dashboard" onClick={() => setIsHamOpen(false)} className={({isActive}) => 
                  `rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    isActive ? "bg-violet-500/15 text-violet-300" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }>Dashboard</NavLink>
                <NavLink to="/profile" onClick={() => setIsHamOpen(false)} className={({isActive}) => 
                  `rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    isActive ? "bg-violet-500/15 text-violet-300" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }>Profile</NavLink>
                <NavLink to="/settings" onClick={() => setIsHamOpen(false)} className={({isActive}) => 
                  `rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    isActive ? "bg-violet-500/15 text-violet-300" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }>Settings</NavLink>
            </div>
          </div>
        )
      }
    </nav>
  )
}

export default Navbar