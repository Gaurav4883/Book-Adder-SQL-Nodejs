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
app.get(`/books/:id`, (req, res) => {
    const bookId = req.params.id;
    const q = "SELECT * FROM books WHERE id=?"
    con.query(q, [bookId], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error retrieving book from database");
        } else if (results.length === 0) {
            res.status(404).send(`Book with ID ${bookId} not found`);
        } else {
            const book = results[0];
            res.status(200).json(book);
        }
    })
});


app.post('/books', (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`,`price`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ]
    con.query(q, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "Book added to database", id: result.insertId });
    });
});

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id= ?"
    con.query(q, [bookId], (error, result) => {
        if (error) return res.json(error)
        else return res.json({ message: `Book with ID ${bookId} deleted from database`, rowsAffected: result.affectedRows })
    })
})

app.put("/books/:id/update", (req, res) => {
    const bookId = req.params.id;
    const { title, desc, cover, price } = req.body;
    const q = "UPDATE books SET `title`=?, `desc`=?, `cover`=?,`price`=? WHERE id=? "
    con.query(q, [title, desc, cover, price, bookId], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: `Book with ID ${bookId} updated`, rowsAffected: result.affectedRows })
    })


})

app.listen(5000, () => {
    console.log("Listening on port 5000")
})



