import React, { useEffect, useState } from 'react'
import UpperNav from '../UpperNav'
import Header from '../Header'
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

const GetAllEmployee = () => {
     const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();
     const [searchTerm, setSearchTerm] = useState('');

  // Filter users based on search term
  const filteredUsers = users?.filter(user =>
    user?.username?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

   useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const company = auth.c_Name || auth.company; // Optional chaining in case auth is undefined

    // Early return if company name is not available
    if (!company) {
        console.error("Company name is required");
    }else{
        console.log(company)
    }

    const getUsers = async () => {
        try {
            const response = await axiosPrivate.post('/company/users', // Changed endpoint to match your API
               JSON.stringify({c_Name:company,username:auth.user}), // No need for JSON.stringify - axios does this automatically
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
            isMounted && setUsers(response.data.users); // Changed to response.data.users
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
          class="bg-gradient-to-r from-[#00224b] to-[#004080] text-white rounded-xl pt-4 mb-6"
        >
          <div
            class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4"
          >
            <h2 class="text-2xl font-semibold ml-3">Employees</h2>

            <label for="table-search" class="sr-only">Search</label>
            <div class="relative">
              <div
                class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
              ></div>
              <input
                type="text"
                id="table-search-users"
                placeholder="Search by username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                class="block p-2 ps-5 mr-3 text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                
              />
            </div>
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-b-lg">
            <table
              class="w-full text-sm text-left rtl:text-right text-gray-500"
            >
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3">Employee ID</th>
                  <th scope="col" class="px-6 py-3">status</th>
                  <th scope="col" class="px-6 py-3">role</th>
                  <th scope="col" class="px-6 py-3">Action Buttons</th>
                </tr>
              </thead>
                <tbody>
            {filteredUsers?.length > 0 ? (
              filteredUsers?.map((user) => (
                <tr
                  key={user.id}
                  className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {user.username}
                  </th>
                  <td className="px-6 py-4">
                    {user.active ? "active" : "inactive"}
                  </td>
                  <td className="px-6 py-4">{user.roles}</td>
                  <td className="px-6 py-4">
                    <a
                      href="../admin/add-task.html"
                      className="font-medium text-blue-600 hover:underline mr-2"
                    >
                      Add task
                    </a>
                    <a
                      href="#"
                      className="font-medium text-gray-600 hover:underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-white">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </body>
    </>
  )
}

export default GetAllEmployee