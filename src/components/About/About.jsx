import React from 'react'
import { Link } from 'react-router-dom';
import styles from './About.module.css';
import about1 from '../../assets/images/aboutus.png';

function About() {
  return (
    <>
      <section className="mt-5">
        <div className="container mb-5">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6">
                <img className="loginimage img-fluid" src={about1} alt="" />
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <div className="d-block">
                  <h1>About Us</h1>
                  <p>
                    We are a team of specialists with a knack for helping
                    others book facilities. Join us and start booking!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='container'>
        <h1 className='text-center mb-4'>Contact us</h1>
      </div>

      <section className='container mb-5'>
        <div className="row justify-content-center">
          <div className="col-md-4 text-center align-items-center">
            <div className={styles.box}>
                <i
                  className="fa-solid fa-location-dot fa-2xl mb-4"
                  style={{ color: "#0fafff" }}
                ></i>{" "}
              <h3>
                Address
              </h3>
              <p>2 Ang Mo Kio Dr, Singapore 567720</p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className={styles.box}>
                <i
                  className="fa-solid fa-phone fa-2xl mb-4"
                  style={{ color: "#0fafff" }}
                ></i>
              <h3>
                Contact Number
              </h3>
              <p>+65 1234 5678</p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className={styles.box}>
                <i
                  className="fa-solid fa-envelope fa-2xl mb-4"
                  style={{ color: "#0fafff" }}
                ></i>
              <h3>
                Support
              </h3>
              <p>support@bookify.com</p>
            </div>
          </div>
        </div>
      </section>

      <section className='container mt-5'>
        <h1 className='text-center'>Frequently Asked Questions</h1>
        <div class="accordion accordion-flush mt-4" id="reviewtime">
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne">
                What facilities can I book?
            </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#reviewtime">
            <div class="accordion-body">We offer facilities of any category. We are a company that has a quota to source for facilities anywhere and ensure that you will receive it. But keep in mind that any obscure descriptions might result in your bookings being rejected.</div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo">
                How long does it take for my bookings to be reviewed?
            </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">Your booking will be reviewed anywhere from 1 - 3 business days depending on our staff availability. We will send you an email once your booking has been reviewed.</div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree">
                Can I change my booking details if my booking is confirmed?
            </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">Generally, we do not accept amendments to bookings if the booking status is already confirmed. If you think that you really need to amend, please email us for a change.</div>
            </div>
        </div>
        </div>
      </section>
    </>
  );
}

export default About