/**
 * @file ContactList.js
 * @description Defines component to view all contacts on the application
 */

import React from "react";
import { useEffect, useState } from "react";

/**
 * Defines all structure and calls the API endpoint to view all contacts
 * @returns Contact list component
 */
function ContactList() {
  // Automatically updates the list when changed, and fetch contacts when component is laoded
  const [contacts, setContacts] = useState([]);
  useEffect(() => { fetchContacts(); }, []);

  // Fetch all contacts from the backend API endpoint GET /api/contacts
  const fetchContacts = async () => {
    try {
      const result = await fetch("/api/contacts");
      const data = await result.json();
      setContacts(data);
    } catch(error) {
      console.error("Error fetching contacts: ", error);
    }
  };

  // For the UI panels on the right, hide and display
  const showPanel = (panelId) => {
    document.querySelectorAll("#empty-panel, #add-panel, #edit-panel", "detail-panel").forEach(el => {
      el.classList.add("hidden");
    });
    document.getElementById(panelId).classList.remove("hidden");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-semibold">My Contacts</h1>
        {/* Add button to display ContactAdd */}
        <button
          onClick={ () => showPanel("add-panel") }
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          Add +
        </button>
      </div>

      {/* Contacts table header */}
      <div className="grid grid-cols-4 px-6 py-2 text-sm font-semibold border-b border-gray-300">
        <span>Name</span>
        <span>Email</span>
        <span>Phone</span>
        <span className="text-center">Edit / Delete</span>
      </div>

      {/* Contacts table */}
      <div className="flex-1 overflow-y-auto px-6 py-2">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="grid grid-cols-4 items-center py-2 border-b border-gray-200 hover:bg-gray-50"
            >
              {/* Click name to display ContactDetail */}
              <span
                onClick={() => {
                  // Temporarily save clicked contact
                  localStorage.setItem("selectedContact", JSON.stringify(contact));
                  showPanel("detail-panel");
                }}
                className="cursor-pointer font-medium text-blue-600 hover:underline"
              >
                {contact.name}
              </span>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>

              <div className="flex justify-center gap-4">
                <button className="text-gray-400 cursor-default">✏️</button>
                <button className="text-gray-400 cursor-default">🗑️</button>
              </div>
            </div>
          ))
        ) : (
          /* If contact list is empty */
          <div className="text-center text-gray-500 py-10">No contacts found</div>
        )}
      </div>
    </div>
  );
}

export default ContactList;
