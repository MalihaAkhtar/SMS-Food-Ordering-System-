/* eslint-disable react/jsx-no-undef */
import { Routes, Route, useLocation } from "react-router-dom";
import { ShopProvider } from './pages/Context/CartContext';
import Navbar from './components/Navbar';
import LandingpageHero from './components/LandingpageHero';
import Hero from './components/Hero';
import Footer from './components/Footer';

// Pages
import Acount from './pages/Acount/Acount';
import AddToProduct from './pages/AddToCart/Sections/AddToProduct';
import AddToWishList from './pages/AddToWishList/AddToWishlist';
import Placeorder from './pages/Placeorder/PlaceOrder';
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Menu from "./pages/Menu/Menu";
import Orders from "./pages/Orders/Orders";
import Payment from "./pages/payment/CheckoutPage";

// Dashboard Pages
import Dashboard from './Dashboard/Pages/Dashboard';
import Layout from './Dashboard/Components/Layout';
import MyProducts from "./Dashboard/Pages/MyProducts"; // Import Products component
import Users from "./Dashboard/Pages/Users"; // Import Users component
import Feedback from "./Dashboard/Pages/Feedback"; // Import Feedback component
import Order from "./Dashboard/Pages/MyOrder";
import Payments from "./Dashboard/Pages/UserPayments";
function App() {
  const location = useLocation();

  const isDashboard = location.pathname.includes("/dashboard");

  return (
    <ShopProvider>
      {!isDashboard && <Navbar />}
      {!isDashboard && (location.pathname === "/" ? <LandingpageHero /> : <Hero />)}

      <Routes>
        {/* Main Website Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/AddToProduct" element={<AddToProduct />} />
        <Route path="/AddToWishList" element={<AddToWishList />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/Acount" element={<Acount />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Placeorder" element={<Placeorder />} />
        <Route path="/Payment" element={<Payment />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/Layout" element={<Layout />} />
        <Route path="/dashboard/Myproducts" element={<MyProducts />} /> {/* Products Route */}
        <Route path="/dashboard/users" element={<Users />} /> {/* Users Route */}
        <Route path="/dashboard/feedback" element={<Feedback />} /> {/* Feedback Route */}
        <Route path="/dashboard/Order" element={<Order />} />
        <Route path="/dashboard/Payments" element={<Payments />} />
      </Routes>

      {!isDashboard && <Footer />}
    </ShopProvider>
  );
}

export default App;
