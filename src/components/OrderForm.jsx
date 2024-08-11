import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import { Form, FloatingLabel, Button, Modal } from 'react-bootstrap';
import NavBar from './NavBar';

function OrderForm() {
    const [orderData, setOrderData] = useState({
        customer_id: '',
        date: '',
        delivery_date: '',
        ordered_product: ''
    });
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(''); 

    const handleClose = () => setShow(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrderData(prevData => ({ ...prevData, [name]: value }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            let response;
            if (id) {
                response = await axios.put(`http://localhost:5000/put?id=${id}`, orderData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                setMessage('Successfully Updated Order');
            } else {
                response = await axios.post('http://127.0.0.1:5000/orders', orderData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                setMessage('Successfully Added New Order');
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            setMessage('Error Processing Your Request. Please Try Again');
        }

        setShow(true);
    };
    
    return (
        <div>
            <NavBar />
            <Form className='p-4 border rounded mx-4 my-4' onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingCustomerId" label="Customer ID" className="mb-3">
                    <Form.Control
                        type="text"
                        name="customer_id"
                        value={orderData.customer_id}
                        onChange={handleChange}
                        placeholder="Enter customer ID"
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Date">
                    <Form.Control
                        type="date"
                        name='date'
                        value={orderData.date}
                        onChange={handleChange}
                        placeholder="Select date"
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingDeliveryDate" label="Delivery Date" className="my-3">
                    <Form.Control
                        type="date"
                        name="delivery_date"
                        value={orderData.delivery_date}
                        onChange={handleChange}
                        placeholder="Select delivery date"
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingOrderedProduct" label="Ordered Product">
                    <Form.Control
                        type="text"
                        name="ordered_product"
                        value={orderData.ordered_product}
                        onChange={handleChange}
                        placeholder="Enter product name"
                    />
                </FloatingLabel>
                <Button type="submit" className="mt-3" variant="outline-success">Submit</Button>
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OrderForm;