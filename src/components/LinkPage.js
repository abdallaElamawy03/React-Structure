import { Link } from "react-router-dom"
import Header from "./Header"

const LinkPage = () => {
    return (
        <section>
            <Header/>   
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <br />
           
        </section>
    )
}

export default LinkPage
