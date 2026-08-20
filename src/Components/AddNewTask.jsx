import { useRef } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const AddNewTask = ({addStatus, taskToEdit, onClose, onTaskSaved}) => {
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const statusRef = useRef(null)
  const priorityRef = useRef(null)

  async function handleCreateTask(e){
    e.preventDefault()
    if(!(titleRef.current.value && descRef.current.value && statusRef.current.value && priorityRef.current.value)){
      toast.error("Please fill out all fields")
      return
    }
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tasks/create`, {
        title: titleRef.current.value,
        description: descRef.current.value,
        status: statusRef.current.value,
        priority: priorityRef.current.value 
      }, {withCredentials: true})

      toast.success(response.data.message)
      onTaskSaved()
    }
    catch(error){
      toast.error(error.response?.data?.message || 'Failed to create task')
    }
  }

  async function handleUpdateTask(e){
    e.preventDefault()
    if(!(titleRef.current.value && descRef.current.value && statusRef.current.value && priorityRef.current.value)){
      toast.error("Please fill out all fields")
      return
    }
    try{
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/tasks/update/${taskToEdit._id}`, {
        title: titleRef.current.value,
        description: descRef.current.value,
        status: statusRef.current.value,
        priority: priorityRef.current.value 
      }, {withCredentials: true})

      toast.success(response.data.message)
      onTaskSaved()
    }
    catch(error){
      console.log(error)
      toast.error(error.response?.data?.message || 'Failed to update task')
    }
  }

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/65 px-4 backdrop-blur-[2px]">
      <form onClick={(e) => e.stopPropagation()} onSubmit={taskToEdit ? handleUpdateTask : handleCreateTask} className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0F1626] p-5 shadow-2xl shadow-black/40 sm:p-7">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-100">{taskToEdit ? "Edit task" : "Create New Task"}</h2>
          <button type="button" onClick={onClose} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-800 hover:text-slate-200">×</button>
        </div>
        {/* Title */}
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium text-slate-300">Title</label>
          <input id="title" name="title" defaultValue={taskToEdit?.title || ""} placeholder="Enter task title" type="text" ref={titleRef} className="h-11 rounded-lg border border-slate-700 bg-[#0B1020] px-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"/>
        </div>
        {/* Description */}
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-medium text-slate-300">Description</label>
          <textarea id="description" name="description" defaultValue={taskToEdit?.description || ""} placeholder="Enter task description" ref={descRef} rows="3" className="resize-none rounded-lg border border-slate-700 bg-[#0B1020] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />
        </div>
        {/* Status */}
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="status" className="text-sm font-medium text-slate-300">Status</label>
          <select id="status" name="status" ref={statusRef} defaultValue={taskToEdit?.status || addStatus} className="h-11 cursor-pointer rounded-lg border border-slate-700 bg-[#0B1020] px-4 text-sm text-slate-100 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20">
            <option value="" disabled className="bg-[#0B1020]">Select status</option>
            <option value="pending" className="bg-[#0B1020]">Pending</option>
            <option value="inprogress" className="bg-[#0B1020]">In Progress</option>
            <option value="complete" className="bg-[#0B1020]">Complete</option>
          </select>
        </div>
        {/* Priority */}
        <div className="mb-6 flex flex-col gap-2">
          <label htmlFor="priority" className="text-sm font-medium text-slate-300">Priority</label>
          <select id="priority" name="priority" ref={priorityRef} defaultValue={taskToEdit?.priority || ""} className="h-11 cursor-pointer rounded-lg border border-slate-700 bg-[#0B1020] px-4 text-sm text-slate-100 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" >
            <option value="" disabled className="bg-[#0B1020]">Select priority</option>
            <option value="low" className="bg-[#0B1020]">Low</option>
            <option value="medium" className="bg-[#0B1020]">Medium</option>
            <option value="high" className="bg-[#0B1020]">High</option>
          </select>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button onClick={onClose} type="button" className="h-11 flex-1 cursor-pointer rounded-lg border border-slate-700 bg-transparent px-4 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white active:translate-y-px">Cancel</button>
          <button type="submit" className="h-11 flex-[2] cursor-pointer rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-500 active:translate-y-px">{taskToEdit ? "Update Task" : "Create Task"}</button>
        </div>
      </form>
    </div>
  )
}

export default AddNewTask