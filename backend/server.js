const express = require("express")
const app = express()
const mysql = require("mysql")
const dotenv = require("dotenv").config()
const cors = require('cors')

app.use(express.json())
app.use(cors())
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: "test"
})
con.connect(function (err) {
    if (err) throw err;
    console.log("MYSQL Connected!");
});

app.get('/books', (req, res) => {
    const q = "SELECT * FROM books"
    con.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post('/books', (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover]
    con.query(q, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "Book added to database", id: result.insertId });
    });
});


app.listen(5000, () => {
    console.log("Listening on port 5000")
})



