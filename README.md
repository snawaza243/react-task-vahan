# React Task - Vahan

## Overview
This project is a basic headless CMS built using Node.js for the backend and React.js for the frontend. It provides CRUD functionality for dynamically created entities with specified attributes. The backend manages table definitions in a MySQL or PostgreSQL database based on user-defined attributes.

## Features
- **Entity Creation**: Create entities with custom attributes (e.g., name, email, mobile number, date of birth).
- **CRUD Operations**: Perform Create, Read, Update, and Delete operations on these entities from the frontend.
- **Dynamic Table Definition**: Automatically generate table structures in the database based on entity attributes.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Database**: MySQL
- **ORM**: Sequelize

## Installation

### Prerequisites
- Node.js
- npm or yarn
- MySQL

### Steps
1. **Clone the Repository**
    ```bash
    git clone https://github.com/snawaza243/react-task-vahan.git
    cd react-task-vahan
    ```

2. **Backend Setup**
    ```bash
    cd server
    npm install
    ```

3. **Frontend Setup**
    ```bash
    cd client
    npm install
    ```

4. **Database Configuration**
    - Configure your MySQL or PostgreSQL database credentials in `server/config/config.json`.

5. **Run the Application**
    - Start the backend server:
        ```bash
        cd server
        npm start
        ```
    - Start the frontend server:
        ```bash
        cd client
        npm start
        ```

## Usage
1. **Create Entities**: Use the frontend interface to create new entities by specifying their attributes and types.
2. **Perform CRUD Operations**: Manage entries within these entities through the provided UI.

## Project Structure
react-task-vahan/
├── client/       # React frontend
├── server/       # Node.js backend
└── database/     # Database configuration and migration files


## Screenshots
![Home](https://github.com/snawaza243/react-task-vahan/assets/91892524/b51e43f8-a767-41aa-a899-0de07499c795)
![Register](https://github.com/snawaza243/react-task-vahan/assets/91892524/cafc8fd0-e25d-4601-b418-8fc2b3f3cc51)
![Login](https://github.com/snawaza243/react-task-vahan/assets/91892524/63e4ad32-3e9f-4ce0-aae4-6da2f2fe8fa1)
![List](https://github.com/snawaza243/react-task-vahan/assets/91892524/c8d28bec-cc22-40f8-98dc-6a2f4222535b)
![Add entity](https://github.com/snawaza243/react-task-vahan/assets/91892524/7148f408-cb1b-4c1d-9b93-b4bbe49189de)


## Contributing
Feel free to fork this repository and submit pull requests. Contributions are welcome!

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, please reach out to snawaza243@gmail.com.
