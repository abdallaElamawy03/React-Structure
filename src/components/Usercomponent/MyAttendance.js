import React from 'react'
import Header from '../Header'
import "../App.css"
import { useNavigate, Link,useLocation  } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import { useState , useEffect } from "react";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import UpperNav from '../UpperNav';
const MyAttendance = () => {
     const [users, setUsers] = useState(null);
    const [tasks, setTasks] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();
    const[date,formattedDate] = useState('')
    
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
       
        
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.post('/attend/user', // Changed endpoint to match your API
                   JSON.stringify({username:auth.user}), // No need for JSON.stringify - axios does this automatically
                    {   
                        headers: { 
                            'Content-Type': 'application/json',
                            // Add authorization header if needed
                            // 'Authorization': `Bearer ${yourToken}`
                        },
                        withCredentials: true,
                        signal: controller.signal // Added abort signal
                    }
                );
    
                
                console.log(response.data);
                isMounted && setUsers(response.data.attend);
               
                   
            } catch (err) {
                console.error("Fetch error:", err);
                
                
            }
        }
       
        getUsers();
    
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []); 

  return (
    <>
     <body class="bg-gray-50 min-h-screen flex">
        <Header/>
    
    <div class="flex-1 ml-4 md:ml-64">
     <UpperNav/>

      <main class="p-4 px-4 sm:px-6 lg:px-8">
        <div class="container mx-auto p-4">
          <div
            class="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"
          >

            <div
              class="bg-gradient-to-r from-[#00224b] to-[#004080] text-white p-6 text-white flex items-center space-x-4"
            >
              <img
                src="/img/banner.png"
                alt="User Avatar"
                class="w-16 h-16 rounded-full"
              />

              <h1 class="text-2xl font-bold">Your Attendance</h1>
            </div>

            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >Totalabsent</label
                  >
                  <p class="text-gray-900 font-medium">{users?.totalAbsent}</p>
                </div>

                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >Total Late </label
                  >
                  <p class="text-gray-900 font-medium">{users?.totalLate}</p>
                </div>

                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >Total Fullday</label
                  >
                  <p class="text-gray-900 font-medium">{users?.totalFullday}</p>
                </div>

                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >Total WeekEnd</label
                  >
                  <p class="text-gray-900 font-medium">{users?.weekEnd }</p>
                </div>

                



                
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </body>
    </>
  )
}

export default MyAttendance