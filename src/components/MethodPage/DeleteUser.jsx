import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styles from './DeleteUser.module.css';

function DeleteUser() {
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if(!token) {
          window.location.href = "/login";
        }
        else if (role != "admin") {
          window.location.href ="/controlpanel";
        }
    }, []);

    const handleCloseError = () => {
        setIsErrorVisible(false);
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");

        e.preventDefault();

        const username = document.getElementById("username").value;

        try {
            const response = await fetch(`https://localhost/api/Bookings/DeleteUser/${username}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if(response.ok) {
            const deletedData = await response.json();
            setSuccessMsg(deletedData);
        } else {
            const errorText = await response.json();
            setErrorMessage(`${errorText.detail}`);
            setIsErrorVisible(true);
            console.log("Failed to delete user.");
        }
        } catch (error) {
            console.log("An error occured:", error);
        }
    }

  return (
    <>
        <div className="container mt-5">
        <h1>Delete user</h1>
        <div className="errorMessage">
        {isErrorVisible && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {errorMessage}
              <button type="button" className="btn-close" onClick={handleCloseError}></button>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} id="deleteUserForm">
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" required />
            </div>
            <button type="submit" id="deleteBookingBtn" className={`${styles.deleteUserBtn} mt-3 mb-3`}>Delete User</button>
        </form>
        <div className="responseDiv"></div>
        <Link to="/controlpanel">
          <button id="backBtn" className={`${styles.backBtn} mb-3`}>Back</button> 
        </Link>
        <div className="mt-4" id="deletedUser">
        {successMsg && (
            <div className="alert alert-danger mt-3">
              <h4 className="alert-heading">User Deleted Successfully</h4>
              <p>Message: {successMsg.message}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default DeleteUser