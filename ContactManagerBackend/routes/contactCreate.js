/**
 * @file contactCreate.js
 * @description Creates a new contact by handling POST /api/contacts
 */

const express = require("express");
const router = express.Router();
const { getDatabase } = require("../config/database.js");

/**
 * Handles the POST /api/contacts request from the server
 */
router.post("/", async (req, res) => {
    try {
        console.log("Creating contact");

        const db = getDatabase();
        const { name, email, phone } = req.body;

        // Validate that name, email, phone are present
        if(!name || !email || !phone) {
            return res.status(400).json({ error: "Name, email, and phone are required" });
        }

        // Validate the email format (e.g., example@mail.com, example@mail.co.id)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Insert the new contact into database
        const result = await db.run(
            `INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)`,
            [name, email, phone]
        );

        // Respond with newly created contact object
        const contact = await db.get(
            `SELECT * FROM contacts WHERE id = ?`,
            [result.lastID]
        );

        res.status(201).json(contact);

        console.log("Contact created");
    } catch(error) {
        console.error("Error creating contact: ", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
