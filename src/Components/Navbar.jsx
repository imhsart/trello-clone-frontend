import { Link } from "react-router-dom";

const Navbar = () => {
  return (    
    <nav className="flex h-16 items-center justify-between px-8 bg-violet-400 shadow-sm">
      <div className="flex gap-6 items-center">
        <div className="text-2xl font-bold text-white">
          Logo
        </div>
          <Link to={'/dashboard'} className="text-white text-sm font-bold hover:text-violet-800">Dashboard</Link>
          <Link to={'/starred'} className="text-white text-sm font-bold hover:text-violet-800">Starred</Link>
          <Link to={'/profile'} className="text-white text-sm font-bold hover:text-violet-800">Profile</Link>
          <Link to={'/settings'} className="text-white text-sm font-bold hover:text-violet-800">Settings</Link>
      </div>
      <div className="flex gap-4 items-center">
        <div className="text-white relative">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" fill="white">
            <path d="M16 19a4 4 0 11-8 0H4.765C3.21 19 2.25 17.304 3.05 15.97l1.806-3.01A1 1 0 005 12.446V8a7 7 0 0114 0v4.446c0 .181.05.36.142.515l1.807 3.01c.8 1.333-.161 3.029-1.716 3.029H16ZM12 3a5 5 0 00-5 5v4.446a3 3 0 01-.428 1.543L4.765 17h14.468l-1.805-3.01A3 3 0 0117 12.445V8a5 5 0 00-5-5Zm-2 16a2 2 0 104 0h-4Z"></path>
          </svg>
          <div className="flex items-center justify-center absolute -top-1 -right-1 border-2 text-white bg-violet-900 rounded-full text-[11px] w-[16px] h-[16px]">3</div>
        </div>
        <div className="flex items-center justify-center text-white rounded-full bg-violet-800 w-9 h-9">Pr</div>
      </div>
    </nav>
  )
}

export default Navbar