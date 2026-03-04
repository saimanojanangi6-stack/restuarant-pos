"use client";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <tr>
      <td>
        <div style={{ fontWeight: "bold" }}>{item.name}</div>
        <div style={{ fontSize: "0.8rem", color: "#666" }}>₹{item.price} each</div>
      </td>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <button className="btn-secondary" style={{ padding: "5px 10px" }} onClick={() => updateQuantity(item.id, -1)}>-</button>
          <span>{item.quantity}</span>
          <button className="btn-secondary" style={{ padding: "5px 10px" }} onClick={() => updateQuantity(item.id, 1)}>+</button>
        </div>
      </td>
      <td style={{ fontWeight: "bold" }}>₹{item.price * item.quantity}</td>
      <td style={{ textAlign: "right" }}>
        <button 
          onClick={() => removeFromCart(item.id)} 
          style={{ color: "red", background: "none", fontSize: "1.2rem" }}
        >
          &times;
        </button>
      </td>
    </tr>
  );
}