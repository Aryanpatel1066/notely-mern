import { useState } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../api/apiservices";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await apiService.post("/auth/signin", { email, password });

      console.log("API Response:", response.data); // Debugging response
      
      const { name, userId, message } = response.data;

      if (!userId) {
        throw new Error("Invalid login response: userId missing");
      }

      // ✅ Store correct values
      localStorage.setItem("userId", userId);
      localStorage.setItem("user", JSON.stringify({ name, email }));

      toast.success(`✅ ${message || "Login successful!"}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });

      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      toast.error(`❌ ${err.response?.data?.message || "Login failed!"}`, {
        position: "top-right",
        autoClose:2000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:false,
        draggable:true,
        theme:"light",
        transition:Bounce,
      });
    }
  };

  return (
    <>   
     <Navbar/>
     <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <NavLink to="/register" className="text-blue-500 hover:text-blue-700">
            Don't have an account?
          </NavLink>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </div>
    </>

  );
}

export default Login;
