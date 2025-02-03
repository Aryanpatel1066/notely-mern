const express = require('express');
const app = express();
const server_config = require("./configs/server.config");
const db_config = require('./configs/db.config');
const mongoose = require('mongoose');
const user_model = require('./models/user.model');
const bcrypt = require('bcryptjs');
const cors = require('cors');

// CORS configuration with explicit settings
const corsOptions = {
    origin: "http://localhost:5173",  
    methods: ["GET", "POST", "PUT", "DELETE"],   
    allowedHeaders: ["Content-Type", "Authorization"],  // Allow the required headers
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to the database
mongoose.connect(db_config.db_url);
const db = mongoose.connection;
db.on('error', () => {
    console.log("Error while connecting to the database");
});
db.once('open', () => {
    console.log("Database connected successfully...");
 });
 

// Basic route to test the backend
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Import routes
require("./routes/auth.route")(app);
require("./routes/todo.route")(app);

// Handle preflight requests (OPTIONS requests)
app.options('*', cors(corsOptions));  // Allow preflight requests globally

// Start the server
app.listen(server_config.server_port, () => {
    console.log("Server started at port:", server_config.server_port);
});
