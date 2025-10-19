/**
 * @file ContactAdd.js
 * @description Defines component to add a new contact on the application
 */

import React from "react";

/**
 * Defines all structure and calls the API endpoint to add a new contact
 * @returns Add contact component
 */
function ContactAdd() {
    // When user clicks submit, POST method from backend is called
    const handleSubmit = async (e) => {
        // Prevent reloading during submission process
        e.preventDefault();

        // Form input values
        const form = e.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();

        // Validate that name, email, phone are present
        if(!name || !email || !phone) {
            alert("Name, email, and phone are required");
            return;
        }

        // Validate the email format (e.g., example@mail.com, example@mail.co.id)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            alert("Invalid email format");
            return;
        }

        // Send this new contact to backend
        const newContact = { name, email, phone };
        try {
            // Create the new contact from the API endpoint POST /api/contacts
            const result = await fetch("/api/contacts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newContact)
            });
            const data = await result.json();

            // If the server returned an error
            if(!result.ok) {
                alert(data.error || "Failed to create contact");
                return;
            }

            // Close the Add Contact screen and refresh
            showPanel("empty-panel");
            window.location.reload();
        } catch(error) {
            console.error("Error adding contact: ", error);
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
        <div className="h-full flex flex-col justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="w-4/5 flex flex-col gap-4 p-6 border rounded-xl shadow-md bg-gray-50"
            >
                <h2 className="text-xl font-semibold mb-2">Add a new contact</h2>

                {/* Input fields for name, email, phone */}
                <input
                    name="name"
                    placeholder="Name"
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    name="phone"
                    placeholder="Phone"
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Form buttons */}
                <div className="flex justify-between mt-4">
                    {/* Cancel button */}
                    <button
                        type="button"
                        onClick={ () => showPanel("empty-panel") }
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
                    >
                        Cancel
                    </button>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ContactAdd;
