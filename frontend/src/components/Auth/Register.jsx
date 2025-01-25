import React, { useState } from "react";
import { Link } from "react-router-dom"
import axios from "../../api"; // Axios instance with baseURL pointing to the backend
import "./Register.css"
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
            <div className="dummyImage"></div>
            <h1>Welcom to Onboard!</h1>
            <p className="subHeading">let's help to meet up your tasks.</p>
            {message && (
                <p style={{ color: isError ? "red" : "green" }}>{message}</p>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter you full name"
                    required
                />
                <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    placeholder=" Enter User ID"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your Password"
                    required
                />
                <button type="submit">Register</button>
                <div className="subHeading">Already hav an account ? <Link className="link" to="/"> sign in</Link></div>
            </form>
        </div>
    );
}

export default Register;
