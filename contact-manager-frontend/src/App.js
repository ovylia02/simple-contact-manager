/**
 * @file App.js
 * @description React file consisting of components for the SPA
 */

import React from "react";
import ContactList from "./components/ContactList";
import ContactAdd from "./components/ContactAdd";

/**
 * Returns the application which consists of required components
 * @returns HTML application consisting of components
 */
function App() {
  return (
    <div className="h-screen flex bg-gray-50 text-gray-800">
      <div className="w-2/3 border-r border-gray-300">
        <ContactList />
      </div>
      
      <div className="w-1/3 relative">
        <div id="empty-panel" className="absolute inset-0 flex items-center justify-center">
          <p>Nothing to display yet</p>
        </div>

        <div id="add-panel" className="hidden absolute inset-0">
          <ContactAdd />
        </div>
      </div>
    </div>
  );
}

export default App;
