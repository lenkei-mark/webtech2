import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddProduct = ({loggedIn}) => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {name, quantity, price};

        setIsPending(true);
        fetch('http://localhost:9000/product', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        .then(() => {
            setIsPending(false);
        })
    }

    if(loggedIn){
        return ( 
            <div className="create">
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name: </label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Quantity: </label>
                    <input
                        type="number"
                        required
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <label>Price: </label>
                    <input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {!isPending && <button>Add product</button>}
                    {isPending && <button disabled>Adding product...</button>}
                </form>
            </div>
        );
    } else {
        history.push('/');
        return null;
    }
}
 
export default AddProduct;