import React from 'react'
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import facilityBook from '../../assets/images/facilitybooking.avif';
import appointmentBookOne from '../../assets/images/appointmentbooking2.avif';
import assurance from '../../assets/images/assurance.jpg';
import analytics from '../../assets/images/analytic.jpg';

function LandingPage() {
  return (
    <div>
        <section className='mt-5'>
            <div className="container mb-5">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6">
                            <img className="loginimage img-fluid" src={facilityBook} alt="" /> 
                        </div>
                        <div className="col-md-6 d-flex align-items-center">
                            <div className="d-block">
                                <h1>Bookify</h1>
                                <p>Book facilities seamlessly to your needs</p>
                                <Link to="/login">
                                    <button className={styles.getStartedBtn}>Get started</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <br />

        <section className="container mt-5 mb-4">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="text-end d-lg-block mt-5">
                        <h1>Features</h1>
                        <p>As a facility booking company, here are the features we offer for our users and clients:</p>
                        <ul style={{listStyleType: "none"}}>
                            <li className='mb-2'><i className="fa-solid fa-check fa-2xl" style={{color: "green"}}></i> Booking with high flexibility with our highly scalable app</li>
                            <li className='mb-2'><i className="fa-solid fa-check fa-2xl" style={{color: "green"}}></i> 98% Approval Rate: Our copany ensures the risk of being rejected is least as possible</li>
                            <li className='mb-2'><i className="fa-solid fa-check fa-2xl" style={{color: "green"}}></i> 24/7 Award Winning support</li>
                            <li className='mb-2'><i className="fa-solid fa-check fa-2xl" style={{color: "green"}}></i> Plenty of services to assist the client or user in booking</li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6">
                    <img src={appointmentBookOne} alt="" className="img-fluid" />
                </div>
            </div>
        </section>

        <br />

        <section className='container mt-4 mb-4'>
        <div className="row align-items-center">
                <div className="col-lg-6 text-center">
                    <img src={assurance} alt="" className={`img-fluid w-10 ${styles.assurance}`} />
                </div>
                <div className="col-lg-6">
                    <div className="text-start d-lg-block mt-5">
                        <h1>Assurance</h1>
                        <p>Our team will ensure that your facility booking will get reviewed within 3 working days! As a facility booking company, we value customer experience!</p>
                        <div className="row">
                            <div className="col-md-4">
                                <div className={styles.box}>
                                    <h5><i className="fa-solid fa-bolt fa-lg" style={{color: "orange"}}></i> 100% Speed</h5>
                                    <p>We assist clients with speed!</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={styles.box}>
                                    <h5><i className="fa-solid fa-headset" style={{color: "blue"}}></i> Top Support</h5>
                                    <p>Our award winning support makes the cut!</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={styles.box}>
                                    <h5><i className="fa-solid fa-star fa-lg" style={{color: "teal"}}></i> Genuine</h5>
                                    <p>Our services are rated 4.9 on TrustPilot</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <br />

        <section className="container mt-4 mb-4">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="text-end d-lg-block mt-5">
                        <h1>Interactive UI</h1>
                        <p>We offer a interactive and minimalistic UI to cut out the clutter and make accessibility easier for our clients</p>
                    </div>
                </div>
                <div className="col-lg-6">
                    <img src={analytics} alt="" className="img-fluid" />
                </div>
            </div>
        </section>

        <br />

        <div className="container mt-4 mb-4">
            <div className="row">
                <div className="col-md-6">
                    <h1>Get started?</h1>
                    <p>Dive into booking facilities seamlessly for your needs with the assurance from us, you will be guaranteed a flawless award winning customer service, reviews in a short time and genuine services.</p>
                </div>
                <div className="col-md-6 align-items-center justify-content-center d-flex">
                    <Link to="/login">
                        <button className={styles.getStartedBtn2}>Start Booking</button>
                    </Link>
                </div>
            </div>
        </div>

        <footer className='text-center mt-4'>
            <h5>&copy; Bookify 2023</h5>
        </footer>
    </div>

    
  )
}

export default LandingPage