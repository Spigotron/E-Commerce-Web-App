import React, { useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';

function FindCustomer() {
    const [searchId, setSearchId] = useState('');
    const [customerData, setCustomerData] = useState(null);
    const [error, setError] = useState(null);

    const fetchCustomer = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/customers/${id}`);
            if (response.data) {
                setCustomerData(response.data);
                setError(null);
            } else {
                setError('Error: Customer Not Found');
            }
        } catch (error) {
            console.error('Error:', error.response.data);
            setCustomerData(null);
            setError('Error: Customer Not Found');
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        if (searchId) {
            await fetchCustomer(searchId);
        }
    };

    return (
        <div>
            <NavBar />
            <form onSubmit={handleSearch}>
                <label>
                    Search Customer by ID:
                    <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                </label>
                <button type="submit">Search</button>
            </form>
            {customerData ? (
                <div>
                    <h2>Customer Details</h2>
                    <p>Name: {customerData.name}</p>
                    <p>Email: {customerData.email}</p>
                    <p>Phone: {customerData.phone}</p>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : null}
        </div>
    );
}

export default FindCustomer;