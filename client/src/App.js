import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(()=>{
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const API_BASE = 'https://mini-ecommerce-store.onrender.com';

  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item, index) => index !== id));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };


  return (
    <div className="container">
      <h1>Mini eCommerce Store 🛒</h1>

      <h2>Products</h2>
      <ul>
        {products.map((item) => (
          <li key={item.id}>
            {item.name} – <span className="price">${item.price}</span>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <h2>Your Cart 🧺</h2>
      <ul>
        {cart.map((item,index) => (
          <li key = {index}>
            {item.name} - <span className="price">${item.price}</span>
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Total: ${getTotal()}</h3>
      <button disabled={cart.length===0} onClick={() => alert("Checkout complete!")}>
        Checkout
      </button>
    </div>

  );
}

export default App;