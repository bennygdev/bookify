import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './BookingByStatus.module.css'

function BookingByStatus() {
  const [status, setStatus] = useState({
    Status: "?"
  });
  const [bookingStatus, setBookingStatus] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [bookedBy, setBookedBy] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // init page with 1
  const bookingsPerPage = 6;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if(!token) {
      window.location.href = "/login";
    }

    if (role != "admin") {
      setBookedBy(false);
    } else {
      setBookedBy(true);
    }
  }, []);

  const handleCloseError = () => {
    setIsErrorVisible(false);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");

    e.preventDefault();

    const bookStatus = document.getElementById("bookingStatus").value;

    try {
      const response = await fetch(`https://localhost/api/Bookings/GetByStatus/${bookStatus}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

      setStatus({Status: bookStatus});

      if (response.ok) {
        const bookingData = await response.json();
        setBookingStatus(bookingData);
      } else {
        setBookingStatus([]);
        const errorText = await response.json();
        setErrorMessage(`${errorText.detail}`);
        setIsErrorVisible(true);
        console.log("Failed to retrieve booking");
      }
    } catch (error) {
      setErrorMessage("Please select an option");
      setIsErrorVisible(true);
      console.log("An error occured", error);
    }

  }

  function convertDateFormat(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  function getPageRange() {
    const startIndex = (currentPage - 1) * bookingsPerPage;
    const endIndex = startIndex + bookingsPerPage;
    return { startIndex, endIndex };
  }

  return (
      <div className="container mt-5">
          <Link to="/controlpanel">
              <button id="backBtn" className={`${styles.backBtn} mb-3`}>
                  Back
              </button>
          </Link>
          <h1>Retrieve Booking by Status</h1>
          <div className="errorMessage">
              {isErrorVisible && (
                  <div
                      className="alert alert-danger alert-dismissible fade show"
                      role="alert"
                  >
                      {errorMessage}
                      <button
                          type="button"
                          className="btn-close"
                          onClick={handleCloseError}
                      ></button>
                  </div>
              )}
          </div>
          <form onSubmit={handleSubmit} id="retrieveBookingStatusForm">
              <div className="form-group">
                  <label htmlFor="bookingStatus">
                      Select booking status to view
                  </label>
                  <select
                      name="bookingStatus"
                      id="bookingStatus"
                      className="form-control"
                      required
                  >
                      <option value="">Select status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rejected">Rejected</option>
                  </select>
              </div>
              <button
                  type="submit"
                  id="retrieveBookingBtn"
                  className={`${styles.retrieveBookingBtn} mt-3`}
              >
                  Retrieve Booking
              </button>
          </form>
          <h4 className="mt-3 mb-3 viewStatus">
              Viewing bookings with {status.Status} status
          </h4>
          <div className="responseDiv mb-3">
              <div className={`${styles.grid}`}>
                  {bookingStatus
                      .slice(getPageRange().startIndex, getPageRange().endIndex)
                      .map((booking, index) => (
                          <div
                              key={index}
                              className={`${styles.booking__container}`}
                          >
                              <p>
                                  <strong>Facility Description: </strong>
                                  {booking.FacilityDescription}
                              </p>
                              <p>
                                  <strong>From: </strong>
                                  {convertDateFormat(booking.BookingDateFrom)}
                              </p>
                              <p>
                                  <strong>To: </strong>
                                  {convertDateFormat(booking.BookingDateTo)}
                              </p>
                              <p>
                                  <i
                                      className="fa-solid fa-circle fa-xs"
                                      style={{
                                          color:
                                              booking.BookingStatus.toLowerCase() ===
                                              "pending"
                                                  ? "orange"
                                                  : booking.BookingStatus.toLowerCase() ===
                                                    "confirmed"
                                                  ? "green"
                                                  : booking.BookingStatus.toLowerCase() ===
                                                    "rejected"
                                                  ? "red"
                                                  : "grey",
                                      }}
                                  ></i>
                                  <strong> Status: </strong>
                                  {booking.BookingStatus}
                              </p>
                              {bookedBy && (
                                  <p>
                                      <strong>Booked By: </strong>
                                      {booking.BookedBy}
                                  </p>
                              )}
                              <div
                                  className={`${styles.blue__box} text-center d-flex flex-column`}
                              >
                                  <p
                                      className={styles.bookingIdText1}
                                      style={{ color: "white" }}
                                  >
                                      ID:
                                  </p>
                                  <p
                                      className={styles.bookingIdText2}
                                      style={{ color: "white" }}
                                  >
                                      {booking.BookingID}
                                  </p>
                              </div>
                          </div>
                      ))}
              </div>
          </div>
          <div className={styles.pagination}>
              {Array.from({
                  length: Math.ceil(bookingStatus.length / bookingsPerPage),
              }).map((_, index) => (
                  <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={currentPage === index + 1 ? styles.active : ""}
                  >
                      {index + 1}
                  </button>
              ))}
          </div>
      </div>
  );
}

export default BookingByStatus