import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
    const [book, setBook] = useState({
        title: '',
        desc: '',
        cover: '',
        price: ''
    });

    const navigate = useNavigate();
    const location = useLocation();

    const handleTitleChange = (e) => {
        setBook({ ...book, title: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        setBook({ ...book, desc: e.target.value });
    };

    const handleImageChange = (e) => {
        setBook({ ...book, cover: e.target.value });
    };

    const handlePriceChange = (e) => {
        setBook({ ...book, price: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bookId = location.pathname.split("/")[2];
            const response = await axios.put(`http://localhost:5000/books/${bookId}/update`, book);
            console.log(response.data);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookId = location.pathname.split("/")[2];
                const response = await axios.get(`http://localhost:5000/books/${bookId}`);
                setBook(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [location]);

    return (
        <div className='radha'>
            <h1  >Update Book </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" value={book.title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <textarea id="description" value={book.desc} onChange={handleDescriptionChange}></textarea>
                </div>
                <div>
                    <label htmlFor="image">Image URL: </label>
                    <input type="text" id="image" value={book.cover} onChange={handleImageChange} />
                </div>
                <div>
                    <label htmlFor="price">Price: </label>
                    <input type="number" id="price" value={book.price} onChange={handlePriceChange} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Update;
