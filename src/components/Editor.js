import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const Editor = () => {
     const [username, setUsername] = useState('');
    
        useEffect(() => {
            // Retrieve the username from local storage
            const storedUsername = localStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
            }
        }, []);
    return (
        <section>
            <h1>Editors Page</h1>
            <br />
            <p>heelo{username} You must have been assigned an Editor role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Editor
