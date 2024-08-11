import React, { useState,  } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import { Form, FloatingLabel, Button, Modal } from 'react-bootstrap';
import NavBar from './NavBar';

function CustomerForm() {

    const [customerData, setCustomerData] = useState({
        name: '',
        phone: '',
        email: ''
    })
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(''); 

    const handleClose = () => setShow(false);
    
    const handleChange = (event) => {
        event.preventDefault();
        let { name, value } = event.target;
        const newData = { ...customerData}
        for (let [key, val] of Object.entries(newData)) {
            if (key == name) {
                newData[key] = value
            }
        }
        console.log(newData)
        setCustomerData(newData)
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        let response = null
        if (id) {
            response = await axios.put(`http://localhost:5000/put?id=${id}`, {
                body: customerData,
            })
            console.log(response.data) 
            setMessage('Successfully Updated Customer')
        } else {
            try {
                const response = await axios.post(
                    'http://127.0.0.1:5000/customers',
                    customerData,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(response.data);
                setMessage('Successfully Added New Customer');

            } catch (error) {
                console.error('Error:', error.response.data);
                setMessage('Error Processing Your Request. Please Try Again');

            }
        }
            setShow(true)
    }
    
  return (
    <div>
        <NavBar />
        <Form className='p-4 border rounded mx-4 my-4'onSubmit={handleSubmit}>
            <FloatingLabel
            controlId="floatingInput"
            label="Name"
            >
                <Form.Control type="text" name='name' value={customerData.name} onChange={handleChange} placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Email" className="my-3">
                <Form.Control type="email" name="email" value={customerData.email} onChange={handleChange} placeholder="Password" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Phone">
                <Form.Control type="text" name="phone" value={customerData.phone} onChange={handleChange} placeholder="Password" />
            </FloatingLabel>
            <Button type="submit"  className="mt-3" variant="outline-success">Submit</Button>
        </Form>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Success!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message} </Modal.Body>
            <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
      
    </div>
  )
}

export default CustomerForm;