import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';
import axios from '../api/axios';
import Header from './Header';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, resetUser , userAttribs] = useInput('user', '');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);
    const [username, setUsername] = useState(''); // State to hold the username

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(response.data);
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;

            // Set authentication state
            setAuth({ user, roles, accessToken });
            setUsername(user); // Set the username in state
            console.log("Username set:", user);
            resetUser ();
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
            errRef.current.focus();
        }
    };

    return (
        <>
            <Header /> {/* Pass the username as a prop */}
            <main className="flex-shrink-0 w-40">
                <div className="container py-1">
                    <h1 className="mt-5">Log in</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3" style={{ width: "40%" }}>
                        <h4 className='text-danger bg-dark '>{errMsg}</h4>
                            <label htmlFor="exampleInputuser" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" ref={userRef} autoComplete='off' {...userAttribs} required aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3" style={{ width: "40%" }}>
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="persist" onChange={toggleCheck} checked={check} />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Login;