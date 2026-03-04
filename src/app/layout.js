import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Restaurant POS",
  description: "Simple Billing App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main className="container">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}