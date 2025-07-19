import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        
        try{
            const response = await axios.get('auth/refresh', {
            withCredentials: true || await axios.get('auth/refresh',{
                withCredentials:true
            })
            
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data);
            return {
                ...prev,
                c_Name:response.data.company || response.data.c_Name,
                id:response.data.id,
                user:response.data.username,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;

        }catch(resposne){
            const response = await axios.get('auth/crefresh', {
            withCredentials: true 
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data);
            return {
                ...prev,
                c_Name:response.data.company || response.data.c_Name,
                id:response.data.id,
                user:response.data.username,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;

        }
        
        
    }
    return refresh;
};

export default useRefreshToken;
