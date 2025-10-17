/**
 * @file contactReadOne.js
 * @description Retrieves a single contact by its ID by handling GET /api/contacts/:id
 */

const express = require("express");
const router = express.Router();
const { getDatabase } = require("../config/database.js");

/**
 * Handles the GET /api/contacts/:id request from the server
 */
router.get("/:id", async (req, res) => {
    try {
        console.log("Retrieving contact");

        // Get the contact id
        const { id } = req.params;

        // Get the database instance
        const db = getDatabase();

        // Retrieve contact based on id
        const contact = await db.get("SELECT * FROM contacts WHERE id = ?", [id]);

        // If not found, return error
        if(!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        // Send back the successful response
        res.status(200).json(contact);

        console.log("Contact retrieved successfully");
    } catch(error) {
        console.error("Error retrieving contact: ", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
