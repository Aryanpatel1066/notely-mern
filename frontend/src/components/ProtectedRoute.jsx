import { Navigate } from "react-router-dom"; // ✅ Add this import

const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User in ProtectedRoute:", user);

    if (!user) {
        console.log("No user found in localStorage.");
        return <Navigate to="/" />;
    }

    if (user.expiresAt <= Date.now()) {
        console.log("Token expired. Logging out.");
        localStorage.clear();
        return <Navigate to="/" />;
    }

    console.log("Token valid. Proceeding to Dashboard.");
    return children;
};

export default ProtectedRoute;
