# ☎️ Simple Contact Manager

## Brief Overview

A simple contact manager where you can view all your contacts, add, edit, and delete a contact

## Technology Choices

- Backend: Node.js with Express
- Database: SQLite
- Frontend: React with Tailwind CSS

## How to setup and run the project?

1. Clone this repository to your local computer
2. In the IDE you use (e.g., VSCode), run command prompt in split terminal
3. For backend terminal, run these lines:
   - cd contact-manager-backend
   - npm install
   - node server.js
4. For frontend terminal, run these lines:
   - cd contact-manager-frontend
   - npm install
   - npm run build
   - npm start
5. Finally, open the web application here: http://localhost:5000/

## Challenges

- After building the backend, I started working on the frontend. I initially kept both in one folder but later separated them for better structure. Each CRUD operation was placed in its own file to keep the project organized
- I initially wanted the Edit screen to appear on the right side of the page, similar to how the Add Contact form works. However, due to a state synchronization issue caused by React’s useEffect running only once across multiple components, the edit form kept displaying the wrong contact which is often the last one in the list. After identifying that this was happening because of how data was being passed between components in a Single Page Application setup, I decided to change the approach. Instead of opening a separate edit screen, I made the contact editable directly within its own row in the contact list. This solution kept the UI simple and made editing more seamless for users
