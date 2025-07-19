import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const Company_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/company';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate()
    const[email,set_email]=useState('')
    const [c_Name, set_Cname] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    useEffect(() => {
        setValidName(Company_REGEX.test(c_Name));
    }, [c_Name])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [c_Name, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = Company_REGEX.test(c_Name);
        const v2 = PWD_REGEX.test(pwd);
        // if (!v1 || !v2) {
        //     setErrMsg("Enter more powerful password");
        //     return;
        // }
        try {
            // c_Name,password,email
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ c_Name:c_Name,email:email, password:pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                
            );
            navigate('/home')

            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            set_Cname('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            // errRef.current.focus();
        }
    }

    return (
        <>
        <body class="bg-gray-50 min-h-screen flex flex-col">
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

    <main class="flex-grow flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="bg-white shadow-md rounded-lg px-8 pt-8 pb-8 mb-4">
          <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
            Create Company
          </h2>
            <h4 className=' text-red-600 font-bold mb-2 rounded flex justify-start w-fit'>{errMsg}</h4>
        <form onSubmit={handleSubmit}>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="user"
            >
              Company Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
              id="company"
              type="text"
              placeholder="Your Company Name"
               value={c_Name}
                            onChange={(e)=>set_Cname(e.target.value)}
                            aria-invalid={validName ? 'false':'true'}
                            onFocus={()=>setUserFocus(true)}
                            onBlur={()=>setUserFocus(false)}


            />
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
              id="email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e)=>set_email(e.target.value)}
            />
          </div>

          <div class="mb-4 relative">
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
              placeholder="Create a password"
             ref={userRef} autoComplete='off'  required 
                            value={pwd}
                            onChange={(e)=>setPwd(e.target.value)}
                            aria-invalid={validPwd ? 'false':'true'}
                            onFocus={()=>setPwdFocus(true)}
                            onBlur={()=>setPwdFocus(false)}

                            aria-describedby="emailHelp"
            />
             <span class="password-icon">
            </span>
          </div>

          <div class="mb-6 relative">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="confirm-password"
            >
                Confirm Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500"
              id="confirm_pwd"
              type="password"
              placeholder="Confirm your password"
              onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}

            />
             <span class="password-icon">
              
            </span>
          </div>

          <div class="flex items-center mb-6">
            <input
              id="terms"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-700">
              I agree to the
              <a href="#" class="text-indigo-600 hover:text-indigo-800"
                >Terms and Conditions</a
              >
            </label>
          </div>

          <div class="mb-6">
            <a href="dashboard.html">
              <button
                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
                type="submit"
              >
                Sign Up
              </button>
            </a>
          </div>
          </form>

          <div class="text-center">
            <p class="text-sm text-gray-600">
              Already have an account?
              <Link
                to={'/login'}
                class="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Sign in
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
    )
}

export default Register
