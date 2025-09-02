import { Button } from '@/components/ui/button'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/logout")
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/login")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong ❌");

    }
  }

  return (
    <div className=" w-full flex items-center justify-center">
      <div className="bg-[#FFFF] shadow-sm p-4 rounded w-[90%] md:w-[80%] h-10 px-3 py-6 mt-5 rounded-2xl flex items-center justify-between">
        <h1 className='text-xl font-semibold text-[#111827]'>SHAHID TODO</h1>
        <Button onClick={logoutHandler} className="text-white !bg-[#3B82F6]">Logout</Button>


      </div>
    </div>
  )
}

export default Navbar