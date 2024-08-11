import React, { useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';

function FindOrder() {
    const [searchId, setSearchId] = useState('');
    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState(null);

    const fetchOrder = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/orders/${id}`);
            if (response.data) {
                setOrderData(response.data);
                setError(null);
            } else {
                setError('Error: Order Not Found');
            }
        } catch (error) {
            console.error('Error:', error.response.data);
            setOrderData(null);
            setError('Error: Order Not Found');
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        if (searchId) {
            await fetchOrder(searchId);
        }
    };

    return (
        <div>
            <NavBar />
            <form onSubmit={handleSearch}>
                <label>
                    Search Order by ID:
                    <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                </label>
                <button type="submit">Search</button>
            </form>
            {orderData ? (
                <div>
                    <h2>Order Details</h2>
                    <p>ID: {orderData.id}</p>
                    <p>Date: {orderData.date}</p>
                    <p>Delivery Date: {orderData.delivery_date}</p>
                    <p> Ordered Product: {orderData.ordered_product}</p>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : null}
        </div>
    );
}

export default FindOrder;