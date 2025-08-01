import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user || auth?.c_Name ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;