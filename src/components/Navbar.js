"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="top-nav no-print">
      <div className="container flex-between" style={{ padding: "0 20px" }}>
        <Link href="/" className="nav-logo">
          🍔 Gourmet POS
        </Link>
        <Link href="/cart" className="btn btn-secondary" style={{ position: "relative", padding: "10px 20px" }}>
          🛒 Cart
          {totalItems > 0 && (
            <span className="cart-badge">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}