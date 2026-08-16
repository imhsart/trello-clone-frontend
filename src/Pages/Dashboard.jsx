import { useContext, useState } from "react"
import { UserContext } from "../Utils/UserContext"
import AddNewTask from "../Components/AddNewTask"


const Dashboard = () => {
  const [allTasks, setAllTasks] = useState([])
  const { userData } = useContext(UserContext)
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)

  function handleAddTask() {
    setIsAddTaskOpen(true)
  }

  return (
    <div className="min-h-full bg-[#080D1A] px-8 py-6 font-mono">
      <div className="relative mb-8 overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-r from-[#0F172A] via-[#15132F] to-[#211044] px-6 py-5">
        {/* Decorative purple glow */}
        <div className="pointer-events-none absolute -right-16 -top-24 h-56 w-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="pointer-events-none absolute right-24 -top-16 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-56 top-8 h-24 w-24 rounded-full bg-violet-400/10 blur-2xl" />
        {/* Small decorative stars */}
        <div className="pointer-events-none absolute right-[28%] top-7 text-violet-500/20">✦</div>
        <div className="pointer-events-none absolute right-[20%] top-16 text-violet-400/20">✦</div>
        <div className="pointer-events-none absolute right-[35%] top-12 text-violet-400/10">✦</div>
        <div className="pointer-events-none absolute right-[13%] top-8 text-violet-400/15">✦</div>
        <div className="pointer-events-none absolute right-[7%] top-16 text-violet-500/20">✦</div>
        {/* Banner content */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Greeting icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-600/30 text-2xl">👋</div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-100">Welcome back,{" "}
                <span className="text-violet-400">{userData.data.username}!</span>{" "}👋</h1>
              <p className="mt-1 text-sm text-slate-300">
                Let's get things done!
              </p>
            </div>
          </div>
          <button onClick={handleAddTask} className="flex cursor-pointer items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-500 active:translate-y-px">
            <span className="text-lg leading-none">+</span>
            Add Task
          </button>
        </div>
      </div>

      {/* COLUMNS */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/*  TO DO  */}
        <div className="min-h-[350px] rounded-xl border border-slate-800 bg-[#0F1626] shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="9" y1="6" x2="20" y2="6" />
                  <line x1="9" y1="12" x2="20" y2="12" />
                  <line x1="9" y1="18" x2="20" y2="18" />
                  <circle cx="4" cy="6" r="1" fill="currentColor" />
                  <circle cx="4" cy="12" r="1" fill="currentColor" />
                  <circle cx="4" cy="18" r="1" fill="currentColor" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-blue-400">
                To Do
              </h2>
            </div>
            <button onClick={handleAddTask} className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-violet-400 transition hover:bg-violet-500/10 hover:text-violet-300">
              <span className="text-lg leading-none">+</span>
              Add a task
            </button>
          </div>
          {/* Tasks */}
          <div className="mt-5 space-y-3 px-6">

          </div>
        </div>
        {/*  IN PROGRESS  */}
        <div className="min-h-[350px] rounded-xl border border-slate-800 bg-[#0F1626] shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="17.66" cy="6.34" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="20" cy="12" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="17.66" cy="17.66" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="12" cy="20" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="6.34" cy="17.66" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="6.34" cy="6.34" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-orange-400">
                In Progress
              </h2>
            </div>
            <button onClick={handleAddTask} className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-violet-400 transition hover:bg-violet-500/10 hover:text-violet-300">
              <span className="text-lg leading-none">+</span>
              Add a task
            </button>
          </div>
          {/* Tasks */}
          <div className="mt-5 space-y-3 px-6">

          </div>
        </div>
        {/*  DONE  */}
        <div className="min-h-[350px] rounded-xl border border-slate-800 bg-[#0F1626] shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/15 text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                  <path d="M5 12.5L9.5 17L19 7" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-green-400">
                Done
              </h2>
            </div>
            <button onClick={handleAddTask} className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-violet-400 transition hover:bg-violet-500/10 hover:text-violet-300">
              <span className="text-lg leading-none">+</span>
              Add a task
            </button>
          </div>
          {/* Tasks */}
          <div className="mt-5 space-y-3 px-6">

          </div>
        </div>
      </div>
      {/*  EMPTY BOARD  */}
      {
        allTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-5 pb-2 text-center">
            <h2 className="mt-2 text-2xl font-bold text-slate-100">
              This board is empty
            </h2>
            <p className="mt-2 text-base text-slate-400">
              Get started by adding a task to this board.
            </p>
            <button onClick={handleAddTask} className="mt-4 flex cursor-pointer items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-500 active:translate-y-px">
              <span className="text-lg leading-none">+</span>
              Add your first task
            </button>
          </div>
        )
      }
      {/*  ADD TASK MODAL */}
      {
        isAddTaskOpen && (
          <AddNewTask
            onClose={() => setIsAddTaskOpen(false)}
            onTaskCreated={() => {
              setIsAddTaskOpen(false)
            }}
          />
        )
      }
    </div>
  )
}

export default Dashboard