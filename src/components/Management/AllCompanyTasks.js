import React, { useEffect, useState } from 'react'
import Header from '../Header'
import UpperNav from '../UpperNav'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AllCompanyTasks = () => {
     const [users, setUsers] = useState();
        const axiosPrivate = useAxiosPrivate();
        const navigate = useNavigate();
        const location = useLocation();
        const { auth } = useAuth();
        const [company,setCompanyname]=useState('')

         
    
      // Filter users based on search term
      
    
       useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const company = auth.c_Name || auth.company; // Optional chaining in case auth is undefined
    
        // Early return if company name is not available
        if (!company) {
            console.error("Company name is required");
        }else{
            console.log(company)
            setCompanyname(company)
        }
    
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.post('/task/company', // Changed endpoint to match your API
                   JSON.stringify({c_Name:company}), // No need for JSON.stringify - axios does this automatically
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
                isMounted && setUsers(response.data.result); // Changed to response.data.users
            } catch (err) {
                console.error("Fetch error:", err);
                
                // Different handling for cancellation vs other errors
                if (err.name !== 'AbortError' && err.name !== 'CanceledError') {
                    navigate('/home', { 
                        state: { from: location }, 
                        replace: true 
                    });
                }
            }
        }
        
        if(auth.roles == 'hr' || auth.roles=='manager' || auth.roles=='company'){
    
            
          getUsers();
        }
    
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
                <h2 class="text-2xl font-bold">Company Tasks Management</h2>
                <p class="text-indigo-100">{company}</p>
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
                    User
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total-Completed
                  </th>

                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total-Inprogress
                  </th>

                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total-Late
                  </th>
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
                    <tbody class="bg-white divide-y divide-gray-200">
                <tr key={user.userid} class="hover:bg-gray-50">
                
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div
                        class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center"
                      >
                        <i class="fas fa-user"></i>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {user.username}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-blue-800"
                      >{user.totalCompleted}</span
                    >
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                      >{user.totalInprogress}</span
                    >
                  </td>
                   <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-white"
                      >{user.totalLate}</span
                    >
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
                </tr>



               
              </tbody> 
                    
                    </>
                ))
              }
              {/* <tbody class="bg-white divide-y divide-gray-200">
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div
                        class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center"
                      >
                        <i class="fas fa-file"></i>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          msh 3aref
                        </div>
                        <div class="text-sm text-gray-500">msh 3aref</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div
                        class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center"
                      >
                        <i class="fas fa-user"></i>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          amawy
                        </div>
                        <div class="text-sm text-gray-500">chairman</div>
                      </div>
                    </div>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Jul 25, 2023
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                      >In Progress</span
                    >
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
                </tr>



               
              </tbody> */}
            </table>
          </div>

        </div>
      </main>
    </div>
  </body>
   </>
  )
}

export default AllCompanyTasks