import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CreateBooking.module.css';

function CreateBooking() {
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      window.location.href = "/login";
    }
  }, []);

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");

    e.preventDefault();

    const facilityDescription = document.getElementById("facilityDescription").value;
    const bookingDateFrom = document.getElementById("bookingDateFrom").value;
    const bookingDateTo = document.getElementById("bookingDateTo").value;

    const bookingData = {
      facilityDescription: facilityDescription,
      bookingDateFrom: bookingDateFrom,
      bookingDateTo: bookingDateTo
    };

    try {
      const response = await fetch("https://localhost/api/Bookings/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(bookingData)
        });

      if (response.ok) {
        const createdBooking = await response.json();
        setSuccessMsg(createdBooking);
      } else {
        console.log("Failed to create booking.");
      }
    } catch (error) {
      console.log("An error occured: ", error);
    }
  }

  const formatDate = (dateString) => {
    const [month, day, year] = new Date(dateString).toLocaleDateString('en-US').split('/');
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <div className="container mt-5">
        <h1>Create a New Booking</h1>
        <form onSubmit={handleSubmit} id="bookingForm">
            <div className="form-group">
                <label htmlFor="facilityDescription">Facility Description</label>
                <input type="text" className="form-control" id="facilityDescription" required />
            </div>
            <div className="form-group">
                <label htmlFor="bookingDateFrom">Booking Date From</label>
                <input type="date" className="form-control" id="bookingDateFrom" required />
            </div>
            <div className="form-group">
                <label htmlFor="bookingDateTo">Booking Date To</label>
                <input type="date" className="form-control" id="bookingDateTo" required />
            </div>
            <button type="submit" id="createBookingBtn" className={`${styles.createBookingBtn} mt-3 mb-3`}>Create Booking</button>
        </form>
        <Link to="/controlpanel">
          <button id="backBtn" className={`${styles.backBtn} mb-3`}>Back</button>
        </Link>
        <div className="mt-4" id="createdBooking">
          {successMsg && (
            <div className="alert alert-success mt-3">
              <h4 className="alert-heading">Booking Created Successfully</h4>
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

export default CreateBooking