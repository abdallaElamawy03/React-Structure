import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation ,Link} from "react-router-dom";
import Header from "../Header";
import useAuth from "../../hooks/useAuth";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();

   useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const company = auth.company; // Optional chaining in case auth is undefined

    // Early return if company name is not available
    if (!company) {
        console.error("Company name is required");
    }else{
        console.log(company)
    }

    const getUsers = async () => {
        try {
            const response = await axiosPrivate.post('/company/users', // Changed endpoint to match your API
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

            if (!response.data?.users) {
                throw new Error('No users data received');
            }

            console.log(response.data);
            isMounted && setUsers(response.data.users); // Changed to response.data.users
        } catch (err) {
            console.error("Fetch error:", err);
            
            // Different handling for cancellation vs other errors
            if (err.name !== 'AbortError' && err.name !== 'CanceledError') {
                navigate('/', { 
                    state: { from: location }, 
                    replace: true 
                });
            }
        }
    }

    getUsers();

    return () => {
        isMounted = false;
        controller.abort();
    }
}, []); 

    return (
        <article>
            <Header/>
          <div className="container px-4 py-5" id="featured-3">
    <h2 className="pb-2 border-bottom bg-dark text-light">Admin Page</h2>
   
        <div className="feature col">
            {users?.length ? (
                <div className="table-responsive"> 
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">User </th>
                                <th scope="col">Role</th>
                                <th scope="col">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{user.username}</td>
                                    <td>{user.roles.join(', ')}</td> {/* Assuming roles is an array */}
                                    <td>
                                        <Link to={`/edit/${user._id}`} className='btn btn-sm btn-secondary' >Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No users to display</p>
            )}
        </div>
    
</div>
        </article>
    );
};

export default Users;
