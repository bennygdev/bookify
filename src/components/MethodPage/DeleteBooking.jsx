import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './DeleteBooking.module.css';

function DeleteBooking() {
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      window.location.href = "/login";
    }
  }, []);

  const handleCloseError = () => {
    setIsErrorVisible(false);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");

    e.preventDefault();

    const bookingId = document.getElementById("bookingId").value;

    try {
      const response = await fetch(`https://localhost/api/Bookings/Delete/?id=${bookingId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

      if (response.ok) {
        const deletedData = await response.json();
        setSuccessMsg(deletedData);
      } else {
        const errorText = await response.json();
        setErrorMessage(`${errorText.detail}`);
        setIsErrorVisible(true);
        console.log("Failed to delete booking.");
      }
    } catch (error) {
      console.log("An error occured:", error);
    }

  }

  const formatDate = (dateString) => {
    const [month, day, year] = new Date(dateString).toLocaleDateString('en-US').split('/');
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <div className="container mt-5">
        <h1>Delete booking</h1>
        <div className="errorMessage">
        {isErrorVisible && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {errorMessage}
              <button type="button" className="btn-close" onClick={handleCloseError}></button>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} id="deleteBookingForm">
            <div className="form-group">
                <label htmlFor="bookingId">Booking ID</label>
                <input type="number" className="form-control" id="bookingId" required />
            </div>
            <button type="submit" id="deleteBookingBtn" className={`${styles.deleteBookingBtn} mt-3 mb-3`}>Delete Booking</button>
        </form>
        <div className="responseDiv"></div>
        <Link to="/controlpanel">
          <button id="backBtn" className={`${styles.backBtn} mb-3`}>Back</button> 
        </Link>
        <div className="mt-4" id="deletedBooking">
        {successMsg && (
            <div className="alert alert-danger mt-3">
              <h4 className="alert-heading">Booking Deleted Successfully</h4>
              <p>Booking ID: {successMsg.bookingID}</p>
              <p>Facility Description: {successMsg.facilityDescription}</p>
              <p>Booking Date From: {formatDate(successMsg.bookingDateFrom)}</p>
              <p>Booking Date To: {formatDate(successMsg.bookingDateTo)}</p>
              <p>Booked By: {successMsg.bookedBy}</p>
              <p>Booking Status: {successMsg.bookingStatus}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default DeleteBooking