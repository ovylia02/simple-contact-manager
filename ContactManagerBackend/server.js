/**
 * @file server.js
 * @description Entry point for Express server
 */

const express = require("express");
const { initDatabase } = require("./config/database.js");
const contactCreate = require("./routes/contactCreate.js");

// Initialises Express app
const app = express();
app.use(express.json());

/**
 * Start the Express server while initialising database and connects to port 5000
 */
async function startServer() {
    console.log("Starting server");

    // Initialise database
    await initDatabase();

    // Test if route works properly (server connected)
    app.get("/", (req, res) => {
        res.send("Simple Contact Manager");
    });

    // Route the API Endpoints
    app.use("/api/contacts", contactCreate); // POST /api/contacts

    // Connect to port (http://localhost:5000/)
    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    console.log("Server has started");
}

// Start server and check if server failed to start
startServer().catch((err) => {
    console.error("Failed to start server: ", err);
});
