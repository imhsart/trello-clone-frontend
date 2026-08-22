import { useContext, useState, useEffect, useCallback } from "react"
import { UserContext } from "../Utils/UserContext"
import AddNewTask from "../Components/AddNewTask"
import axios from "axios"
import toast from "react-hot-toast"
import TaskCard from "../Components/TaskCard"


const Dashboard = () => {
  const [allTasks, setAllTasks] = useState([])
  const { userData } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const [addStatus, setAddStatus] = useState(null)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)

  const getTasksData = useCallback(async () => {
    try{
      setIsLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/get`, {withCredentials: true})
      setAllTasks(response.data.data)
    }
    catch(error){
      console.log(error)
      toast.error(error.response?.data?.message || 'Failed to fetch tasks.')
    }finally{
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    getTasksData()
  }, [getTasksData])

  async function handleDeleteTask(){
    try{
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tasks/delete/${taskToDelete._id}`, {withCredentials: true})
      toast.success(response.data.message)
      setTaskToDelete(null)
      getTasksData()
    }
    catch(error){
      console.log(error)
      toast.error(error.response?.data?.message || 'Failed to delete task!')
    }
  }

  function handleAddTask(specialStatus) {
    setIsAddTaskOpen(true)
    setAddStatus(specialStatus)
  }

  return (
    <div className="flex flex-col flex-1 bg-[#080D1A] px-3 py-6 font-mono md:px-8 xl:px-14">
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
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {/* Greeting icon */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600/30 text-lg sm:h-12 sm:w-12 sm:text-2xl">👋</div>
            <div>
              <h1 className="whitespace-nowrap text-base font-bold tracking-tight text-slate-100 sm:text-2xl">Welcome back,{" "}
                <span className="text-violet-400">{userData.data.username}!</span></h1>
              <p className="mt-1 text-sm text-slate-300">
                Let's get things done!
              </p>
            </div>
          </div>
          <button onClick={() => handleAddTask("")} className="flex cursor-pointer items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-500 active:translate-y-px">
            <span className="text-lg leading-none">+</span>
            Add Task
          </button>
        </div>
      </div>

      {/*  EMPTY BOARD  */}
      {
        (!isLoading && allTasks.length === 0) ? (
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
        ) : ( 
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/*  TO DO  */}
        <div className="flex flex-col h-[67vh] rounded-xl border border-slate-800 bg-[#0F1626] shadow-sm">
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
            <button onClick={() => handleAddTask("pending")} className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-violet-400 transition hover:bg-violet-500/10 hover:text-violet-300">
              <span className="text-lg leading-none">+</span>
              Add a task
            </button>
          </div>
          {/* Tasks */}
          <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none py-5 space-y-3 px-6">
            {
              allTasks.map(task => {
                if(task.status!== "pending") return null
                return <TaskCard key={task._id} task={task} onEdit={() =>{
                  setTaskToEdit(task)
                  setIsAddTaskOpen(true)
                }}
                onDelete={() => setTaskToDelete(task)}
                />
              })
            }
          </div>
        </div>
        {/*  IN PROGRESS  */}
        <div className="flex flex-col h-[67vh] rounded-xl border border-slate-800 bg-[#0F1626] shadow-sm">
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
            <button onClick={() => handleAddTask("inprogress")} className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-violet-400 transition hover:bg-violet-500/10 hover:text-violet-300">
              <span className="text-lg leading-none">+</span>
              Add a task
            </button>
          </div>
          {/* Tasks */}
          <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none py-5 space-y-3 px-6">
            {
              allTasks.map(task => {
                if(task.status!== "inprogress") return null
                return <TaskCard key={task._id} task={task} onEdit={() =>{
                  setTaskToEdit(task)
                  setIsAddTaskOpen(true)
                }}
                onDelete={() => setTaskToDelete(task)}
                />
              })
            }
          </div>
        </div>
        {/*  DONE  */}
        <div className="flex flex-col h-[67vh] rounded-xl border border-slate-800 bg-[#0F1626] shadow-sm md:col-span-2 xl:col-span-1">
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
            <button onClick={() => handleAddTask("complete")} className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-violet-400 transition hover:bg-violet-500/10 hover:text-violet-300">
              <span className="text-lg leading-none">+</span>
              Add a task
            </button>
          </div>
          {/* Tasks */}
          <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none py-5 space-y-3 px-6">
            {
              allTasks.map(task => {
                if(task.status!== "complete") return null
                return <TaskCard key={task._id} task={task} onEdit={() =>{
                  setTaskToEdit(task)
                  setIsAddTaskOpen(true)
                }}
                onDelete={() => setTaskToDelete(task)}
                />
              })
            }
          </div>
        </div>
      </div>
      )}
      {/*  ADD TASK MODAL */}
      {
        isAddTaskOpen && (
          <AddNewTask
            addStatus={addStatus}
            taskToEdit={taskToEdit}
            onClose={() => setIsAddTaskOpen(false)}
            onTaskSaved={() => {
              setIsAddTaskOpen(false)
              getTasksData()
              setAddStatus("")
              setTaskToEdit(null)
            }}
          />
        )
      }
      {/* delete task modal */}
      {
        taskToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 backdrop-blur-[2px]" onClick={() => setTaskToDelete(null)}> 
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl border border-slate-800 bg-[#0F1626] p-6 shadow-2xl shadow-black/40">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-100">Delete Task</h2>
                <button type="button" onClick={() => setTaskToDelete(null)} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-800 hover:text-slate-200">×</button>
              </div>
              <p className="text-sm leading-6 text-slate-400">Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-200">"{taskToDelete.title}"</span>? This action cannot be undone.</p>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button type="button" className="cursor-pointer rounded-lg border border-slate-700 bg-transparent px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white active:translate-y-px" onClick={() => setTaskToDelete(null)}>Cancel</button>
                <button type="button" className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-500 active:translate-y-px" onClick={handleDeleteTask}>Delete</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Dashboard