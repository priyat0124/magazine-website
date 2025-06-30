# magazine-website
This is a full-stack magazine website where users can upload, view, and manage digital magazine files (PDFs/images) by category. It is built using ReactJS (Vite) for the frontend and Node.js + Express + MongoDB for the backend.

🌐 Frontend (React + Vite):
Homepage Layout:
Logo and site title at the top.
Sidebar with two main categories: Tamil and English.
Subcategories under each: Safety, Society, Education.
Animated welcome message at the center.
Right panel with buttons to upload and view magazines.

Upload Magazine:
User selects a category (e.g., English-Safety) and uploads a file.
Adds a custom title for the magazine.
Displays a success message after upload.
Only allows PDF or image files.

View Magazines:
On clicking View, user sees two buttons:
User View: Directly views all magazines.
Owner View: Requires password (must be alphanumeric, min 6 chars).

Owner View Features:
Can delete magazine files.
Files deleted are removed from the database and file system.
User View: Can view all magazines without editing rights.

Category View:
Files are listed based on their category (e.g., Tamil-Society).
Each file is shown by its custom title with a view link.

Styling:
Custom CSS animation on homepage.
Buttons are compact and well-styled.
Responsive design with clean layout.

🛠️ Backend (Node.js + Express + MongoDB):
Multer Integration for file uploads.
Files are stored in the uploads/ folder and saved in MongoDB with:
title, category, filePath, and upload date.

API Endpoints:
POST /api/magazines – Upload new magazine.
GET /api/magazines – Fetch all or category-wise magazines.
DELETE /api/magazines/:id – Owner deletes a magazine.

🔐 Authentication:
Owner access requires a password (e.g., "admin123").
Password must meet the format: at least 6 characters, contains letters and numbers.
