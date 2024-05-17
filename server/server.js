import express from "express";
import mysql from 'mysql';
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config()

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const secretKey = "sam123";

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, data) => {
        if (err) return res.json({ Message: "Server side error" });
        if (data.length > 0) {
            const name = data[0].username;
            const userId = data[0].id; // Get user ID
            const token = jwt.sign({ name, userId }, secretKey, { expiresIn: '1d' });
            res.cookie('token', token, { httpOnly: true });
            return res.json({ Status: "LoginSuccess", name });
        } else {
            return res.json({ Message: "No records exist" });
        }
    });
});

// Logout route
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "LogoutSuccess" });
});

// Middleware to verify user
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Message: "" });
    } else {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.json({ Message: "Token is invalid." });
            } else {
                req.name = decoded.name;
                req.userId = decoded.userId; // Get user ID from token
                next();
            }
        });
    }
};

// Home route with verification
app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name, userId: req.userId });
});

// Registration route
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(insertUserQuery, [username, email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error" });
        }
        res.status(201).json({ message: "User registered successfully" });
    });
});

// Route to fetch user-specific entities
app.get('/entities', verifyUser, (req, res) => {
    const userId = req.userId;
    const sql = 'SELECT * FROM entities WHERE user_id = ?';
    db.query(sql, [userId], (err, data) => {
        if (err) return res.json({ Message: "Server side error" });
        return res.json(data);
    });
});


// Route to add a new entity
app.post('/entity', verifyUser, (req, res) => {
    const { name, email, mobile, dob } = req.body;
    const userId = req.userId;
    const insertEntityQuery = 'INSERT INTO entities (name, email, mobile, dob, user_id) VALUES (?, ?, ?, ?, ?)';
    db.query(insertEntityQuery, [name, email, mobile, dob, userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error" });
        }
        res.status(201).json({ message: "Entity added successfully" });
    });
});


// Route to delete an entity
app.delete('/entity/:id', verifyUser, (req, res) => {
    const entityId = req.params.id;
    const sql = 'DELETE FROM entities WHERE id = ? AND user_id = ?';
    db.query(sql, [entityId, req.userId], (err, result) => {
        if (err) return res.json({ Message: "Server side error" });
        return res.json({ Message: "Entity deleted successfully" });
    });
});

// Route to update an entity
app.put('/entity/:id', verifyUser, (req, res) => {
    const entityId = req.params.id;
    const { name, email, mobile, dob } = req.body;
    const sql = 'UPDATE entities SET name = ?, email = ?, mobile = ?, dob = ? WHERE id = ? AND user_id = ?';
    db.query(sql, [name, email, mobile, dob, entityId, req.userId], (err, result) => {
        if (err) return res.json({ Message: "Server side error" });
        return res.json({ Message: "Entity updated successfully" });
    });
});

// Route to fetch pre-existing data of an entity while editing
// app.get('/existing/:id', verifyUser, (req, res) => {
//     const entityId = req.params.id; // Get the entity ID from the request parameters
//     const sql = 'SELECT * FROM entities WHERE id = ?';
//     db.query(sql, [entityId], (err, data) => {
//         if (err) return res.json({ Message: "Server side error" });
//         return res.json(data[0]); // Assuming only one entity is returned
//     });
// });




// Start the server
const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
