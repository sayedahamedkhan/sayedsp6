const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "usersdb",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to the database");
});

app.use(cors());
app.use(bodyParser.json());

app.post("/signup", (req, res) => {
    const { username, email, password, phone } = req.body;
    const query = "INSERT INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)";

    db.query(query, [username, email, password, phone], (err) => {
        if (err) {
            console.error("Error inserting user:", err);
            res.status(500).send({ message: "Error signing up." });
            return;
        }
        res.send({ message: "Sign Up Successful!" });
    });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";

    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error("Error logging in:", err);
            res.status(500).send({ message: "Error logging in." });
            return;
        }
        if (results.length > 0) {
            res.send({ user: results[0] });
        } else {
            res.status(401).send({ message: "Invalid username or password." });
        }
    });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));













