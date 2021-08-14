import React from 'react';
import {Link} from 'react-router-dom';
import './../style/navbar.css';

const Navbar = (props) => {
    const{handleLogout, user} = props;

    return(    
        <nav className="navbar">
            <Link to={"/"} id="home"><h2>Passwords</h2></Link>
            <Link to={"/generatePassword"} query={{user:user, handleLogout: handleLogout}} id="generate"><h4>Generate Password</h4></Link>
            <button onClick={handleLogout} id="logOut">Logout</button>
        </nav>
    )
        
}

export default Navbar;
