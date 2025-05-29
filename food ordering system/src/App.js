import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ShopProvider } from './pages/Context/CartContext';
import { UserProvider } from './Dashboard/Profile/UserContext';
import { ThemeLanguageProvider } from './Dashboard/Profile/ThemeLanguageContext';

// Public components
import Navbar from './components/Navbar';
import LandingpageHero from './components/LandingpageHero';
import Hero from './components/Hero';
import Footer from './components/Footer';

// Public pages
import Acount from './pages/Acount/Acount';
import AddToProduct from './pages/AddToCart/Sections/AddToProduct';
import AddToWishList from './pages/AddToWishList/AddToWishlist';
import Placeorder from './pages/Placeorder/PlaceOrder';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Menu from './pages/Menu/Menu';
import Orders from './pages/Orders/Orders';
import Payment from './pages/payment/CheckoutPage';

// Dashboard layout & pages
import Sidebar from './Dashboard/Components/Sidebar';
import Header from './Dashboard/Components/Header';
import Overview from './Dashboard/Dashboard/Overview';
import Product from './Dashboard/product/Product';
import AdminOrders from './Dashboard/Orders/Orders';
import Users from './Dashboard/Users/User';
import AdminPayment from './Dashboard/AdminPayment/AdminPayment';
import Feedback from './Dashboard/Feedback/Feedback';
// Profile pages and layout
import Profile from './Dashboard/Profile/Profile';
import ViewProfile from './Dashboard/Profile/ViewProfile';
import EditProfile from './Dashboard/Profile/EditProfile';
import ChangePassword from './Dashboard/Profile/ChangePassword';
import AddressBook from './Dashboard/Profile/AddressBook';
import PaymentMethods from './Dashboard/Profile/PaymentMethods';
import OrderHistory from './Dashboard/Profile/OrderHistory';
import Notifications from './Dashboard/Profile/Notifications';
import Settings from './Dashboard/Profile/Settings';
import Help from './Dashboard/Profile/Help';
import Logout from './Dashboard/Profile/Logout';

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isProfile = location.pathname.startsWith('/dashboard/profile');

  return (
    <ShopProvider>
      <ThemeLanguageProvider>
        {isDashboard ? (
          <UserProvider>
            <div className="flex">
              {!isProfile && <Sidebar />}
              <div
                className={
                  "flex-1 bg-gray-900 text-white min-h-screen " +
                  (isProfile ? "" : "ml-[260px]")
                }
              >
                <Header />
                <main className="p-6 mt-16">
                  <Routes>
                    <Route path="/dashboard" element={<Overview />} />
                    <Route path="/dashboard/product" element={<Product />} />
                    <Route path="/dashboard/orders" element={<AdminOrders />} />
                     <Route path="/dashboard/users" element={<Users />} />
                     <Route path="/dashboard/payments" element={<AdminPayment />} />
                     <Route path="/dashboard/feedback" element={<Feedback/>} />
                    <Route path="/dashboard/profile/*" element={<Profile />}>
                      <Route index element={<ViewProfile />} />
                      <Route path="edit" element={<EditProfile />} />
                      <Route path="change-password" element={<ChangePassword />} />
                      <Route path="address-book" element={<AddressBook />} />
                      <Route path="payment-methods" element={<PaymentMethods />} />
                      <Route path="order-history" element={<OrderHistory />} />
                      <Route path="notifications" element={<Notifications />} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="help" element={<Help />} />
                      <Route path="logout" element={<Logout />} />
                      <Route path="*" element={<Navigate to="/dashboard/profile" replace />} />
                    </Route>
                  </Routes>
                </main>
              </div>
            </div>
          </UserProvider>
        ) : (
          <>
            <Navbar />
            {location.pathname === '/' ? <LandingpageHero /> : <Hero />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/AddToProduct" element={<AddToProduct />} />
              <Route path="/AddToWishList" element={<AddToWishList />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/Acount" element={<Acount />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Orders" element={<Orders />} />
              <Route path="/Placeorder" element={<Placeorder />} />
              <Route path="/Payment" element={<Payment />} />
              <Route path="/profile/*" element={<Navigate to="/dashboard/profile" replace />} />
            </Routes>
            <Footer />
          </>
        )}
      </ThemeLanguageProvider>
    </ShopProvider>
  );
}

export default App;
