"use client";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/CartItem";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, totalAmount } = useCart();
  const [isClient, setIsClient] = useState(false);

  // Avoid hydration mismatch by waiting for client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (!cart || cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px 0" }}>
        <h2>Your cart is empty</h2>
        <br />
        <Link href="/" className="btn btn-primary" style={{ width: "auto" }}>Back to Menu</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Current Order</h1>
      <div className="card" style={{ marginTop: "20px" }}>
        
        {/* Responsive Table Wrapper */}
        <div style={{ overflowX: "auto", marginBottom: "15px" }}>
          <table style={{ minWidth: "500px" }}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <h3>Grand Total: ₹{totalAmount}</h3>
        </div>
      </div>

      <div className="flex-between">
        <Link href="/" className="btn btn-secondary" style={{ width: "auto" }}>
          Add More Items
        </Link>
        <Link href="/checkout" className="btn btn-primary" style={{ width: "auto" }}>
          Proceed to Checkout &rarr;
        </Link>
      </div>
    </div>
  );
}