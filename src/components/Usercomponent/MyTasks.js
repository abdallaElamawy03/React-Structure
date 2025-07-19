import React from 'react'
import Header from '../Header'
import "../App.css"
import { useNavigate, Link,useLocation  } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import { useState , useEffect } from "react";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import UpperNav from '../UpperNav';
const MyTasks = () => {
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
                const response = await axiosPrivate.post('/task/user', // Changed endpoint to match your API
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
    
                
                console.log(response.data.task);
                isMounted && setUsers(response.data.task);
               
                   
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
        <div
          class="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div
            class="bg-gradient-to-r from-[#00224b] to-[#004080] text-white p-6 text-white"
          >
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-2xl font-bold">my Tasks </h2>
              </div>
            </div>
          </div>

          <div class="p-4 border-b border-gray-200 bg-gray-50">
            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div class="relative flex-1">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  class="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                ></div>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>

                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Due-Date
                  </th>

                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              {
                users?.map((user)=>(
                    <>
                 {user?.task?.map((task)=>(
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr key={user._id} class="hover:bg-gray-50">
                            <>
                           
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div
                        class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center"
                      >
                        <i class="fas fa-file"></i>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {task?.title}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-blue-800"
                      >{task?.description}</span
                    >
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                      >{task?.dueDate.slice(0,10)}</span
                    >
                  </td>
                   <td class="px-6 py-4 whitespace-nowrap">
                    {
                        task?.status == 'inprogress' ?(
                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-500 text-white'>{task?.status}</span>
                        ):(
                            task?.status == 'completed' ? (
                                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white'>{task?.status}</span>
                            ):(
                                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-white'>{task?.status}</span>
                            )
                        )
                        
                    }
                    {/* <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-white"
                      >{
                        task.status
                      }</span
                    > */}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <button class="text-indigo-600 hover:text-indigo-900 mr-3">
                      Edit
                    </button>
                    <a href="#" class="text-gray-600 hover:text-gray-900">
                      View
                    </a>
                  </td>
                 </>
                </tr>



               
              </tbody> 
                          ))}
                    
                    </>
                ))
              }
            
            </table>
          </div>

        </div>
      </main>
    </div>
  </body>
    </>
  )
}

export default MyTasks