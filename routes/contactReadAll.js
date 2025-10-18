/**
 * @file contactReadAll.js
 * @description Retrieves a list of all contacts by handling GET /api/contacts
 */

const express = require("express");
const router = express.Router();
const { getDatabase } = require("../config/database.js");

/**
 * Handles the GET /api/contacts request from the server
 */
router.get("/", async (req, res) => {
    try {
        console.log("Retrieving all contacts");

        const db = getDatabase();

        // Retrieve all contacts from database
        const contacts = await db.all("SELECT * FROM contacts");

        res.status(200).json(contacts);

        console.log("All contacts retrieved");
    } catch(error) {
        console.error("Error retrieving all contacts: ", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
