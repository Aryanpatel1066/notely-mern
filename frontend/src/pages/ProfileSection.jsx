import React, { useState, useEffect } from "react";

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
        <div>
            <h2>Welcome, {userName || "Guest"}!</h2>
        </div>
    );
}

export default ProfileSection;
