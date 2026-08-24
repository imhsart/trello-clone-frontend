import axios from "axios"
import { useRef } from "react"
import toast from "react-hot-toast"
import { useUserContext } from "../Utils/UserContext"

const EditableField = ({label, value, field, onSave, onCancel}) => {
  const fieldRef = useRef(null)
  const {setUserData} = useUserContext()
  async function handleUpdate(e){
    e.preventDefault()
    const newValue = fieldRef.current.value.trim()
    if(!newValue){
      toast.error(`Please enter a ${field}.`)
      return
    }
    try{
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/edit`,{
        [field]: newValue
      }, {withCredentials: true})
      toast.success(response.data.message)
      setUserData(prev => ({
        ...prev,
        data: {
          ...prev.data,
          [field]: response.data.data[field]
        }
      }))
      fieldRef.current.value = ""
      onSave()
    }
    catch(error){
      console.log(error)
      toast.error(error.response?.data?.message || "Failed to update details!")
    }
  }

  return (
    <div className="mt-4 rounded-xl border border-slate-800 bg-[#151F36] p-4">
      <form onSubmit={handleUpdate}>
        <label htmlFor={`edit-${field}`} className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Edit {label}</label>
        <input id={`edit-${field}`} type="text" defaultValue={value} ref={fieldRef} name={field} placeholder={`Update your ${field}`} className="w-full rounded-lg border border-slate-700 bg-[#0B1020] px-3 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20" />
        <div className="mt-2 flex justify-end gap-2 items-center">
          <button onClick={onCancel} type="button" className="cursor-pointer rounded-lg border border-slate-700 px-3.5 py-2 font-medium text-slate-400 transition hover:bg-slate-800 hover:text-slate-200">Cancel</button>
          <button type="submit" className="cursor-pointer rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500 active:translate-y-px">Save</button>
        </div>
      </form>
    </div>
  )
}

export default EditableField