import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
const UpperNav = () => {
    const { auth } = useAuth();
    const[name,setname]=useState('')
    useEffect(()=>{
        setname(auth?.user)
    },[auth])
  return (
  <header class="bg-white shadow-sm">
        <div
          class="max-w-full mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center"
        >
          

          <div class="flex-1 flex justify-between items-center">
            <div class="flex items-center">
              <h1 class="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>

            <div class="flex items-center space-x-4">
              <div class="relative">
                <button class="flex items-center space-x-2">
                  <div
                    class="h-8 w-8 rounded-full bg-[#00224b] flex items-center justify-center text-white"
                  >
                    <Link to={'/home'}>{name.slice(0,1)}{name.slice(-1)}</Link>
                  </div>
                  <div class="hidden md:inline">{auth?.user}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>  )
}

export default UpperNav