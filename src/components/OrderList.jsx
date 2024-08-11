import React, { Component } from 'react';
import { ListGroup, Container } from 'react-bootstrap';
import axios from 'axios';
import NavBar from './NavBar';

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            selectedOrderId: null,
        };
        this.selectOrder = this.selectOrder.bind(this);
    }

    async componentDidMount() {
        await this.fetchOrders();
    }

    async fetchOrders() {
        try {
            const response = await axios.get('http://localhost:5000/orders');
            this.setState({ orders: response.data });
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    selectOrder(id) {
        console.log(id);
        this.setState({ selectedOrderId: id });
    }

    render() {
        const { orders, selectedOrderId } = this.state;

        return (
            <div>
                <NavBar />
                <ListGroup className="border rounded mx-auto my-4 w-50" defaultActiveKey="#link1">
                    {orders.map((order) => (
                        <ListGroup.Item
                            key={order.id}
                            className="d-flex justify-content-around align-items-center"
                            action
                            onClick={() => this.selectOrder(order.id)}
                        >
                            {order.id}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                {selectedOrderId && (
                    <Container fluid className="d-flex flex-column align-items-center">
                        <h2>Selected Order: {selectedOrderId}</h2>
                    </Container>
                )}
            </div>
        );
    }
}

export default OrderList;