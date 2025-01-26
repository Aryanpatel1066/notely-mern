import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
 
import {jwtDecode} from "jwt-decode";

import "./Login.css";

function Login() {
    const [formData, setFormData] = useState({
        userId: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:2810/todoApp/api/v1/auth/signin", formData);

            const { accessToken, name } = res.data;

            // Decode the token to get the expiration time
            const decodedToken = jwtDecode(accessToken);
            const expiresAt = decodedToken.exp * 1000; // Convert to milliseconds

            // Save user details and token in localStorage
            localStorage.setItem("token", accessToken);
            localStorage.setItem("user", JSON.stringify({ name, expiresAt }));

            // Set a timeout to redirect the user after token expiration
            setTimeout(() => {
                localStorage.clear(); // Clear user details and token
                navigate("/"); // Redirect to login
            }, expiresAt - Date.now());

            setMessage("Login successful");
            setIsError(false);
            navigate("/dashboard");
        } catch (err) {
            setMessage(err.response?.data?.message || "Login failed.");
            setIsError(true);
        }
    };

    return (
        <div>
            <div className="dummyImage"></div>
            <h1 className="loginHeading">Welcome back</h1>
            <div className="loginBackground"></div>
            {message && (
                <p style={{ color: isError ? "red" : "green" }}>{message}</p>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    placeholder="Enter your userId"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                />
                <button type="submit">Login</button>
                <div className="subHeading">Don't have an account? <Link className="link" to="/register">Sign up</Link></div>
                <div className="link">Forgot password?</div>
            </form>
        </div>
    );
}

export default Login;
