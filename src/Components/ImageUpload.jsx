import { useRef, useState } from "react"
import { useUserContext } from "../Utils/UserContext"
import toast from "react-hot-toast"
import axios from "axios"

const ImageUpload = ({selectedImage, setSelectedImage, mode="camera"}) => {
  const [isImageUploading, setIsImageUploading] = useState(false)
  const { setUserData } = useUserContext()
  const inputRef = useRef(null)

  async function handleInputChange(e){
    const file = e.target.files[0]
    e.target.value = ""
    if(!file){
      toast.error('Image is required!')
      return
    }
    const maxSize = 3*1024*1024
    if(!file.type.startsWith("image/")){
      toast.error("File must be an image!")
      return
    }
    if(file.size > maxSize){
      toast.error("File size must be 3MB or less!")
      return
    }
    if(selectedImage){
      URL.revokeObjectURL(selectedImage)
    }
    if(setSelectedImage){
      setSelectedImage(URL.createObjectURL(file))
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

    try{
      setIsImageUploading(true)

      const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData)
      const imageUrl = response.data.secure_url

      const bResponse = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/edit`, {
      profilePicture: imageUrl
      },{withCredentials: true})

      setUserData(prev => ({
        ...prev,
        data: {
          ...prev.data,
          profilePicture: bResponse.data.data.profilePicture
        }
      }))
      if(selectedImage){
        URL.revokeObjectURL(selectedImage)
      }
      if(setSelectedImage){
        setSelectedImage(null)
      }
      toast.success(bResponse.data.message)
    }
    catch(error){
      console.log(error)
      toast.error(error.response?.data?.message || "Failed to update details!")
    }
    finally{
      setIsImageUploading(false)
    }
  }

  return (
    <>
      {
        mode === "camera" ? (
          isImageUploading ? (
            <div className="absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#10152B] bg-violet-600">
              <div className="h-5 w-5 animate-spin rounded-full border-3 border-violet-200 border-t-violet-700" />
            </div>
          ) : (
          <button type="button" onClick={() => inputRef.current.click()} className="absolute bottom-1 right-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-4 border-[#10152B] bg-violet-600 text-white shadow-lg transition hover:bg-violet-500">📷</button>
          )
        ) : (
          <button type="button" onClick={() => inputRef.current.click()} disabled={isImageUploading} className="cursor-pointer rounded-lg border border-slate-700 bg-[#151F36] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300 disabled:cursor-not-allowed disabled:opacity-50">{isImageUploading ? "Uploading..." : "Change"}</button>
        )}
       <input className="hidden" ref={inputRef} type="file" accept="image/*" onChange={handleInputChange} />
    </>
  )
}

export default ImageUpload