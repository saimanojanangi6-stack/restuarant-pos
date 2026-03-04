"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

export default function BillPage() {
  const { cart, totalAmount, paymentMode, clearCart } = useCart();
  const router = useRouter();
  const [date, setDate] = useState("");

  useEffect(() => {
    // If refreshed and empty, go home
    if (cart.length === 0) {
      router.push("/");
    }
    setDate(new Date().toLocaleString());
  }, [cart, router]);

  const handlePrint = () => {
    window.print();
  };

  const handleNewOrder = () => {
    if(confirm("Start a new order? This will clear the current data.")) {
      clearCart();
      router.push("/");
    }
  };

  if (cart.length === 0) return null;

  return (
    <div className="invoice-box">
      <center>
        <h2>GOURMET BITES</h2>
        <p>123 Food Street, Tech City</p>
        <p>Ph: +91 98765 43210</p>
      </center>
      
      <div style={{ margin: "20px 0", borderBottom: "1px dashed #000" }}></div>

      <div className="flex-between">
        <span>Date:</span>
        <span>{date}</span>
      </div>
      <div className="flex-between">
        <span>Bill #:</span>
        <span>{Math.floor(Math.random() * 10000)}</span>
      </div>
      <div className="flex-between">
        <span>Mode:</span>
        <strong>{paymentMode}</strong>
      </div>

      <div style={{ margin: "10px 0", borderBottom: "1px dashed #000" }}></div>

      <table style={{ fontSize: "0.9rem" }}>
        <thead>
          <tr>
            <th style={{ padding: "5px 0" }}>Item</th>
            <th style={{ padding: "5px 0", textAlign: "center" }}>Qty</th>
            <th style={{ padding: "5px 0", textAlign: "right" }}>Amt</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} style={{ border: "none" }}>
              <td style={{ padding: "5px 0" }}>{item.name}</td>
              <td style={{ padding: "5px 0", textAlign: "center" }}>{item.quantity}</td>
              <td style={{ padding: "5px 0", textAlign: "right" }}>{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ margin: "10px 0", borderBottom: "1px dashed #000" }}></div>

      <div className="flex-between" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
        <span>TOTAL:</span>
        <span>₹{totalAmount}</span>
      </div>

      <div style={{ margin: "20px 0", borderBottom: "1px dashed #000" }}></div>
      <center>Thank you for dining with us!</center>

      {/* Buttons (Hidden in Print) */}
      <div className="no-print" style={{ marginTop: "30px", display: "flex", gap: "10px", flexDirection: 'column' }}>
        <button onClick={handlePrint} className="btn btn-primary">
          🖨️ Print Invoice
        </button>
        <button onClick={handleNewOrder} className="btn btn-secondary">
          ✨ New Order
        </button>
      </div>
    </div>
  );
}