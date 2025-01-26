import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./Login.css"
function Login() {
    //store the form data in state
    const [formData, setFormData] = useState({
        userId: "",
        password: ""
    });
    // State for feedback messages
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    //now trigger event
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:2810/todoApp/api/v1/auth/signin", formData)




            setMessage("login successfully")
            setIsError(false);
            setFormData({ userId: "", password: "" })
        }
        catch (err) {
            setMessage(err.response?.data?.message || "Registration failed.");
            setIsError(true);
        }
    }

    return (
        <div>
            <div className="dummyImage"></div>
            <h1 className="loginHeading">Welcome back</h1>
            <div className="loginBackground"></div>
            {message && (
                <p style={{ color: isError ? "red" : "green" }}>{message}</p>
            )}
            {/* step1: make a form */}
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
                    placeholder="enter your password"
                    required
                />
                <button type="submit">Login</button>
                <div className="subHeading">Don't hav an account ? <Link className="link" to="/register"> sign up</Link></div>
                <div className="link">Forget password?</div>
            </form>
        </div>
    )
}
export default Login;