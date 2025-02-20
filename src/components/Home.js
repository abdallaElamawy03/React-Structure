import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Header from "./Header";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Home = () => {
  
    
    
    const navigate = useNavigate();
    const logout = useLogout();
    
    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    return (
        <section>
          <Header/>
          <div class="container px-4 py-5" id="featured-3">
    <h2 class="pb-2 border-bottom">Home Page</h2>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
        </div>
        <h3 class="fs-2 text-body-emphasis">Admin</h3>
        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
        <Link className="btn btn-primary" to={'/admin'}>admin</Link>
      </div>
      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
          
        </div>
        <h3 class="fs-2 text-body-emphasis">Featured title</h3>
        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
        <a href="#" class="icon-link">
          Call to action
        </a>
      </div>
      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
        </div>
        <h3 class="fs-2 text-body-emphasis">Featured title</h3>
        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
        <a href="#" class="icon-link">
          Call to action
        </a>
      </div>
    </div>
  </div>
        </section>
    )
}

export default Home
