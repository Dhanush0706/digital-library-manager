# Digital Library Manager

An online digital library manager built with Node.js and Express, allowing users to upload, categorize, search, and download digital books through a simple web interface.

---

## Table of Contents

1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Prerequisites](#prerequisites)  
4. [Installation & Setup](#installation--setup)  
5. [Project Structure](#project-structure)  
6. [Usage](#usage)  
   - [Running the Server](#running-the-server)  
   - [Interacting via the Frontend](#interacting-via-the-frontend)  
7. [Folder-by-Folder Breakdown](#folder-by-folder-breakdown)  
8. [Contributing](#contributing)  
9. [License](#license)

---

## Features

- **Upload Books**  
  - Admin or authenticated users can upload new books (PDF, EPUB, etc.) into the library.  
  - Each book can be assigned metadata: title, author, category, description, and cover image.

- **Categorization & Browsing**  
  - Browse all books by category or view all at once.  
  - Categories are maintained in the database (e.g., Fiction, Non-Fiction, Science, Technology, etc.).

- **Search & Filter**  
  - Search for books by title, author, or category.  
  - Filter results by category or sort alphabetically.

- **Download & Access**  
  - View a list of available books in each category.  
  - Download the chosen book directly from the browser.

- **File Storage**  
  - All uploaded book files (and cover images) are stored under the `uploads/` directory.  
  - File names and directory structure ensure no conflicts and support easy retrieval.

- **RESTful API Endpoints**  
  - Backend exposes routes (e.g., `/books`, `/categories`) for CRUD operations.  
  - Makes it easy to extend functionality or connect a different frontend later.

---

## Technologies Used

- **Node.js** (v14 or higher)  
- **Express.js** (v4.x)  
- **MongoDB** (via Mongoose)  
- **Multer** (for handling file uploads)  
- **EJS / HTML / CSS / Bootstrap** (for the frontend under `frontend/`)  
- **JavaScript** (ES6) on both client and server sides  

---

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (download from [nodejs.org](https://nodejs.org/en/))  
2. **npm** (comes bundled with Node.js)  
3. **MongoDB** (either local installation or a cloud-hosted instance like MongoDB Atlas)  
4. (Optional) **Git** (if you plan to clone via SSH/HTTPS)

---

## Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Dhanush0706/digital-library-manager.git
   cd digital-library-manager
