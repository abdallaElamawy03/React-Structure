import { useNavigate, Link,useLocation  } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Header from "./Header";
import useAuth from "../hooks/useAuth";
import { useState , useEffect } from "react";
import "./App.css"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import UpperNav from "./UpperNav";

const Home = () => {
    const [users, setUsers] = useState();
    const [tasks, setTasks] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();
    const logout = useLogout();

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

            if (!response.data?.users) {
                throw new Error('No users data received');
            }

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
    const gettasks = async () => {
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

            if (!response.data) {
                throw new Error('No users data received');
            }

            console.log(response.data.result);
            isMounted && setTasks(response.data.result); // Changed to response.data.users
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

      gettasks()
      getUsers();
    }

    return () => {
        isMounted = false;
        controller.abort();
    }
}, []); 



    
    

    
    const signOut = async () => {
        await logout();
        navigate('/login');
    };
    
    


    return (
      <>

        <body class="bg-gray-50 min-h-screen flex">
      {auth.roles=='manager' || auth.roles == 'hr' || auth.roles == 'company' ? (
        <>
         <Header/>

    <div class="flex-1 ml-4 md:ml-64">
    <UpperNav/>

      <main class="p-4 px-4 sm:px-6 lg:px-8">
        <div
          class="bg-gradient-to-r from-[#00224b] to-[#004080] text-white rounded-xl p-6 mb-6"
        >
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h2 class="text-2xl font-bold mb-2">Welcome back, {auth?.user}</h2>
              <p class="opacity-90"> Hr Management System</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div
            class="dashboard-card bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Total Employees</p>
                <h3 class="text-2xl font-bold mt-1">{users?.length}</h3>
              </div>
              <div
                class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"
              >
                <i class="fas fa-users text-xl"></i>
              </div>
            </div>
            <div class="mt-4 flex items-center text-sm text-green-600">
              <i class="fas fa-arrow-up mr-1"></i>
            </div>
          </div>

          <div
            class="dashboard-card bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Requests</p>
                <h3 class="text-2xl font-bold mt-1">0</h3>
              </div>
              <div
                class="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-red-600"
              >
                <i class="fa-solid fa-arrow-right-from-bracket text-xl"></i>
              </div>
            </div>
          </div>

          <div
            class="dashboard-card bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Active Tasks</p>
                <h3 class="text-2xl font-bold mt-1">{tasks?.length}</h3>
              </div>
              <div
                class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"
              >
                <i class="fa-solid fa-bars-progress text-xl"></i>
              </div>
            </div>
            <div class="mt-4 flex items-center text-sm text-gray-500"></div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div
            class="lg:col-span-2 rounded-xl shadow-sm border border-gray-100"
          >
            <div class="relative overflow-x-auto shadow-md rounded-b-lg">
              <table
                class="w-full text-sm text-left rtl:text-right text-gray-500"
              >
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3">Employee ID</th>
                    <th scope="col" class="px-6 py-3">Arrival Time</th>
                    <th scope="col" class="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    users?.map(user=>(
                      <>
                      <tr
                    class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {user.username}
                    </th>
                    <td class="px-6 py-4"></td>
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div
                          class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"
                        ></div>
                        {user?.active?"Active":'InActive'}
                      </div>
                    </td>
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
                  </tr> */}

                 
                </tbody>
              </table>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 class="text-lg font-semibold mb-6">Quick Actions</h2>

            <div class="grid grid-cols-1 gap-4">
              <a
                href="add-employees.html"
                class="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50"
              >
                <div
                  class="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2"
                >
                  <i class="fas fa-user-plus"></i>
                </div>
                <span class="text-sm font-medium">Add Employee</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
        </>
      ):(
        <>
        <Header/>
        

    <div class="flex-1 ml-4 md:ml-64">
      <UpperNav/>
      <main class="p-4 px-4 sm:px-6 lg:px-8">
        <div
          class="bg-gradient-to-r from-[#00224b] to-[#004080] text-white rounded-xl p-6 mb-6"
        >
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h2 class="text-2xl font-bold mb-2">Welcome back, {auth?.user}</h2>
              
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
         

        

          <div
            class="dashboard-card bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">Active Tasks</p>
                <h3 class="text-2xl font-bold mt-1">12</h3>
              </div>
              <div
                class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"
              >
                <i class="fa-solid fa-bars-progress text-xl"></i>
              </div>
            </div>
            <div class="mt-4 flex items-center text-sm text-gray-500"></div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 class="text-lg font-semibold mb-6">Quick Actions</h2>

          </div>
        </div>
      </main>
    </div>
        
        </>
      )}
    
    </body>
      </>
    )
}
export default Home
