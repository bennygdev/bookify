import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ViewBookings.module.css";
import nodata from '../../assets/images/nodata.jpg';

function ViewBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [roleName, setRoleName] = useState({
        "roleName": "?"
    })
    const [bookedBy, setBookedBy] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // init page with 1
    const bookingsPerPage = 6;

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (!token) {
            window.location.href = "/login";
        }

        if (role != "admin") {
            setBookedBy(false);
            setRoleName({roleName: "Your"})
        } else {
            setBookedBy(true);
            setRoleName({roleName: "All"})
        }

        async function fetchBookings() {
            try {
                const response = await fetch(
                    "https://localhost/api/Bookings/GetAll",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const bookingsData = await response.json();
                    setBookings(bookingsData);
                } else {
                    console.error("Failed to fetch bookings.");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBookings();
    }, []);

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
                    <button
                        id="backBtn"
                        className={`${styles.backBtn} mt-3 mb-3`}
                    >
                        Back
                    </button>
                </Link>
                <h1 id="userMessage">{roleName.roleName} bookings</h1>
                {loading && (
                    <div className="loadingIndicator">
                        <div className="spinner"></div>
                    </div>
                )}
                <h4>Total bookings: {bookings.length}</h4>
                <div className="bookings mt-3">
                    <div className={`${styles.grid}`}>
                        {bookings.length === 0 ? (
                            <>
                                <div className={styles.noDataContainer}>
                                    <img src={nodata} className={`${styles.noDataImg}`} alt="" />
                                    <h3>No bookings shown. <Link to="/controlpanel/createbooking">Book one?</Link></h3>
                                </div>
                            </>
                        ) : (bookings
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
                                </div>)
                            ))}
                    </div>
                    <div className={styles.pagination}>
                        {Array.from({
                            length: Math.ceil(
                                bookings.length / bookingsPerPage
                            ),
                        }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={
                                    currentPage === index + 1
                                        ? styles.active
                                        : ""
                                }
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewBookings;
