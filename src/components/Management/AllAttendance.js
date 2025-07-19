import React, { useEffect, useState } from 'react'
import Header from '../Header'
import UpperNav from '../UpperNav'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AllAttendance = () => {
     const [users, setUsers] = useState();
        const axiosPrivate = useAxiosPrivate();
        const navigate = useNavigate();
        const location = useLocation();
        const { auth } = useAuth();
         
    
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
        }
    
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.post('attend/company', // Changed endpoint to match your API
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
          class="bg-gradient-to-r from-[#00224b] to-[#004080] text-white rounded-xl pt-4 mb-6"
        >
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold ml-3">Today Attendance</h2>
          </div>
          <div class="relative overflow-x-auto shadow-md rounded-b-lg">
            <table
              class="w-full text-sm text-left rtl:text-right text-gray-500"
            >
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3">Employee </th>
                  <th scope="col" class="px-6 py-3">Total absents</th>
                  <th scope="col" class="px-6 py-3">Total fulldays</th>
                  <th scope="col" class="px-6 py-3">Total halfdays</th>
                  <th scope="col" class="px-6 py-3">Total late</th>
                  <th scope="col" class="px-6 py-3">Total weekends</th>
                  
                </tr>
              </thead>
              <tbody>
                {
                    users?.map((user)=>(
                        <>
                        <tr key={user?.id}
                  class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {user?.username}
                  </th>
                <td class="px-6 py-4">{user?.Totalabsent}</td>
                <td class="px-6 py-4">{user?.Totalfulldays}</td>
                <td class="px-6 py-4">{user?.Totalhalfdays}</td>
                <td class="px-6 py-4">{user?.Totallate}</td>
                <td class="px-6 py-4">{user?.Totalweekends}</td>

                
                </tr>

              

                        </>
                    ))
                }
                {/* <tr
                  class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Human#123
                  </th>
                  <td class="px-6 py-4">02:00pm</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div
                        class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"
                      ></div>
                      Online
                    </div>
                  </td>
                  <td class="px-6 py-4">02:00pm</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div
                        class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"
                      ></div>
                      Online
                    </div>
                  </td>
                </tr>

              

               */}

                
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

export default AllAttendance