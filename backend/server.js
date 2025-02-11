// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const cors = require('cors');
// const server_config = require("./configs/server.config");
// const db_config = require('./configs/db.config');
// const user_model = require('./models/user.model');

// const app = express();

// // CORS configuration with explicit settings
// const corsOptions = {
//     origin: "https://your-frontend-url.com" ,  
//     methods: ["GET", "POST", "PUT", "DELETE"],   
//     allowedHeaders: ["Content-Type", "Authorization"],  
// };

// // Apply CORS middleware globally
// app.use(cors(corsOptions));

// // Middleware to parse JSON bodies
// app.use(express.json());

// // ✅ Improved MongoDB Connection with TLS Fix
// mongoose.connect(db_config.db_url, {
     
//     tls: true,  // ✅ Ensure TLS is enabled
//     tlsAllowInvalidCertificates: true // ✅ Add this if SSL errors persist
// })
// .then(() => console.log("✅ Database connected successfully..."))
// .catch(err => console.error("❌ Database Connection Error:", err));

// // Basic route to test the backend
// app.get("/", (req, res) => {
//     res.send("✅ Backend is running successfully!");
// });

// // Import routes
// require("./routes/auth.route")(app);
// require("./routes/todo.route")(app);
// require("./routes/email.route")(app);

// // Handle preflight requests (OPTIONS requests)
// app.options('*', cors(corsOptions));

// // Start the server
// app.listen(server_config.server_port, () => {
//     console.log(`🚀 Server started at port: ${server_config.server_port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const server_config = require("./configs/server.config");
const db_config = require('./configs/db.config');
const user_model = require('./models/user.model');

const app = express();

// CORS configuration with explicit settings
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ['https://notely-mern.vercel.app', 'http://localhost:5173'];  // Add other origins if needed
        if (allowedOrigins.includes(origin)) {
            callback(null, true);  // Allow the origin
        } else {
            callback(new Error('CORS policy not satisfied'), false);  // Reject the origin
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],   
    allowedHeaders: ["Content-Type", "Authorization"],  
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// ✅ Improved MongoDB Connection with TLS Fix
mongoose.connect(db_config.db_url, {
    tls: true,  // ✅ Ensure TLS is enabled
    tlsAllowInvalidCertificates: true // ✅ Add this if SSL errors persist
})
.then(() => console.log("✅ Database connected successfully..."))
.catch(err => console.error("❌ Database Connection Error:", err));

// Basic route to test the backend
app.get("/", (req, res) => {
    res.send("✅ Backend is running successfully!");
});

// Import routes
require("./routes/auth.route")(app);
require("./routes/todo.route")(app);
require("./routes/email.route")(app);

// Handle preflight requests (OPTIONS requests)
app.options('*', cors(corsOptions));

// Start the server
app.listen(server_config.server_port, () => {
    console.log(`🚀 Server started at port: ${server_config.server_port}`);
});

