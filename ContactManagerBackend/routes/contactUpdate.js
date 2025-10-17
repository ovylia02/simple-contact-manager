/**
 * @file contactUpdate.js
 * @description Updates an existing contact by handling PUT /api/contacts/:id
 */

const express = require("express");
const router = express.Router();
const { getDatabase } = require("../config/database.js");

/**
 * Handles the PUT /api/contacts/:id request from the server
 */
router.put("/:id", async (req, res) => {
    try {
        console.log("Updating contact");

        // Get the parameters
        const { id } = req.params;
        const { name, email, phone } = req.body;

        // Get the database instance
        const db = getDatabase();

        // Check if such contact id exists in database
        const existingContact = await db.get("SELECT * FROM contacts WHERE id = ?", [id]);
        if(!existingContact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        // Validate the email format (e.g., example@mail.com, example@mail.co.id)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email && !emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Newly updated values, if not being updated, stay same
        const newName = name ?? existingContact.name;
        const newEmail = email ?? existingContact.email;
        const newPhone = phone ?? existingContact.phone;

        // Update the contact
        await db.run(
            "UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?",
            [newName, newEmail, newPhone, id]
        );

        // Retrieve updated contact
        const contact = await db.get("SELECT * FROM contacts WHERE id = ?", [id]);

        // Send back the successful response
        res.status(200).json(contact);

        console.log("Successfully updated contact");
    } catch(error) {
        console.error("Error updating contact: ", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
