import { useState } from "react";

const TaskCard = ({task, onEdit, onDelete, isMenuOpen, setOpenMenuId}) => {
  const [showViewModal, setShowViewModal] = useState(false)

  const [isDragging, setIsDragging] = useState(false)
  const [dragPos, setDragPos] = useState({x:0, y:0})

  const priorityStyles = {
    low: {
      badge: "border-emerald-400/30 bg-emerald-400/10",
      text: "text-emerald-300",
      dot: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]",
    },
    medium: {
      badge: "border-yellow-400/30 bg-yellow-400/10",
      text: "text-yellow-300",
      dot: "bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.9)]",
    },
    high: {
      badge: "border-red-400/30 bg-red-400/10",
      text: "text-red-300",
      dot: "bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.9)]",
    },
  };
  const statusStyles = {
    pending: {
      border: "hover:border-violet-400/60",
      shadow: "hover:shadow-[0_0_18px_rgba(167,139,250,0.22)]"
    },
    inprogress: {
      border: "hover:border-yellow-400/60",
      shadow: "hover:shadow-[0_0_18px_rgba(250,204,21,0.22)]"
    },
    complete: {
      border: "hover:border-emerald-400/60",
      shadow: "hover:shadow-[0_0_18px_rgba(52,211,153,0.22)]"
    }
  };
  function handleDragStart(e){
    e.dataTransfer.setData("taskId",task._id)

    //blank the native ghost so the browser draws nothing
    const emptyImg = new Image()
    emptyImg.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBTAA7"
    e.dataTransfer.setDragImage(emptyImg, 0, 0)

    setDragPos({x: e.clientX, y: e.clientY})
    setIsDragging(true)
  }
  function handleDrag(e){
    if(e.clientX === 0 && e.clientY === 0) return
    setDragPos({x: e.clientX, y: e.clientY})
  }
  function handleDragEnd(){
    setIsDragging(false)
  }
  function handleMenuClick(e){
    e.stopPropagation()
    setOpenMenuId(prev => prev===task._id ? null : task._id)
  }

  return (
    <>
    <div draggable onDragStart={handleDragStart} onDrag={handleDrag} onDragEnd={handleDragEnd} className={`cursor-pointer relative group rounded-xl border border-slate-600/80 bg-[#1A2340] p-5 shadow-md shadow-black/20 transition-all duration-300 ${statusStyles[task.status].border} ${statusStyles[task.status].shadow} ${isDragging ? "opacity-30" : ""}`}>
      <div className="mb-2 flex items-center justify-between gap-4">
        <h3 className="text-base font-semibold text-slate-100">{task.title}</h3>
        <button onClick={handleMenuClick} className="flex w-8 h-8 shrink-0 items-center justify-center rounded-lg text-lg font-bold leading-none text-slate-400 cursor-pointer transition hover:bg-slate-700 hover:text-white">⋮</button>
      </div>
      <div className="flex items-start justify-between gap-4">
        <p className="min-w-0 text-sm truncate leading-6 text-slate-400">{task.description}</p>
        <span className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border ${priorityStyles[task.priority].badge} ${priorityStyles[task.priority].text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${priorityStyles[task.priority].dot}`} />
            {task.priority}
        </span>
      </div>
      {
        isMenuOpen && (
          <div className="absolute right-5 top-14 z-20 w-28 overflow-hidden rounded-lg border border-slate-700 bg-[#0B1020] p-1 shadow-xl shadow-black/40">
            <button onClick={() => {
              setShowViewModal(true)
              setOpenMenuId(null)
            }} className="w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white">View</button>
            <button onClick={() => {
              setOpenMenuId(null)
              onEdit()
            }} className="w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white">Edit</button>
            <button onClick={() => {
              onDelete()
              setOpenMenuId(null)
            }} className="w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white">Delete</button>
          </div>
        )
      }
    </div>
    {/* floating drag preview */}
    {
      isDragging && (
         <div className="fixed z-[999] pointer-events-none w-72 rotate-2 rounded-xl border border-slate-600/80 bg-[#1A2340] p-5 shadow-2xl shadow-black/50" style={{ left: dragPos.x + 16, top: dragPos.y + 16 }}>
          <div className="mb-2 flex items-center justify-between gap-4">
            <h3 className="text-base font-semibold text-slate-100">{task.title}</h3>
            <span className="flex w-8 h-8 shrink-0 items-center justify-center text-lg font-bold leading-none text-slate-400">⋮</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <p className="min-w-0 text-sm truncate leading-6 text-slate-400">{task.description}</p>
            <span className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border ${priorityStyles[task.priority].badge} ${priorityStyles[task.priority].text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${priorityStyles[task.priority].dot}`} />
              {task.priority}
            </span>
          </div>
        </div>
      )
    }
    {
        showViewModal && (
          <div onClick={() => setShowViewModal(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 backdrop-blur-[2px]">
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0F1626] p-6 shadow-2xl shadow-black/40">
              {/* Header */}
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-100">Task Details</h2>
                <button type="button" onClick={() => setShowViewModal(false)} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-800 hover:text-slate-200">×</button>
              </div>
              {/* Title + Priority */}
              <div className="mb-5 flex items-start justify-between gap-4">
                <h3 className="min-w-0 text-xl font-semibold text-slate-100">{task.title}</h3>
                <span className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${priorityStyles[task.priority].badge} ${priorityStyles[task.priority].text}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${priorityStyles[task.priority].dot}`}/>
                  {task.priority}
                  </span>
              </div>
              {/* Description */}
              <div className="rounded-xl border border-slate-800 bg-[#0B1020] p-4">
                <p className="border-l-2 border-violet-500/60 pl-4 text-sm leading-6 text-slate-300">{task.description}</p>
              </div>
              {/* Footer */}
              <div className="mt-5 flex justify-end">
                <button type="button" onClick={() => setShowViewModal(false)} className="cursor-pointer rounded-lg border border-slate-700 bg-transparent px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white active:translate-y-px">Close</button>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default TaskCard