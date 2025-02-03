import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import apiService from "../api/apiservices";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Fixed e.prevent.default() to e.preventDefault()
        setError(""); // Clear previous error message
        setMessage(""); // Clear previous success message

        try {
            const response = await apiService.post("auth/signup", { name, email, password });
         console.log(response)
         const user = response.data.user;  // This should give you the user object
         const userId = user.id;   
         localStorage.setItem("userId", userId);

         console.log("userId:", userId); 
            setMessage("Register successful!"); // Directly set the success message
            setName("");
            setEmail("");
            setPassword("");
            navigate('/login')
        } catch (err) {
            setError(err.response?.data?.message || "Register failed, something went wrong.");
            setMessage(""); // Clear the success message if there was an error
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                {message && <p className="mt-4 text-green-600">{message}</p>}
                {error && <p className="mt-4 text-red-600">{error}</p>}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-semibold">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>

                <NavLink className="text-blue-500 hover:text-blue-700 "to="/login">Allredy have account ?</NavLink>    
                   
                </form>
            </div>
        </div>
    );
}

export default Register;
