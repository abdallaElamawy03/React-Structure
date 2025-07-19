import React from 'react'
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';

import axios from '../api/axios';

const LOGIN_URL = '/auth/clogin';

const Logincompany = () => {
 const { setAuth, persist, setPersist } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";

    const userRef = useRef();
 

    const [company, resetc_Name , c_Nameatt] = useInput('company', '');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [c_Name, setCompanyname] = useState(''); // State to hold the username



    useEffect(() => {
        setErrMsg('');
    }, [c_Name, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ c_Name: c_Name, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(response.data);
            const accessToken = response?.data?.accessToken;
           const roles = response?.data.roles
            const company =response?.data.company
            

            // Set authentication state
            setAuth({ c_Name, accessToken ,roles});
            setCompanyname(c_Name); // Set the username in state
            console.log("company set:",c_Name);
            resetc_Name ();
            setPwd('');
            navigate(from, { replace: true });

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            
        }
    };
      const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (
        <>
           <body class="bg-gray-50 min-h-screen flex flex-col">
    <header>
      <nav class="bg-white shadow-sm py-4 px-6">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <div class="text-xl font-bold text-indigo-600">CEO</div>

          <Link to={'/'}
            class="flex items-center text-gray-600 hover:text-indigo-600"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            <div>Home</div>
          </Link>
        </div>
      </nav>
    </header>

    <main class="flex-grow flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="bg-white shadow-md rounded-lg px-8 pt-8 pb-8 mb-4">
            <h4 className=' text-red-600 font-bold mb-2 rounded flex justify-start w-fit'>{errMsg}</h4>
          <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign In company
          </h2>
          <form onSubmit={handleSubmit}>


          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="company"
            >
              Company Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
              
              type="text"
              onChange={(e) => setCompanyname(e.target.value)} value={c_Name}
              placeholder="Enter company name"
            />
          </div>

          <div class="mb-6 relative">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
              >
              Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
              id="password"
              type="password"
              placeholder="Enter your password"
               onChange={(e) => setPwd(e.target.value)} value={pwd}
              />
          </div>

          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center">
              <input
              
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                id="persist" onChange={togglePersist} checked={persist}
                />
              <label for="remember" class="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div>
              <a href="#" class="text-sm text-indigo-600 hover:text-indigo-800">
                Forgot password ?
              </a>
            </div>
          </div>

          <div class="mb-6">
           
              <button type="submit"
                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
                
                >
                Sign In
              </button>
         
          </div>
              </form>

          <div class="text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?  
              <Link to={'/register'}
                
                class="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-white py-4 px-6 shadow-inner">
      <div class="max-w-7xl mx-auto text-center text-gray-500 text-sm">
        &copy; 2025
      </div>
    </footer>
  </body>
        </>
    );
};


export default Logincompany