import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout.jsx';
import AccountLayout from '../layouts/AccountLayout.jsx';

import Home from '../pages/Home.jsx';
import Hotels from '../pages/Hotels.jsx';
import HotelDetails from '../pages/HotelDetails.jsx';
import Rooms from '../pages/Rooms.jsx';
import RoomDetails from '../pages/RoomDetails.jsx';
import SearchResults from '../pages/SearchResults.jsx';

import Booking from '../pages/booking/Booking.jsx';
import BookingReview from '../pages/booking/BookingReview.jsx';
import BookingSuccess from '../pages/booking/BookingSuccess.jsx';

import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import ForgotPassword from '../pages/auth/ForgotPassword.jsx';

import Profile from '../pages/account/Profile.jsx';
import MyBookings from '../pages/account/MyBookings.jsx';
import BookingDetails from '../pages/account/BookingDetails.jsx';
import Favorites from '../pages/account/Favorites.jsx';
import MyReviews from '../pages/account/MyReviews.jsx';
import Settings from '../pages/account/Settings.jsx';

import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import Terms from '../pages/Terms.jsx';
import Privacy from '../pages/Privacy.jsx';
import NotFound from '../pages/NotFound.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public pages with the main layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/search" element={<SearchResults />} />

        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/review" element={<BookingReview />} />
        <Route path="/booking/success" element={<BookingSuccess />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>

      {/* Protected account pages */}
      <Route element={<AccountLayout />}>
        <Route path="/account/profile" element={<Profile />} />
        <Route path="/account/bookings" element={<MyBookings />} />
        <Route path="/account/bookings/:id" element={<BookingDetails />} />
        <Route path="/account/favorites" element={<Favorites />} />
        <Route path="/account/reviews" element={<MyReviews />} />
        <Route path="/account/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
