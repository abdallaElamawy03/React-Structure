import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation ,Link} from "react-router-dom";
import Header from "../Header";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

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
