/**
 * @file ContactList.js
 * @description Defines component to view all contacts, edit a contact, and delete a contact on the application
 */

import React from "react";
import { useEffect, useState } from "react";

/**
 * Defines all structure and calls the API endpoint to view all contacts, edit contact, delete contact
 * @returns Contact list component
 */
function ContactList() {
  // Get all contacts from backend
  const [contacts, setContacts] = useState([]);
  // Contact currently being edited and setup edit data
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "" });
  // Fetch all contacts when component rendered
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

  // When edit is triggered for a contact
  const handleEdit = (contact) => {
    setEditId(contact.id);
    setEditForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  };

  // When user cancels editing, reset it all
  const handleEditCancel = () => {
    setEditId(null);
    setEditForm({ name: "", email: "", phone: "" });
  };

  // When user clicks Save after editing
  const handleEditSave = async (id) => {
    try {
      // Validate that name, email, phone are present
      if(!editForm.name || !editForm.email || !editForm.phone) {
        alert("Name, email, and phone are required");
        return;
      }

      // Validate the email format (e.g., example@mail.com, example@mail.co.id)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(editForm.email)) {
        alert("Invalid email format");
        return;
      }

      // Fetch PUT /api/contacts/:id
      const result = await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm)
      });
      const data = await result.json();

      // In case of backend error
      if(!result.ok) {
        alert(data.error || "Failed to update contact");
        return;
      }

      // Refresh list with updated contacts, and setEditId back to null
      setEditId(null);
      fetchContacts();
    } catch(error) {
      console.error("Error updating contact: ", error);
    }
  };

  // When user clicks Delete button for a contact
  const handleDelete = async (id) => {
    try {
      const result = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      if(result.ok) {
        alert("Contact deleted");
        fetchContacts();
      } else {
        alert("Failed to delete contact");
      }
    } catch(error) {
      console.error("Error deleting contact: ", error);
    }
  };

  // For the UI panels on the right, hide and display
  const showPanel = (panelId) => {
    document.querySelectorAll("#empty-panel, #add-panel").forEach(el => {
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
              {editId == contact.id ? (
                <>
                  {/* Edit mode */}
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="p-1 border rounded-md"
                  />

                  <input
                    type="text"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className="p-1 border rounded-md"
                  />

                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value })
                    }
                    className="p-1 border rounded-md"
                  />

                  <div className="flex justify-center gap-3">
                    {/* Edit save button */}
                    <button
                      onClick={() => handleEditSave(contact.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition"
                    >
                      Save
                    </button>

                    {/* Edit cancel button */}
                    <button
                      onClick={handleEditCancel}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-md transition"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Normal contact viewing mode */}
                  <span>{contact.name}</span>
                  <span>{contact.email}</span>
                  <span>{contact.phone}</span>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(contact)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            No contacts found
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactList;
