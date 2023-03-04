const express = require("express")
const app = express()
const mysql = require("mysql")
app.use(express.json())

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bank8848@12345678",
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



