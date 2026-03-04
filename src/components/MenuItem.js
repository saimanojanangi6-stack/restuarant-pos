"use client";
import { useCart } from "../context/CartContext";

export default function MenuItem({ item }) {
  const { addToCart } = useCart();

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Food Image */}
      <img src={item.image} alt={item.name} className="menu-img" />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: '#ccc', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {item.category}
          </span>
          <h3 style={{ margin: '5px 0', fontSize: '1.1rem', color: 'white' }}>
            {item.name}
          </h3>
          <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary)', marginTop: '5px' }}>
            ₹{item.price}
          </p>
        </div>
        
        <button 
          onClick={() => addToCart(item)} 
          className="btn btn-primary"
          style={{ marginTop: '15px' }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}