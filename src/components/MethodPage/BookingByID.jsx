import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './BookingByID.module.css';
import receive from '../../assets/images/receivegraphic.jpg';

function BookingByID() {
  const [booking, setBooking] = useState({
    BookingID: '-------',
    FacilityDescription: '-------',
    BookedBy: '-------',
    BookingDateFrom: '-------',
    BookingDateTo: '-------',
    BookingStatus: '-------'
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      window.location.href = "/login";
    }
  }, [])

  const handleCloseError = () => {
    setIsErrorVisible(false);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    
    e.preventDefault();

    const bookingId = document.getElementById("bookingId").value;

    try {
      const response = await fetch(`https://localhost/api/Bookings/GetById/${bookingId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if(response.ok) {
          const bookingData = await response.json();
          setBooking(bookingData);
        } else {
          setErrorMessage('Booking is not found or you did not book this booking.')
          setIsErrorVisible(true);
          console.log("Failed to retrieve booking");
        }
    } catch (error) {
      console.log("An error occured", error);
    }

  }
  
  function convertDateFormat(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <div className="container mt-5">
        <Link to="/controlpanel" className="mt-3 mb-3">
          <button className={`${styles.backBtn} mb-3`} id="backBtn">
            Back
          </button>
        </Link>
        <h1>Retrieve Booking by ID</h1>
        <div className="errorMessage">
        {isErrorVisible && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {errorMessage}
              <button type="button" className="btn-close" onClick={handleCloseError}></button>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} id="retrieveBookingForm">
          <div className="form-group">
            <label htmlFor="bookingId">Booking ID</label>
            <input
              type="number"
              className="form-control"
              id="bookingId"
              required
            />
          </div>
          <button
            type="submit"
            id="retrieveBookingBtn"
            className={`${styles.retrieveBookingBtn} mt-3 mb-3`}
          >
            Retrieve Booking
          </button>
        </form>
        <div className="responseDiv"></div>
        <div className={`${styles.responseContainer}`}>
          <h3 className="mt-3 mb-3">Result</h3>
          <div className="row">
            <div className="col-md-6">
              <img className="img-fluid" src={receive} alt="" />
            </div>
            <div className="col-md-6">
              <h3>Booking ID:</h3>
              <h5 id="bookingIdResult">{booking.BookingID}</h5>
              <h3>Facility Description:</h3>
              <h5 id="descriptionResult">{booking.FacilityDescription}</h5>
              <h3>Booked By:</h3>
              <h5 id="bookedByResult">{booking.BookedBy}</h5>
              <h3>Booking Date From:</h3>
              <h5 id="bookingDateFromResult">{convertDateFormat(booking.BookingDateFrom)}</h5>
              <h3>Booking Date To:</h3>
              <h5 id="bookingDateToResult">{convertDateFormat(booking.BookingDateFrom)}</h5>
              <h3>Booking Status:</h3>
              <h5 id="bookingStatusResult">{booking.BookingStatus}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingByID