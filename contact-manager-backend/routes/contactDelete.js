/**
 * @file contactDelete.js
 * @description Deletes a contact by its ID by handling DELETE /api/contacts/:id
 */

const express = require("express");
const router = express.Router();
const { getDatabase } = require("../config/database.js");

/**
 * Handles the DELETE /api/contacts/:id request from the server
 */
router.delete("/:id", async (req, res) => {
    try {
        console.log("Deleting contact");

        const db = getDatabase();
        const { id } = req.params;

        // Retrieve contact based on id to check if it exists
        const contact = await db.get("SELECT * FROM contacts WHERE id = ?", [id]);
        if(!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        // Delete the contact
        await db.run("DELETE FROM contacts WHERE id = ?", [id]);

        res.status(200).json({ message: "Contact deleted" });

        console.log("Contact deleted");
    } catch(error) {
        console.error("Error deleting contact: ", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
