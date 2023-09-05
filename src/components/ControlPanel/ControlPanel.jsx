import React, { useState, useEffect } from 'react'
import styles from './ControlPanel.module.css';
import Tile from './Tile';

function ControlPanel() {
  const [role, setRole] = useState('');

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
          window.location.href = "/login";
      }

      const welcomeMessage = document.getElementById("welcomeMessage");
      const username = localStorage.getItem("username");
      
      const role = localStorage.getItem("role");
      setRole(role);

      welcomeMessage.textContent = role != 'admin' ? `Welcome, ${username}!` : `Admin dashboard`
  }, []);
  
  return (
    <>
      <div className="container mt-5">
        <h1 className={styles.welcomeMessage} id="welcomeMessage">
          Welcome, User!
        </h1>
        <p>Select our wide range of services to get started.</p>
        {role === "admin" && (
          <>
            <h3 className={`mt-3 ${styles.h3__header}`}>Admin</h3>
            <div className={`${styles.grid} mt-3 mb-3`}>
                  <Tile
                    icon={
                      <i
                        className="fa-solid fa-users fa-2xl mb-3"
                        style={{ color: "black" }}
                      ></i>
                    }
                    title="Retrieve All Users"
                    description="Retrieve list of registered users. Only accessible for administrators"
                    link="/controlpanel/retrieveallusers"
                  />
                  <Tile
                    icon={
                      <i
                        className="fa-solid fa-hospital-user fa-2xl mb-3"
                        style={{ color: "black" }}
                      ></i>
                    }
                    title="Retrieve User's Booking"
                    description="Retrieve list of bookings a user has made. Only accessible for administrators"
                    link="/controlpanel/retrieveusersbooking"
                  />
                  <Tile
                    icon={
                      <i
                        className="fa-solid fa-user-xmark fa-2xl mb-3"
                        style={{ color: "black" }}
                      ></i>
                    }
                    title="Delete User"
                    description="Delete a user based on what circumstances are set"
                    link="/controlpanel/deleteuser"
                  />
            </div>
          </>
        )}
        <h3 className={`mt-3 ${styles.h3__header}`}>View</h3>
        <div className={`${styles.grid} mt-3 mb-3`}>
          <Tile
            icon={
              <i
                className="fa-solid fa-book-open fa-2xl mb-3"
                style={{ color: "black" }}
              ></i>
            }
            title="Your bookings"
            description="View all your currently booked facility bookings"
            link="/controlpanel/viewbookings"
          />
          <Tile
            icon={
              <i
                className="fa-solid fa-id-card-clip fa-2xl mb-3"
                style={{ color: "black" }}
              ></i>
            }
            title="Booking By ID"
            description="Retrieve your booking by ID lookup for more details on your booking"
            link="/controlpanel/bookingbyid"
          />
          <Tile
            icon={
              <i
                className="fa-solid fa-ellipsis fa-2xl mb-3"
                style={{ color: "black" }}
              ></i>
            }
            title="Booking By Status"
            description="Retrieve your booking by status lookup for more details on your booking"
            link="/controlpanel/bookingbystatus"
          />
          <Tile
            icon={
              <i
                className="fa-solid fa-newspaper fa-2xl mb-3"
                style={{ color: "black" }}
              ></i>
            }
            title="Booking By Description"
            description="Retrieve your booking by facility description lookup for more details on your booking"
            link="/controlpanel/bookingbydescription"
          />
        </div>
        <h3 className={`mt-3 ${styles.h3__header}`}>Control</h3>
        <div className={`${styles.grid} mt-3 mb-5`}>
        <Tile
            icon={
              <i
                className="fa-solid fa-plus fa-2xl mb-3"
                style={{ color: "black" }}
              ></i>
            }
            title="Create Booking"
            description="Book a new facility by booking an appointment"
            link="/controlpanel/createbooking"
          />
        <Tile
            icon={
              <i
                className="fa-solid fa-pen fa-xl mb-3"
                style={{ color: "black" }}
              ></i>
            }
            title="Update Booking"
            description="Update your booking by changing details of your appointment. If your booking status is confirmed or rejected, it can no longer be updated."
            link="/controlpanel/updatebooking"
          />
        <Tile
            icon={
              <i
                className="fa-solid fa-trash fa-2xl mb-3"
                style={{ color: "black" }}
              ></i>
            }
            title="Delete Booking"
            description="Delete your booking by ID lookup. If your booking status is confirmed or rejected, it can no longer be updated."
            link="/controlpanel/deletebooking"
          />
        </div>
      </div>
    </>
  );
}

export default ControlPanel