import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./RetrieveUsersBooking.module.css";

function RetrieveUsersBooking() {
    const [errorMessage, setErrorMessage] = useState("");
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState({
        username: "?",
    });
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // init page with 1
    const bookingsPerPage = 6;

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (!token) {
            window.location.href = "/login";
        } else if (role != "admin") {
            window.location.href = "/controlpanel";
        }
    }, []);

    const handleCloseError = () => {
        setIsErrorVisible(false);
        setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");

        e.preventDefault();

        const username = document.getElementById("username").value;

        try {
            const response = await fetch(
                `https://localhost/api/Bookings/GetByBookedBy/${username}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const userBookings = await response.json();
                setUser({ username: username });
                setBookings(userBookings);
            } else {
                const errorText = await response.json();
                setErrorMessage(`${errorText.detail}`);
                setIsErrorVisible(true);
            }
        } catch (error) {
            setErrorMessage(
                "You do not have administrative rights to view this method."
            );
            setIsErrorVisible(true);
            console.log("An error occured: ", error);
        }
    };

    function convertDateFormat(dateString) {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    }

    function getPageRange() {
        const startIndex = (currentPage - 1) * bookingsPerPage;
        const endIndex = startIndex + bookingsPerPage;
        return { startIndex, endIndex };
    }

    return (
        <>
            <div className="container mt-5">
                <Link to="/controlpanel">
                    <button id="backBtn" className={`${styles.backBtn} mb-3`}>
                        Back
                    </button>
                </Link>
                <h1>Get user's booking</h1>
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
                <form onSubmit={handleSubmit} id="retrieveUserBookings">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`${styles.retrieveBookingBtn} mt-3 mb-3"`}
                        id="retrieveBookingBtn"
                    >
                        Retrieve User Bookings
                    </button>
                </form>
                <h3 id="userMessage" className={`mt-3`}>
                    {user.username} bookings
                </h3>
                <div className="responseDiv mt-3 mb-3">
                    <div className={`${styles.grid}`}>
                        {bookings
                            .slice(
                                getPageRange().startIndex,
                                getPageRange().endIndex
                            )
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
                                        {convertDateFormat(
                                            booking.BookingDateFrom
                                        )}
                                    </p>
                                    <p>
                                        <strong>To: </strong>
                                        {convertDateFormat(
                                            booking.BookingDateTo
                                        )}
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
                        length: Math.ceil(bookings.length / bookingsPerPage),
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
        </>
    );
}

export default RetrieveUsersBooking;
