# Todo App Backend

The RESTful API powering a full-stack todo application, built with Node.js, Express.js, and MongoDB.

## Description

This backend provides a robust foundation for the following frontend features:

* **Secure User Authentication:** 
    * Registration with password hashing and salting.
    * Login with cookie-based session management.
    * Password reset functionality.

* **Comprehensive Todo API Endpoints:**
    * **Create (POST):** Add new todos.
    * **Read (GET):**  Retrieve todo lists associated with an authenticated user.
    * **Update (PUT):**  Edit existing todo details.
    * **Delete (DELETE):** Remove todos.

## Technologies

* **Node.js:**  Runtime environment for JavaScript.
* **Express.js:**  Web application framework.
* **MongoDB:** NoSQL database for flexible data storage.
* **bcrypt:** Library for secure password hashing.
* **jsonwebtoken:** Library for generating and managing JSON Web Tokens (JWTs) used in authentication.
* **cookie-parser** Middleware for handling cookies.
