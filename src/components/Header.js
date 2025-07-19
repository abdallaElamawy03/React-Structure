import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';

import './App.css'
const Header = () => {
    const { auth } = useAuth();
    
    const logout = useLogout()
    const signOut = () =>{
        
        
        logout()
    }

    // Check if the user has the Admin role

    return (
    
                <>
              
   <div class="bg-gray-50 min-h-screen flex">
     {auth.roles == 'manager' || auth.roles == 'hr' ||auth.roles=='company' ? (
       <>
      <div
        class="sidebar bg-[#00224b] w-64 min-h-screen border-r border-gray-200 fixed hidden md:block"
      >
        <div class="p-4 flex items-center justify-center h-16">
          <p class="fas fa-users text-white text-2xl"></p>
          <span class="ml-2 text-xl font-semibold text-white">CEO </span>
        </div>
           <nav class="mt-6 px-4">
          <div class="space-y-1">
            <Link to={'/home'}
              href="/dashboard-admin.html"
              class=" text-white hover:bg-gray-800 group flex items-center px-4 py-3 rounded-lg"
            >
              <i class="fas fa-tachometer-alt mr-3"></i>
              Dashboard
            </Link>
            <Link to={"/all/employees"}
              href="employees.html"
              class="text-white hover:bg-gray-800 group flex items-center px-4 py-3 rounded-lg"
            >
              <i class="fas fa-user-tie mr-3"></i>
              Employees
            </Link>
            <Link to={"/all/attendance"}
              href="attendance.html"
              class="text-white hover:bg-gray-800 group flex items-center px-4 py-3 rounded-lg"
            >
              <i class="fas fa-calendar-alt mr-3"></i>
              Attendance
            </Link>
            <Link to={"/all/companytasks"}
              href="company-tasks.html"
              class="text-white hover:bg-gray-800 group flex items-center px-4 py-3 rounded-lg"
            >
              <i class="fa-solid fa-list-check mr-3"></i>
              Company Tasks
            </Link>
             <Link to={"/user/attend"}
              href="attendance.html"
              class="text-white hover:bg-gray-800 group flex items-center px-4 py-3 rounded-lg"
            >
              <i class="fas fa-calendar-alt mr-3"></i>
               my Attendance
            </Link>
            <Link to={"/user/tasks"}
              href="attendance.html"
              class="text-white hover:bg-gray-800 group flex items-center px-4 py-3 rounded-lg"
            >
              <i class="fas fa-calendar-alt mr-3"></i>
               my tasks
            </Link>
          </div>

          <div class="mt-8 pt-4 border-t border-gray-200">
            <h3
              class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              Settings
            </h3>

            <div class="mt-2 space-y-1">
              <Link to={'/user/profile'}
                href="admin-my-profile.html"
                class="text-white hover:bg-gray-800 group flex items-center px-4 py-3 rounded-lg"
              >
                <i class="fa-solid fa-circle-user mr-3"></i>
                Profile
              </Link>

              <button onClick={signOut}
                class="text-white block hover:bg-gray-800 group flex items-center px-4 py-3 rounded-lg"
              >
                <i class="fas fa-right-from-bracket mr-3"></i>
                Logout
              </button>
            </div>
          </div>
        </nav>
        </div>
          </>
        ):(
          <>
          <div
        class="sidebar bg-white w-64 min-h-screen border-r border-gray-200 fixed hidden md:block"
      >
        <div class="p-4 flex items-center justify-center h-16">
          <p class="fas fa-users text-[#00224b] text-2xl"></p>
          <span class="ml-2 text-xl font-semibold text-[#00224b]">HR </span>
        </div>
           <nav class="mt-6 px-4">
          <div class="space-y-1">
            <Link to={'/home'}
              href="/dashboard-admin.html"
              class=" text-gray-600  hover:bg-gray-100 group flex items-center px-4 py-3 rounded-lg"
            >
              <i class="fas fa-tachometer-alt mr-3"></i>
              Dashboard
            </Link>
       
           <Link to={"/user/attend"}
              href="attendance.html"
              class="text-gray-600 hover:bg-gray-100 group flex items-center px-4 py-3 rounded-lg"
            >
              <i class="fas fa-calendar-alt mr-3"></i>
               my Attendance
            </Link>
            <Link to={"/user/tasks"}
              href="attendance.html"
              class="text-gray-600 hover:bg-gray-100 group flex items-center px-4 py-3 rounded-lg"
            >
              <i class="fas fa-calendar-alt mr-3"></i>
               my tasks
            </Link>
          </div>

          <div class="mt-8 pt-4 border-t border-gray-200">
            <h3
              class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              Settings
            </h3>

            <div class="mt-2 space-y-1">
              <Link to={'/user/profile'}
                href="admin-my-profile.html"
                class="text-gray-600 hover:bg-gray-100 group flex items-center px-4 py-3 rounded-lg"
              >
                <i class="fa-solid fa-circle-user mr-3"></i>
                Profile
              </Link>

              <button onClick={signOut}
                class="text-red-500 block hover:bg-gray-100 group flex items-center px-4 py-3 rounded-lg"
              >
                <i class="fas fa-right-from-bracket mr-3"></i>
                Logout
              </button>
            </div>
          </div>
        </nav>
        </div>
        
          
          </>
        )}

       
      </div>
  


     
    </>
              
    );
};

export default Header;