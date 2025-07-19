import React from 'react'
import Header from '../Header'
import "../App.css"
import { useNavigate, Link,useLocation  } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import { useState , useEffect } from "react";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import UpperNav from '../UpperNav';
const Userprofile = () => {
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
                const response = await axiosPrivate.post('/users/getuser', // Changed endpoint to match your API
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
    
                
                console.log(response.data.user);
                isMounted && setUsers(response.data.user);
               
                    const backendDateString = users?.dob ;
                
                const dateObject = new Date(backendDateString);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                formattedDate (new Intl.DateTimeFormat('en-US', options).format(dateObject)); 
               
                // e.g., "July 19, 2024, 05:35 PM" // e.g., "7/19/2024"
                 // Changed to response.data.users
                 console.log(users.age)
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

              <h1 class="text-2xl font-bold">Your Profile</h1>
            </div>

            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >Company Name</label
                  >
                  <p class="text-gray-900 font-medium">{users?.c_Name?.c_Name}</p>
                </div>

                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >Username</label
                  >
                  <p class="text-gray-900 font-medium">{users?.username}</p>
                </div>

                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >First Name</label
                  >
                  <p class="text-gray-900 font-medium">{users?.firstName}</p>
                </div>

                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >Last Name</label
                  >
                  <p class="text-gray-900 font-medium">{users?.lastName || users?.lastname }</p>
                </div>

                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >Roles</label
                  >
                  <div class="flex flex-wrap gap-2">
                    {users?.roles?.map(role => (
                    <>
                    <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded'>
                        {role}
                    </span>
                    </>
                     
                    ))}
                   
                    
                  </div>
                </div>

                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >Availability Status</label
                  >
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                  >
                    {users?.active ? "Active":"InActive"}
                  </span>
                </div>

                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >Age</label
                  >
                  <p class="text-gray-900 font-medium">{users?.age =="NaN" ? "noAge" : users?.age   }</p>
                </div>

                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-500"
                    >Date of Birth</label
                  >
                  <p class="text-gray-900 font-medium">{users?.dob == undefined ? 'nodate' :date}</p>
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

export default Userprofile