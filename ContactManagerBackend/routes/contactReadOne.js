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

        const db = getDatabase();
        const { id } = req.params;      

        // Retrieve contact based on id and return error if not found
        const contact = await db.get("SELECT * FROM contacts WHERE id = ?", [id]);
        if(!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        res.status(200).json(contact);

        console.log("Contact retrieved");
    } catch(error) {
        console.error("Error retrieving contact: ", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
