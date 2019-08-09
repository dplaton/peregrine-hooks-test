import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {useQuery} from '@magento/peregrine';
import gql from 'graphql-tag';

const CART_DETAILS = gql`
    query cartDetails($cartId: String!) {
        cart(cart_id: $cartId) {
            prices {
                grand_total {
                    currency
                    value
                }
            }
            items {
                id
                quantity
                product {
                    name
                    price {
                        regularPrice {
                            amount {
                                currency
                                value
                            }
                        }
                    }
                    image {
                        url
                        label
                    }
                }
            }
        }
    }
`;

function App() {
    const [products, setProducts] = useState([]);

    const [queryResult, queryApi] = useQuery(CART_DETAILS);
    const {setLoading, runQuery} = queryApi;
    const {data, loading, error} = queryResult;

    const handleRunQuery = async () => {
        setLoading(true);
        await runQuery({
            variables: {cartId: 'hx7geWblhhU0znC4rFPR166UvNy2Mp1k'}
        });

        console.log(data);
    };

    return (
        <div className="App">
            <button onClick={handleRunQuery}>
                Click here to peform a query
            </button>
            <ul>
                {products.map(product => (
                    <li>
                        {product.name} -{' '}
                        {product.price.regularPrice.amount.value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
