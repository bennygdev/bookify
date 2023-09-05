import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import mosaicRegister from '../../assets/images/mosaicRegister.png';
import eyeOpen from '../../assets/images/eye-open.png';
import eyeClose from '../../assets/images/eye-close.png';

function Register() {
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
        const email = document.getElementById("email").value;

        if(password.length < 8) {
            setErrorMessage("Password must be 8 characters or more!");
            setIsErrorVisible(true);
            return;
        }

        const registerData = {
            username: username,
            email: email,
            password: password
        };

        try {
            const response = await fetch("https://localhost/api/Authenticate/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerData)
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("Registration successful:", responseData);
                window.location.href = "/login";
            } else {
                const errorData = await response.json();
                setErrorMessage(`${errorData.message}`);
                setIsErrorVisible(true);
                console.log("Registration failed:", errorData);
            }
        } catch (error) {
            console.log("An error occured:", error);
        }
    };

  return (
    <>
        <div className={`${styles.register__container} container mt-5`}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="row">
                            <div className="col-md-6">
                                <img className="loginimage img-fluid" src={mosaicRegister} alt="" />    
                            </div>
                            <div className="col-md-6 p-5">
                                <h1>Register</h1>
                                <div className="errorMessage">{isErrorVisible && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {errorMessage}
                                    <button type="button" className="btn-close" onClick={handleCloseError}></button>
                                    </div>
                                )}
                                </div>
                                <form onSubmit={handleSubmit} id="registerForm" action="post">
                                    <div className="form-group">
                                        <label htmlFor="username" className={`${styles.username} mb-2`}>Username</label>
                                        <input type="text" className="form-control mb-2" id="username" name="username" placeholder="e.g. Mary, Mark" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email" className={`${styles.email} mb-2`}>Email</label>
                                        <input type="email" className="form-control mb-2" id="email" name="email" placeholder="e.g. user@example.com" required />
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
                                    <p>Already a user? <Link to="/login">Login</Link></p>
                                    <p>Register as an admin? <Link to="/registeradmin">Register</Link></p>
                                    <button type="submit" className={styles.register__btn}>Register</button>
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

export default Register