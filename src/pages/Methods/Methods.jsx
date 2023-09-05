import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ViewBookings from '../../components/MethodPage/ViewBookings';
import BookingByID from '../../components/MethodPage/BookingByID';
import BookingByStatus from '../../components/MethodPage/BookingByStatus';
import BookingByDescription from '../../components/MethodPage/BookingByDescription';
import RetrieveAllUsers from '../../components/MethodPage/RetrieveAllUsers';
import RetrieveUsersBooking from '../../components/MethodPage/RetrieveUsersBooking';
import CreateBooking from '../../components/MethodPage/CreateBooking';
import UpdateBooking from '../../components/MethodPage/UpdateBooking';
import DeleteBooking from '../../components/MethodPage/DeleteBooking';
import DeleteUser from '../../components/MethodPage/DeleteUser';

function Methods() {
  return (
    <Routes>
        <Route path="/viewbookings" element={<ViewBookings />}></Route>
        <Route path="/bookingbyid" element={<BookingByID />}></Route>
        <Route path="/bookingbystatus" element={<BookingByStatus />}></Route>
        <Route path="/bookingbydescription" element={<BookingByDescription />}></Route>
        <Route path="/retrieveallusers" element={<RetrieveAllUsers />}></Route>
        <Route path="/retrieveusersbooking" element={<RetrieveUsersBooking />}></Route>
        <Route path="/deleteuser" element={<DeleteUser />}></Route>
        <Route path="/createbooking" element={<CreateBooking />}></Route>
        <Route path="/updatebooking" element={<UpdateBooking />}></Route>
        <Route path="/deletebooking" element={<DeleteBooking />}></Route>
    </Routes>
  )
}

export default Methods