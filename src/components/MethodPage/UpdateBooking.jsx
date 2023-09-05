import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './UpdateBooking.module.css';

function UpdateBooking() {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [bookId, setBookId] = useState({
    id: "???"
  });
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      window.location.href = "/login";
    }

    const role = localStorage.getItem("role");
    const bookingStatus = document.getElementById("bookingStatus");
    if(role != "admin") {
      bookingStatus.disabled = true;
    }
  }, []);

  useEffect(() => {
    toggleFormFields(false);
  }, []);

  const handleCloseSuccess = () => {
    setIsSuccessVisible(false);
    setSuccessMessage('');
  };

  const handleCloseError = () => {
    setIsErrorVisible(false);
    setErrorMessage('');
  };

  function toggleFormFields(enabled) {
    const updateBookingForm = document.getElementById("updateBookingForm");
    const updateBookingBtn = document.getElementById("updateBookingBtn");
    const formFields = updateBookingForm.querySelectorAll("input");
    formFields.forEach(field => {
        field.disabled = !enabled;
    });
    updateBookingBtn.disabled = !enabled;
  }

  const getHandleSubmit = async (e) => {
    const token = localStorage.getItem("token");

    e.preventDefault();

    const bookingId = document.getElementById("bookingId").value;
    setBookId({id: bookingId});

    try {
      const response = await fetch(`https://localhost/api/Bookings/GetById/${bookingId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

      if (response.ok) {
        const bookingData = await response.json();
        document.getElementById("facilityDescription").value = bookingData.FacilityDescription;
        document.getElementById("bookingDateFrom").value = bookingData.BookingDateFrom;
        document.getElementById("bookingDateTo").value = bookingData.BookingDateTo;
        document.getElementById("bookingStatus").value = bookingData.BookingStatus;

        setSuccessMessage(`Successfully fetched booking details for Booking ID ${bookingId}`);
        setIsSuccessVisible(true);
        toggleFormFields(true);
      } else {
        document.getElementById("facilityDescription").value = '';
        document.getElementById("bookingDateFrom").value = '';
        document.getElementById("bookingDateTo").value = '';
        document.getElementById("bookingStatus").value = '';

        toggleFormFields(false);

        const errorText = await response.json();
        setErrorMessage(`${errorText.detail}`);
        setIsErrorVisible(true);
      }
    } catch (error) {
      console.log("An error occured:", error);
    }
  }

  const updateHandleSubmit = async (e) => {
    const token = localStorage.getItem("token");

    e.preventDefault();

    const bookingId = document.getElementById("bookingId").value;
    const facilityDescription = document.getElementById("facilityDescription").value;
    const bookingDateFrom = document.getElementById("bookingDateFrom").value;
    const bookingDateTo = document.getElementById("bookingDateTo").value;
    const bookingStatus = document.getElementById("bookingStatus").value;

    const bookingData = {
      facilityDescription: facilityDescription,
      bookingDateFrom: bookingDateFrom,
      bookingDateTo: bookingDateTo,
      bookingStatus: bookingStatus
    };

    try {
      const response = await fetch(`https://localhost/api/Bookings/Put?id=${bookingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(bookingData)
        });

      if (response.ok) {
        setSuccessMessage(`Successfully updated booking details for Booking ID ${bookingId}`);
        setIsSuccessVisible(true);
        console.log("Booking updated successfully");
      } else {
        const errorText = await response.json();
        setErrorMessage(`${errorText.detail}`);
        setIsErrorVisible(true);
        console.log("Failed to update booking.");
      }
    } catch (error) {
      console.log("An error occured:", error);
    }
  }

  return (
    <>
      <div className="container mt-5">
        <h1>Update booking</h1>
        <p>Update your booking by entering your booking ID, then update your booking information from there. Users will not be allowed to change booking statuses while administrators can.</p>
        <div className="errorMessage">
          {isErrorVisible && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {errorMessage}
              <button type="button" className="btn-close" onClick={handleCloseError}></button>
            </div>
          )}
        </div>
        <div className="successMessage">
          {isSuccessVisible && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {successMessage}
              <button type="button" className="btn-close" onClick={handleCloseSuccess}></button>
            </div>
          )}
        </div>
        <form onSubmit={getHandleSubmit} id="getBookingForm">
            <div className="form-group">
                <label htmlFor="bookingId">Booking ID</label>
                <input type="number" className="form-control" id="bookingId" required />
            </div>
            <button type="submit" className={`${styles.getBookingBtn} mt-3 mb-3`} id="getBookingBtn">Get Booking Information</button>
        </form>
        <h5 className="mt-3 mb-3 bookingSelect">Updating booking for {bookId.id} ID</h5>
        <form onSubmit={updateHandleSubmit} id="updateBookingForm">
            <div className="form-group">
                <label htmlFor="facilityDescription">Facility Description</label>
                <input type="text" className="form-control" id="facilityDescription" required />
                <label htmlFor="bookingDateFrom">Booking Date From</label>
                <input type="date" className="form-control" id="bookingDateFrom" required />
                <label htmlFor="bookingDateTo">Booking Date To</label>
                <input type="date" className="form-control" id="bookingDateTo" required />
                <label htmlFor="bookingStatus">Booking Status</label>
                <input type="text" className="form-control" id="bookingStatus" required />
            </div>
            <button type="submit" id="updateBookingBtn" className={`${styles.updateBookingBtn} mt-3 mb-3`}>Update Booking</button>
        </form>
        <div className="responseDiv mb-3"></div>
        <Link to="/controlpanel">
          <button id="backBtn" className={`${styles.backBtn} mb-3`}>Back</button>
        </Link>
      </div>
    </>
  )
}

export default UpdateBooking