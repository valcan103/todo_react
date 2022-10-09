import React from "react";
import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav className="nav_container">
            <ul>
                <li>
                    <Link to="/">Clock</Link>
                </li>
                <li>
                    <Link to="/todos">To do</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
