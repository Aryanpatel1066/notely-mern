import { useState } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../api/apiservices";
import { NavLink, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5"; // Using react-icons for the back arrow icon

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.post("/send-otp", { email });
      toast.success("✅ OTP sent successfully!", { autoClose: 2000 });
      setTimeout(() => navigate("/verify-otp", { state: { email } }), 2000);
    } catch (err) {
      toast.error(`❌ ${err.response?.data?.message || "Error sending OTP"}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full p-2 border rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Send OTP
          </button>
          <button className="w-15 bg-green-500 text-white p-2 m-5 rounded flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors">
            <IoArrowBack className="text-white" />
            <NavLink to="/login" className="text-white">
              Back
            </NavLink>
          </button>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          transition={Bounce}
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
