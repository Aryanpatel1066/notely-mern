import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:2810",
    headers: {
        "Content-Type": "application/json",
    },
    //  // Adjust the base URL as needed
});

export default api;
