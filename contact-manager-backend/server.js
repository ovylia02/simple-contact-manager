/**
 * @file server.js
 * @description Entry point for Express server
 */

const express = require("express");
const path = require("path");
const { initDatabase } = require("./config/database.js");
const contactCreate = require("./routes/contactCreate.js");
const contactReadAll = require("./routes/contactReadAll.js");
const contactReadOne = require("./routes/contactReadOne.js");
const contactUpdate = require("./routes/contactUpdate.js");
const contactDelete = require("./routes/contactDelete.js");

const app = express();
app.use(express.json());

/**
 * Start the Express server while initialising database and connects to port 5000
 */
async function startServer() {
    console.log("SERVER => start");

    // Initialise database
    await initDatabase();

    // Route the API Endpoints
    const address = "/api/contacts";
    app.use(address, contactCreate); // POST /api/contacts
    app.use(address, contactReadAll); // GET /api/contacts
    app.use(address, contactReadOne); // GET /api/contacts/:id
    app.use(address, contactUpdate); // PUT /api/contacts/:id
    app.use(address, contactDelete); // DELETE /api/contacts/:id

    // Connect to React
    app.use(express.static(path.join(__dirname, '../contact-manager-frontend/build')));
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, '../contact-manager-frontend/build', 'index.html'));
    });

    // Connect to port (http://localhost:5000/)
    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    console.log("SERVER => end");
}

// Start server and check if server failed to start
startServer().catch((err) => {
    console.error("Failed to start server: ", err);
});
