import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');

    const navigate = useNavigate()

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Submit the form data using Axios or any other HTTP client library
        try {
            await axios.post("http://localhost:5000/books", { title, desc: description, cover: image, price })
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='radha' >
            <h1>Add a Book</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <textarea id="description" value={description} onChange={handleDescriptionChange}></textarea>
                </div>
                <div>
                    <label htmlFor="image">Image URL: </label>
                    <input type="text" id="image" value={image} onChange={handleImageChange} />
                </div>
                <div>
                    <label htmlFor="price">Price: </label>
                    <input type="number" id="price" value={price} onChange={handlePriceChange} />
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default Add;
