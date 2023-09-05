import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import mosaicLogin from '../../assets/images/mosaiclogin.jpg';
import eyeOpen from '../../assets/images/eye-open.png';
import eyeClose from '../../assets/images/eye-close.png';

function Login() {
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            window.location.href = "/controlpanel";
        }
    }, [])

    const handleCloseError = () => {
        setIsErrorVisible(false);
        setErrorMessage('');
      };
    
    const handleTogglePassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const loginData = {
            username: username,
            password: password
        };

        try {
            const response = await fetch("https://localhost/api/Authenticate/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", username);
                const token = localStorage.getItem("token");
                const responseRole = await fetch("https://localhost/api/Bookings/GetRole/getrole", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                });
                if(responseRole.ok) {
                    const roledata = await responseRole.json();
                    localStorage.setItem("role", roledata.role)
                } else {
                    console.log('fail')
                }
                window.location.href = "/controlpanel";
                console.log("Token:", data.token);
                console.log("Token Expiration:", data.expiration);
            } else {
                setErrorMessage("Invalid username or password.");
                setIsErrorVisible(true);
                console.log("Login failed.");
            }
        } catch (error) {
            console.log("An error occurred:", error);
        }
    };

  return (
    <>
        <div className={`${styles.login__container} container mt-5`}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="row">
                            <div className="col-md-6">
                                <img className="img-fluid" src={mosaicLogin} alt="" />
                            </div>
                            <div className="col-md-6 p-5">
                                <h1>Login</h1>
                                <div className="errorMessage">{isErrorVisible && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {errorMessage}
                                    <button type="button" className="btn-close" onClick={handleCloseError}></button>
                                    </div>
                                )}
                                </div>
                                <form onSubmit={handleSubmit} id="loginForm" action="post">
                                    <div className="form-group">
                                        <label htmlFor="username" className={`${styles.username} mb-2`}>Username</label>
                                        <input type="text" className="form-control mb-2" id="username" name="username" placeholder="e.g Mary, Mark" 
                                        required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className={`${styles.password} mb-2`}>Password</label>
                                        <div className="input-group mb-2">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                                required
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text" onClick={handleTogglePassword}>
                                                    <img
                                                        src={showPassword ? eyeOpen : eyeClose} 
                                                        alt={showPassword ? "Hide" : "Show"}
                                                        style={{ cursor: 'pointer' }}
                                                        className={styles.passwordDisplay}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p>Not a user? <Link to="/register">Register</Link></p>
                                    <p>Register as an admin? <Link to="/registeradmin">Register</Link></p>
                                    <button type="submit" id="login__btn" className={styles.login__btn}>Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login