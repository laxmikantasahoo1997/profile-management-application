Profile Management Application:

A simple React.js application for managing user profiles. Users can create, view, edit, and delete profiles. The project uses Formik for form handling, Yup for validation, and localStorage to store profiles persistently. It is styled with Material-UI for a clean and modern interface.

Features:

Create Profile: Add a new user profile with details like name, email, and age.
View Profiles: See a list of all stored user profiles.
Edit Profile: Update the details of an existing user profile.
Delete Profile: Remove a user profile from the system.
Form Validation: Includes client-side validation for name, email, and optional age fields using Yup.
Routing: Navigation between pages using React Router.
Icons Integration: Uses Material-UI icons for a better user interface.
Technologies Used
Frontend:
React.js
TypeScript
Material-UI
Formik and Yup for form handling and validation
Storage:
localStorage for saving and managing user data
Routing:
React Router for navigation
Setup Instructions

1. Clone the Repository
   https://github.com/laxmikantasahoo1997/profile-management-application.git
   cd profile-management-application

2. Install Dependencies
   npm install

3. Start the Development Server

npm run dev
The application will be available at http://localhost:3000 or the port specified in your environment.

Folder Structure :
plaintext
Copy code
src/
├── components/
│ ├── Form.tsx # Form component for creating/editing profiles
│ ├── Profile.tsx # Profile component to view profiles
│ ├── Header.tsx # Header Component
│ ├── NotFound.tsx # NotFound Component
│ ├── Home.tsx # Default Component
├── context/
│ ├── ProfileContext.tsx # Context for managing global profile state
├── utils/
│ ├── api.ts # Mock API using localStorage
├── App.tsx # Main application file
├── index.tsx # Entry point for the application
Usage
Create a Profile:

Navigate to the "Create" button (represented by the Add icon).
Fill in the name, email, and age fields.
Click Save to create the profile.
View Profiles:

Navigate to the "View" button (represented by the Eye icon).
See a list of all stored profiles.
Edit a Profile:

Click the Edit button for a specific profile.
Modify the profile details and click Save.
Delete a Profile:

Click the Delete button for a specific profile.
Confirm the action to remove the profile.
Environment Variables
The application uses a .env file for environment-specific configuration.

Example .env File:
env

VITE_API_URL=http://localhost:3000
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Commit your changes (git commit -m "Add some feature").
Push the branch (git push origin feature/your-feature-name).
Create a Pull Request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
If you have any questions or suggestions, feel free to reach out:

Author: Laxmikanta Sahoo
Email: laxmikantasahoo1997@gmail.com
