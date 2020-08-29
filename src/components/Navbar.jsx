import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="navbar navbar-dark navbar-expand-sm">
            <Link  className="navbar-brand" to="/">The Movie Search</Link>
            <ul className="navbar-nav ml-auto">                
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/search" className="nav-link">Search</Link>
                </li>
            </ul>
        </nav>
    );
}
 
export default Navbar;