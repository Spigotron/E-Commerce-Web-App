import React, { useState,  } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import { Form, FloatingLabel, Button, Modal } from 'react-bootstrap';
import NavBar from './NavBar';

function ProductForm() {

    const [productData, setProductData] = useState({
        name: '',
        price: '',
    })
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(''); 

    const handleClose = () => setShow(false);
    
    const handleChange = (event) => {
        event.preventDefault();
        let { name, value } = event.target;
        const newData = { ...productData}
        for (let [key, val] of Object.entries(newData)) {
            if (key == name) {
                newData[key] = value
            }
        }
        console.log(newData)
        setProductData(newData)
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        let response = null
        if (id) {
            response = await axios.put(`http://localhost:5000/put?id=${id}`, {
                body: productData,
            })
            console.log(response.data) 
            setMessage('Successfully Updated Product')
        } else {
            try {
                const response = await axios.post(
                    'http://127.0.0.1:5000/products',
                    productData,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(response.data);
                setMessage('Successfully Added New Product');

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
                <Form.Control type="text" name='name' value={productData.name} onChange={handleChange} placeholder="name" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Price" className="my-3">
                <Form.Control type="text "name="price" value={productData.price} onChange={handleChange} placeholder="Password" />
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

export default ProductForm;