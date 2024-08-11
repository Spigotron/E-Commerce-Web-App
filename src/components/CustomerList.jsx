import React, { Component } from 'react';
import { ListGroup, Container } from 'react-bootstrap';
import axios from 'axios';
import NavBar from './NavBar';

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            selectedCustomerId: null,
        };
        this.selectCustomer = this.selectCustomer.bind(this);
    }

    async componentDidMount() {
        await this.fetchCustomers();
    }

    async fetchCustomers() {
        try {
            const response = await axios.get('http://localhost:5000/customers');
            this.setState({ customers: response.data });
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    }

    selectCustomer(id) {
        console.log(id);
        this.setState({ selectedCustomerId: id });
    }

    render() {
        const { customers, selectedCustomerId } = this.state;

        return (
            <div>
                <NavBar />
                <ListGroup className="border rounded mx-auto my-4 w-50" defaultActiveKey="#link1">
                    {customers.map((customer) => (
                        <ListGroup.Item
                            key={customer.id}
                            className="d-flex justify-content-around align-items-center"
                            action
                            onClick={() => this.selectCustomer(customer.id)}
                        >
                            {customer.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                {selectedCustomerId && (
                    <Container fluid className="d-flex flex-column align-items-center">
                        <h2>Selected Customer: {selectedCustomerId}</h2>
                    </Container>
                )}
            </div>
        );
    }
}

export default CustomerList;