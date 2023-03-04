import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Home = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get('http://localhost:5000/books')
                setBooks(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllBooks()
    }, [books])

    return (
        <>
            <h1>Gaurav's Book Shop</h1>
            <div className="books">
                {books.map(book => (
                    <div className="book" key={book.id} >
                        {book.cover && <img src={book.cover} alt="bookimg" />}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>{book.price}</span>
                    </div>
                ))}
            </div>
            <button> <Link to="/add" > Add new book </Link> </button>

        </>
    )
}

export default Home