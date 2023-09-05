import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
    useEffect(() => {
        const token = localStorage.getItem("token");

        const controlPanelNavItem = document.getElementById("controlPanelNavItem");
        const loginNavItem = document.getElementById("loginNavItem");
        const registerNavItem = document.getElementById("registerNavItem");
        const logoutNavItem = document.getElementById("logoutNavItem");

        if (token) {
            // User is logged in
            controlPanelNavItem.style.display = "block";
            logoutNavItem.style.display = "block";
            loginNavItem.style.display = "none";
            registerNavItem.style.display = "none";
        } else {
            // User is logged out
            controlPanelNavItem.style.display = "none";
            logoutNavItem.style.display = "none";
            loginNavItem.style.display = "block";
            registerNavItem.style.display = "block";
        }
    }, []); 

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        window.location.href = "/";
    }

  return (
    <header>
        <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
            <Link to="/" className={`navbar-brand ${styles.bookifyText}`}>
                Bookify
            </Link>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">
                            About
                        </Link>
                    </li>
                    <li className="nav-item" id="controlPanelNavItem" >
                        <Link to="/controlpanel" className="nav-link">
                            Control Panel
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item" id="loginNavItem">
                        <Link to="/login">
                            <button className={styles.loginBtn}>Login</button>
                        </Link>
                    </li>
                    <li className="nav-item" id="registerNavItem">
                        <Link to="/register">
                            <button className={`ms-3 ${styles.registerBtn}`}>Register</button>
                        </Link>
                    </li>
                    <li className="nav-item" id="logoutNavItem">
                        <button onClick={logout} className={styles.logoutBtn}>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    </header>
  )
}

export default Navbar