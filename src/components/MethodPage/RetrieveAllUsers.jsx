import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './RetrieveAllUsers.module.css';

function RetrieveAllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // init page with 1
  const usersPerPage = 9;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      window.location.href = "/login";
    }
    else if (role != "admin") {
      window.location.href ="/controlpanel";
    }

    async function fetchBookings() {
      try {
        const response = await fetch("https://localhost/api/Bookings/GetAllMembers/All", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
          const userData = await response.json();
          setUsers(userData);
        } else {
          setErrorMessage("You do not have administrative rights to view this method.");
        }
      } catch (error) {
        console.log("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [])

  function getPageRange() {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    return { startIndex, endIndex };
  }

  return (
      <div className="container mt-5">
          <Link to="/controlpanel">
              <button id="backBtn" className={`${styles.backBtn} mt-3 mb-3`}>
                  Back
              </button>
          </Link>
          <h1 id="userMessage">All users</h1>
          <div className="errorMessage">
              {errorMessage && (
                  <div className="alert alert-danger show" role="alert">
                      {errorMessage}
                  </div>
              )}
          </div>
          <div className="errorMessage"></div>
          {loading && (
              <div id="loadingIndicator">
                  <div className="spinner"></div>
              </div>
          )}
          <div className="users mt-3">
              <div className={`${styles.grid}`}>
              {users
                .slice(getPageRange().startIndex, getPageRange().endIndex)
                .map((user, index) => {
                    return (
                        <div
                            key={index}
                            className={`${styles.user__container}`}
                        >
                            <p>
                                <strong>User ID: </strong>
                                {user.id}
                            </p>
                            <p>
                                <strong>Username: </strong>
                                {user.userName}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                {user.email}
                            </p>
                        </div>
                    );
                })}
              </div>
              <div className={styles.pagination}>
                  {Array.from({
                      length: Math.ceil(users.length / usersPerPage),
                  }).map((_, index) => (
                      <button
                          key={index}
                          onClick={() => setCurrentPage(index + 1)}
                          className={
                              currentPage === index + 1 ? styles.active : ""
                          }
                      >
                          {index + 1}
                      </button>
                  ))}
              </div>
          </div>
      </div>
  );
}

export default RetrieveAllUsers