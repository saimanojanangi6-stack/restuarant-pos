"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
  const { cart, totalAmount, paymentMode, setPaymentMode } = useCart();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // --- UI STATES ---
  const [showQR, setShowQR] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- CARD FORM STATE ---
  const [cardType, setCardType] = useState("Credit");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [pin, setPin] = useState("");

  useEffect(() => {
    setIsClient(true);
    if (cart.length === 0) router.push("/");
  }, [cart, router]);

  if (!isClient || cart.length === 0) return null;

  const taxAmount = Math.round(totalAmount * 0.05);
  const finalTotal = totalAmount + taxAmount;

  // --- HANDLERS ---

  const handlePaymentInitiation = () => {
    if (paymentMode === "UPI") {
      setShowQR(true);
    } else if (paymentMode === "Card") {
      setShowCardModal(true);
    } else {
      // Cash
      runSuccessAnimation();
    }
  };

  // ✨ NEW: Auto-fill Demo Data
  const fillDemoData = () => {
    setCardDetails({
      number: "4242424242424242",
      expiry: "12/30",
      cvv: "123",
      name: "John Doe"
    });
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    if (cardDetails.number.length < 16 || cardDetails.cvv.length < 3) {
      alert("Please enter valid card details");
      return;
    }
    setShowCardModal(false);
    setShowPinModal(true);
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin.length < 4) {
      alert("Enter a valid 4-digit PIN");
      return;
    }
    setShowPinModal(false);
    setIsProcessing(true);
    
    // Simulate Bank Processing (2s)
    setTimeout(() => {
      setIsProcessing(false);
      runSuccessAnimation();
    }, 2000);
  };

  const runSuccessAnimation = () => {
    setShowQR(false);
    setIsSuccess(true);
    setTimeout(() => {
      router.push("/bill");
    }, 2500);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", paddingBottom: "100px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
        Checkout
      </h1>

      {/* --- ORDER SUMMARY --- */}
      <div className="card">
        <h3>Order Summary</h3>
        <div style={{ margin: "15px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div className="flex-between"><span style={{ color: "#aaa" }}>Subtotal</span><strong>₹{totalAmount}</strong></div>
          <div className="flex-between"><span style={{ color: "#aaa" }}>Taxes (5%)</span><strong>₹{taxAmount}</strong></div>
        </div>
        <div className="flex-between" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "15px", fontSize: "1.4rem" }}>
          <span>Payable Amount</span>
          <span style={{ color: "var(--primary)" }}>₹{finalTotal}</span>
        </div>
      </div>

      {/* --- PAYMENT METHOD SELECTION --- */}
      <div className="card">
        <h3>Select Payment Method</h3>
        <div className="payment-grid">
          {["Cash", "UPI", "Card"].map((mode) => (
            <div 
              key={mode} 
              className={`payment-card ${paymentMode === mode ? "selected" : ""}`}
              onClick={() => setPaymentMode(mode)}
            >
              <span className="payment-icon">
                {mode === "Cash" ? "💵" : mode === "UPI" ? "📱" : "💳"}
              </span>
              <div className="payment-label">{mode}</div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handlePaymentInitiation} className="btn btn-primary" style={{ marginTop: "30px", fontSize: "1.2rem", padding: "18px", width: "100%" }}>
        Proceed to Pay ₹{finalTotal}
      </button>

      {/* ================= MODALS ================= */}

     {/* 1. UPI QR MODAL */}
{showQR && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>Scan to Pay</h3>
      <p style={{marginBottom: '15px', color: '#555'}}>
        Pay <strong>₹{finalTotal}</strong> to Misala Nageswerarao
      </p>
      
      {/* UPDATE: Use the new filename 'qr.jpg' */}
      <img 
        src="/qr.jpg" 
        alt="PhonePe QR Code" 
        className="qr-code-img"
        style={{ width: '100%', maxWidth: '280px', height: 'auto', borderRadius: '10px', border: '1px solid #eee' }}
      />
      
      <p style={{fontSize: '0.85rem', color: '#888', marginTop: '10px'}}>
        Accepted: PhonePe, GPay, Paytm, UPI
      </p>

      <button onClick={runSuccessAnimation} className="btn btn-primary" style={{ marginTop: '15px', width: '100%' }}>
        I Have Paid
      </button>
      <button 
        onClick={() => setShowQR(false)} 
        className="btn btn-secondary" 
        style={{ marginTop: '10px', width: '100%', background: 'transparent', border: 'none' }}
      >
        Cancel
      </button>
    </div>
  </div>
)}
      {/* 2. CARD DETAILS MODAL */}
      {showCardModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ textAlign: 'left', maxWidth: '400px', color: '#333' }}>
            <div className="flex-between" style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Enter Card Details</h3>
              <button 
                type="button" 
                onClick={fillDemoData} 
                style={{ fontSize: '0.8rem', background: '#e0f2fe', color: '#0284c7', padding: '5px 10px', borderRadius: '4px', border: '1px solid #bae6fd' }}
              >
                ⚡ Fill Test Data
              </button>
            </div>
            
            <form onSubmit={handleCardSubmit} className="flex-col">
              <label style={{fontWeight: 'bold', fontSize: '0.9rem'}}>Card Number</label>
              <input 
                type="text" maxLength="16" placeholder="0000 0000 0000 0000" required
                value={cardDetails.number}
                onChange={e => setCardDetails({...cardDetails, number: e.target.value.replace(/\D/g,'')})}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', fontSize: '1rem' }}
              />

              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{fontWeight: 'bold', fontSize: '0.9rem'}}>Expiry</label>
                  <input 
                    type="text" placeholder="MM/YY" maxLength="5" required
                    value={cardDetails.expiry}
                    onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', fontSize: '1rem' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{fontWeight: 'bold', fontSize: '0.9rem'}}>CVV</label>
                  <input 
                    type="password" maxLength="3" placeholder="123" required
                    value={cardDetails.cvv}
                    onChange={e => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g,'')})}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', fontSize: '1rem' }}
                  />
                </div>
              </div>

              <label style={{fontWeight: 'bold', fontSize: '0.9rem'}}>Cardholder Name</label>
              <input 
                type="text" placeholder="Name on Card" required
                value={cardDetails.name}
                onChange={e => setCardDetails({...cardDetails, name: e.target.value})}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', fontSize: '1rem' }}
              />

              <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>
                Next: Enter PIN
              </button>
              <button type="button" onClick={() => setShowCardModal(false)} className="btn btn-secondary" style={{ marginTop: '10px', width: '100%' }}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* 3. PIN ENTRY MODAL */}
      {showPinModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ color: '#333' }}>
            <h3>Enter 4-Digit PIN</h3>
            <p style={{ color: '#666', marginBottom: '20px', fontSize: '0.9rem' }}>
              Authenticate your transaction
            </p>
            
            <form onSubmit={handlePinSubmit}>
              <input 
                type="password" 
                maxLength="4" 
                autoFocus
                value={pin}
                onChange={e => setPin(e.target.value.replace(/\D/g,''))}
                placeholder="••••"
                style={{ 
                  fontSize: '2.5rem', letterSpacing: '15px', textAlign: 'center', 
                  width: '200px', padding: '10px', borderRadius: '12px', 
                  border: '2px solid #ccc', marginBottom: '25px', outline: 'none' 
                }}
              />
              <br/>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>
                Confirm Payment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. PROCESSING SPINNER */}
      {isProcessing && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ color: '#333' }}>
            <div className="spinner"></div>
            <h3 style={{ marginTop: '15px' }}>Processing...</h3>
            <p style={{ color: '#666' }}>Do not close this window</p>
          </div>
        </div>
      )}

      {/* 5. SUCCESS ANIMATION */}
      {isSuccess && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ color: '#333' }}>
            <div className="success-checkmark">
              <span className="check-icon">✓</span>
            </div>
            <h2>Payment Successful!</h2>
            <p style={{ color: '#666' }}>Redirecting to invoice...</p>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        .spinner {
          width: 50px; height: 50px; border: 5px solid #f3f3f3; 
          border-top: 5px solid var(--primary); borderRadius: 50%; 
          animation: spin 1s linear infinite; margin: 0 auto;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}