import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isHamOPen, setIsHamOpen] = useState(false)
  return (
    <nav className="relative flex h-16 items-center justify-between border-b border-slate-200 bg-white px-3 md:px-8 shadow-sm dark:border-slate-800 dark:bg-[#0B1020]">
      {/* Left */}
      <div className="flex items-center gap-3 md:gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="9" y1="6" x2="20" y2="6" />
              <line x1="9" y1="12" x2="20" y2="12" />
              <line x1="9" y1="18" x2="20" y2="18" />
              <circle cx="4" cy="6" r="1" fill="currentColor" />
              <circle cx="4" cy="12" r="1" fill="currentColor" />
              <circle cx="4" cy="18" r="1" fill="currentColor" />
            </svg>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            Logo
          </div>
        </div>
        {/* Navigation */}
        <div className="flex items-center gap-1 hidden md:flex">
          <NavLink to="/dashboard" className={({ isActive }) => `rounded-lg px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-violet-500/15 text-violet-300" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>Dashboard</NavLink>
          <NavLink to="/starred" className={({ isActive }) => `rounded-lg px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-violet-500/15 text-violet-300" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>Starred</NavLink>
          <NavLink to="/profile" className={({ isActive }) => `rounded-lg px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-violet-500/15 text-violet-300" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>Profile</NavLink>
          <NavLink to="/settings" className={({ isActive }) => `rounded-lg px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-violet-500/15 text-violet-300" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>Settings</NavLink>        
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <div className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="white" stroke="currentColor" strokeWidth="1">
            <path d="M16 19a4 4 0 11-8 0H4.765C3.21 19 2.25 17.304 3.05 15.97l1.806-3.01A1 1 0 005 12.446V8a7 7 0 0114 0v4.446c0 .181.05.36.142.515l1.807 3.01c.8 1.333-.161 3.029-1.716 3.029H16ZM12 3a5 5 0 00-5 5v4.446a3 3 0 01-.428 1.543L4.765 17h14.468l-1.805-3.01A3 3 0 0117 12.445V8a5 5 0 00-5-5Zm-2 16a2 2 0 104 0h-4Z" />
          </svg>
          <div className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white border-2">3</div>
        </div>
        {/* Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white shadow-sm">Pr</div>
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
                <NavLink to="/starred" onClick={() => setIsHamOpen(false)} className={({isActive}) => 
                  `rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    isActive ? "bg-violet-500/15 text-violet-300" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }>Starred</NavLink>
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