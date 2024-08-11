import React, { useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';

function FindProduct() {
    const [searchId, setSearchId] = useState('');
    const [productData, setProductData] = useState(null);
    const [error, setError] = useState(null);

    const fetchProduct = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/products/${id}`);
            if (response.data) {
                setProductData(response.data);
                setError(null);
            } else {
                setError('Error: Product Not Found');
            }
        } catch (error) {
            console.error('Error:', error.response.data);
            setProductData(null);
            setError('Error: Product Not Found');
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        if (searchId) {
            await fetchProduct(searchId);
        }
    };

    return (
        <div>
            <NavBar />
            <form onSubmit={handleSearch}>
                <label>
                    Search Product by ID:
                    <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                </label>
                <button type="submit">Search</button>
            </form>
            {productData ? (
                <div>
                    <h2>Product Details</h2>
                    <p>Name: {productData.name}</p>
                    <p>Price: {productData.price}</p>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : null}
        </div>
    );
}

export default FindProduct;