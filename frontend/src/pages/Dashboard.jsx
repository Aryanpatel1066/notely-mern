import React, { useState, useEffect } from "react";
import ProfileSection from "./ProfileSection";

function Dashboard() {
     

    return (
        <div>
            {/* <h1>Welcome to your Dashboard, {user.name}!</h1> */}
            <ProfileSection/>
            {/* Other dashboard content */}
        </div>
    );
}

export default Dashboard;
