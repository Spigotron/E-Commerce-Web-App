import React, { Component } from 'react';
import { ListGroup, Container } from 'react-bootstrap';
import axios from 'axios';
import NavBar from './NavBar';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            selectedProductId: null,
        };
        this.selectProduct = this.selectProduct.bind(this);
    }

    async componentDidMount() {
        await this.fetchProducts();
    }

    async fetchProducts() {
        try {
            const response = await axios.get('http://localhost:5000/products');
            this.setState({ products: response.data });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    selectProduct(id) {
        console.log(id);
        this.setState({ selectedProductId: id });
    }

    render() {
        const { products, selectedProductId } = this.state;

        return (
            <div>
                <NavBar />
                <ListGroup className="border rounded mx-auto my-4 w-50" defaultActiveKey="#link1">
                    {products.map((product) => (
                        <ListGroup.Item
                            key={product.id}
                            className="d-flex justify-content-around align-items-center"
                            action
                            onClick={() => this.selectProduct(product.id)}
                        >
                            {product.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                {selectedProductId && (
                    <Container fluid className="d-flex flex-column align-items-center">
                        <h2>Selected Product: {selectedProductId}</h2>
                    </Container>
                )}
            </div>
        );
    }
}

export default ProductList;