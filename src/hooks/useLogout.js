import { useEffect } from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";
import useLocalStorage from "./useLocalStorage";
import useToggle from "./useToggle";

const useLogout = () => {
    const { setAuth } = useAuth();

    


    const logout = async () => {
        setAuth({});
        try {
            const response = await axios.post('auth/logout', {
                withCredentials: true
            });

            localStorage.setItem('persist',false)
            
            
            
           
            
            
            console.log(response)
            
            
        } catch (err) {
            console.error(err);
        }
    }
    

    return logout;
}

export default useLogout