import { useState } from "react";
import apiService from "../api/apiservices";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error message
    setMessage(""); // Clear previous success message
    try {
      const response = await apiService.post("auth/signin", {
        email,
        password,
      });
      const { name, accessToken, message } = response.data;

      localStorage.setItem("token", accessToken); // Store token in localStorage
      localStorage.setItem("user", JSON.stringify({ name, email })); // Store user info in localStorage

      console.log("Token:", accessToken);
      console.log("User:", { name, email });
      console.log("Message:", message);

      setMessage(message || "Login successful!");
      setError(""); // Clear any existing error
      setEmail("");
      setPassword("");
      navigate("/dashboard"); // Corrected to use navigate function
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      ); // Use backend error message or default
      setMessage(""); // Clear any existing success message
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold"
            >
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
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold"
            >
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

        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        <div className="mt-4 text-center">
          <NavLink to="/register" className="text-blue-500 hover:text-blue-700">
            Don't have an account?
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;
