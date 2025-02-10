import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Dashbord from "../pages/Dashboard";
import Home from "../pages/Home";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile"; 
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword"
import VerifyOtp from "../pages/VerifyOtp"; 
function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Dashboard" element={<Dashbord />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}
export default Router;
