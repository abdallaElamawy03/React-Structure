import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/users';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate()

    const [user, setUser] = useState('');
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

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username:user, password:pwd,roles:["Free"] }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                
            );
            navigate('/')

            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setUser('');
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
            errRef.current.focus();
        }
    }

    return (
        <>
         <Header /> {/* Pass the username as a prop */}
            <main className="flex-shrink-0 w-40">
                <div className="container py-1">
                    <h1 className="mt-5">Sign up</h1>
                    <p ref={errRef} className={errMsg ? 'errmsg':'offscreen'} aria-live="assertive">{errMsg}</p>
                    <form onSubmit={handleSubmit}>
                      
                        <div className="mb-3" style={{ width: "40%" }}>
                            <label htmlFor="exampleInputuser" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" ref={userRef} autoComplete='off'  required 
                            value={user}
                            onChange={(e)=>setUser(e.target.value)}
                            aria-invalid={validName ? 'false':'true'}
                            onFocus={()=>setUserFocus(true)}
                            onBlur={()=>setUserFocus(false)}

                            aria-describedby="emailHelp" />
                            
                        </div>
                        <div className="mb-3" style={{ width: "40%" }}>
                            <label htmlFor="exampleInputuser" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" ref={userRef} autoComplete='off'  required 
                            value={pwd}
                            onChange={(e)=>setPwd(e.target.value)}
                            aria-invalid={validPwd ? 'false':'true'}
                            onFocus={()=>setPwdFocus(true)}
                            onBlur={()=>setPwdFocus(false)}

                            aria-describedby="emailHelp" />

                        </div>
                        <div className="mb-3" style={{ width: "40%" }}>
                        <label htmlFor="confirm_pwd" className="form-label">
                            Confirm Password:
                          
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            className="form-control"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        </div>
                        <button className="btn btn-primary btn" disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <br/>
                    <hr/>
                    <span>Already registered ?</span>
                    <br/>
                    <Link className="btn btn-secondary btn-sm" to={'/login'}>Login</Link>

                    
                    

                    </div>
                    </main>

        
          
        </>
    )
}

export default Register
