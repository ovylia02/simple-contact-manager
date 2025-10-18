/**
 * @file database.js
 * @description Initializes SQLite database connection and creates the Contacts table
 */

const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let db;

/**
 * Initialize database and create Contacts table
 */
async function initDatabase() {
    console.log("DATABASE => start");

    // The rest of the code will run only when database successfully initialized
    db = await open({
        filename: "./contacts.db",
        driver: sqlite3.Database
    });

    // Create Contacts table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log("DATABASE => end");
}

/**
 * Get the database instance
 * @returns {sqlite3.Database} The database instance
 */
function getDatabase() {
    if(!db) throw new Error("Database not found");
    return db;
}

module.exports = { initDatabase, getDatabase };
