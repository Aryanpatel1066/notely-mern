import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import userProfile from "../assets/userProfile.png"
function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Retrieve user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // ✅ Redirect if not logged in
    }
  }, [navigate]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        {/* ✅ Profile Picture Section */}
        {/* <FaUserCircle className="text-gray-500 text-6xl mx-auto mb-2" /> */}
            <img className="w-24 h-24 mx-auto rounded-full border-4 border-gray-300 shadow-md object-cover" src={userProfile} alt="profile image" />
        <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
        {user ? (
          <>
            <p className="text-lg text-gray-700 mt-2">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-lg text-gray-700 mt-1">
              <strong>Email:</strong> {user.email}
            </p>
            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-500 mt-4">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
