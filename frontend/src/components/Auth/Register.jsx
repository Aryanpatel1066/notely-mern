import React, { useState } from "react";
import axios from "../../api"; // Axios instance with baseURL pointing to the backend

function Register() {
    // State to hold form data
    const [formData, setFormData] = useState({
        name: "",
        userId: "",
        email: "",
        password: "",
    });

    // State for feedback messages
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:2810/todoApp/api/v1/auth/signup", formData);
            setMessage("Registration successful!");
            setIsError(false);
            setFormData({ name: "", userId: "", email: "", password: "" });
        } catch (err) {
            setMessage(err.response?.data?.message || "Registration failed.");
            setIsError(true);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {message && (
                <p style={{ color: isError ? "red" : "green" }}>{message}</p>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    placeholder="User ID"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
