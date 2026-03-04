"use client";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/CartItem";

export default function CartPage() {
  const { cart, totalAmount } = useCart();

  if (cart.length === 0) {
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
        <table>
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
{/* Wrap table in a scrollable div for mobile */}
<div style={{ overflowX: "auto", marginBottom: "15px" }}>
  <table style={{ minWidth: "500px" }}> {/* Force table to keep its shape */}
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