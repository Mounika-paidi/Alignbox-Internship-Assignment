# Alignbox Internship Assignment

A full-stack chat application built as a submission for the Alignbox internship assignment. This project demonstrates the ability to create a functional and responsive chat user interface with a robust back-end for data persistence.

### Features

* **Functional Chat Interface:** A clean and modern UI that allows users to send and receive messages.
* **Persistent Storage:** All chat messages are stored in a MySQL database, ensuring data is not lost on page refresh.
* **Sent/Received Message Styling:** Messages are dynamically styled and aligned based on the sender to provide a clear conversational view.
* **Incognito Mode:** A user-friendly toggle that allows a user to send messages anonymously.
* **Backend API:** A RESTful API built with Node.js and Express to handle message creation and retrieval.

---

### Technologies Used

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MySQL

---

### Setup and Installation

Follow these steps to get the project up and running on your local machine.

#### 1. Prerequisites

Make sure you have the following installed:
* [Node.js](https://nodejs.org/) and npm
* [MySQL](https://www.mysql.com/)

#### 2. Database Setup

Open your MySQL client and run the following commands to create the database and the messages table:

```sql
CREATE DATABASE chat_db;
USE chat_db;

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(255) NOT NULL,
    message_text TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

#### 4. Configuration
```Open the server.js file and update the MySQL connection details with your local credentials.

const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_mysql_username', // Replace with your username
    password: 'your_mysql_password', // Replace with your password
    database: 'chat_db'
});


#### 5. Run the Application
```Start the server using nodemon:

npx nodemon server.js


Now, open your web browser and navigate to http://localhost:3000 to view the application.
