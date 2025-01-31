import React, { useState, useEffect } from "react";
import "./ProfileSection.css";

function ProfileSection() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.expiresAt > Date.now()) {
            setUserName(user.name);
        } else {
            localStorage.clear();
            window.location.href = "/";
        }
    }, []);

    return (
        <div className="upperProfileSection">
            <div className="updateProfilePicture">
                <i className="fas fa-edit"></i>
            </div>
            <h2>Welcome, {userName || "Guest"}!</h2>
        </div>
    );
}

export default ProfileSection;
 