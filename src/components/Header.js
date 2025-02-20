import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthContext from '../context/AuthProvider';
import useLogout from '../hooks/useLogout';
import useToggle from '../hooks/useToggle';
const Header = () => {
    const { auth } = useAuth(AuthContext);
    // const [name, setName] = useState('');
    const[admin , setAdmin] = useState(()=>{
        return localStorage.getItem('role')||''
    })
    const [name, setName] = useState(() => {
        // Initialize state from local storage if available
        return localStorage.getItem('name') || '';
    });
    const[presist,setpresist] = useToggle('persist',true)  
    const logout = useLogout()
    const signOut = () =>{
        localStorage.setItem('persist', !presist);
        localStorage.removeItem('role')
        localStorage.removeItem('name')
        
        logout()
    }
    useEffect(() => {
        // Set the name based on the auth context only once
        if (auth.user) {
            
           
            localStorage.setItem('name', auth.user); 
            localStorage.setItem('role', auth.roles); 
        }
    }, [auth.user]); 

    // Check if the user has the Admin role

    return (
        <div className="container">
            <header className="d-flex justify-content-center py-3">
                <ul className="nav nav-pills">
                <>
                {admin == 'Admin' ? (
                    <>


                            <li className="nav-item">
                                <Link to={'/'} className="nav-link">{name ? `${name}` : "login"}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/'} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/Admin'} className="nav-link">Admin</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/login'} onClick={signOut}  className="nav-link">logout</Link>
                            </li>
                    </>
                ):(
                    <>
                    <li className='nav-link'>hi</li>
                    <li className="nav-item">
                                <Link to={'/'} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/login'} onClick={signOut} onChange={presist} className="nav-link">logout</Link>
                            </li>
                    
                    </>
                )}
                
                        </>
                </ul>
            </header>
        </div>
    );
};

export default Header;