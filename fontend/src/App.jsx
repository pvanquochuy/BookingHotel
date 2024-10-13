import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import ExistingRooms from "./components/room/ExistingRooms.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import EditRoom from "./components/room/EditRoom.jsx";
import AddRoom from "./components/room/AddRoom.jsx";
import NavBar from "./components/layout/NavBar.jsx";
import Footer from "./components/layout/Footer.jsx";
import RoomListing from "./components/room/RoomListing.jsx";
import Admin from "./components/admin/Admin.jsx";
import Checkout from "./components/bookings/Checkout.jsx";
import BookingSuccess from "./components/bookings/BookingSuccess.jsx";
import LoginPage from "./components/auth/LoginPage.jsx";
import RegisterPage from "./components/auth/RegisterPage.jsx";
// import { ProtectedRoute } from "./components/utils/Guard.js";
import ProfilePage from "./components/profile/ProfilePage.jsx";
// import RoomSearch from "./components/common/RoomSearch.jsx";

function App() {
  return (
    <>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/browse-all-rooms" element={<RoomListing />} />
            <Route path="/existing-rooms" element={<ExistingRooms />} />

            {/* Protected Routes */}
            {/* <Route
              path="/room-details-book/:roomId"
              element={<ProtectedRoute element={<RoomDetailsBookingPage />} />}
            /> */}

            <Route path="/profile" element={<ProfilePage />} />

            {/* <Route
              path="/profile"
              element={<ProtectedRoute element={<ProfilePage />} />}
            /> */}

            {/* <Route
              path="/edit-profile"
              element={<ProtectedRoute element={<EditProfilePage />} />}
            /> */}

            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/book-room/:roomId" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            {/* <Route path="/find-booking" element={<RoomSearch />} /> */}
          </Routes>
          <Footer />
        </Router>
      </main>
    </>
  );
}

export default App;
