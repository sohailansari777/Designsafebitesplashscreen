import { useNavigate } from "react-router";
import { MobileFrame } from "../components/MobileFrame";

export default function Onboarding3() {
  const navigate = useNavigate();

  return (
    <MobileFrame bg="#FAFCFF">
      {/* Top spacer — no skip on last screen, replaced with confetti feel */}
      <div className="flex justify-end px-6 pt-4 pb-0 shrink-0" style={{ minHeight: "36px" }} />

      {/* Illustration */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{ flex: "0 0 auto", height: "390px", padding: "0 16px" }}
      >
        <ShopIllustration />
      </div>

      {/* Text content */}
      <div className="flex flex-col flex-1 px-8 pt-0">
        {/* Celebration tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "#FFF7ED",
            borderRadius: "20px",
            padding: "5px 12px",
            marginBottom: "14px",
            alignSelf: "flex-start",
          }}
        >
          <span style={{ fontSize: "14px" }}>🎉</span>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#F97316", letterSpacing: "0.3px" }}>
            You're all set!
          </span>
        </div>

        <h2
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "#1A1A2E",
            letterSpacing: "-0.5px",
            marginBottom: "14px",
            lineHeight: 1.15,
          }}
        >
          Shop Healthy
        </h2>
        <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.65, fontWeight: 400 }}>
          Buy healthier alternatives directly from Amazon, Flipkart and more at the best prices.
        </p>

        {/* Store logos row */}
        <div className="flex items-center gap-3" style={{ marginTop: "20px" }}>
          {[
            { name: "Amazon", bg: "#FF9900", text: "a" },
            { name: "Flipkart", bg: "#2874F0", text: "F" },
            { name: "More", bg: "#F3F4F6", text: "+" },
          ].map((store) => (
            <div
              key={store.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: store.name === "More" ? "#F9FAFB" : "white",
                border: "1.5px solid #F3F4F6",
                borderRadius: "10px",
                padding: "6px 12px 6px 8px",
              }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "6px",
                  background: store.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: store.name === "More" ? "#9CA3AF" : "white",
                  fontFamily: "system-ui",
                }}
              >
                {store.text}
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: store.name === "More" ? "#9CA3AF" : "#1A1A2E" }}>
                {store.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div
        className="flex flex-col items-center px-8 shrink-0"
        style={{ paddingBottom: "48px", gap: "28px" }}
      >
        {/* Dots */}
        <div className="flex items-center gap-2">
          <div style={{ width: "8px", height: "8px", borderRadius: "4px", background: "#E5E7EB" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "4px", background: "#E5E7EB" }} />
          <div style={{ width: "24px", height: "8px", borderRadius: "4px", background: "#2ECC71" }} />
        </div>

        {/* Get Started button */}
        <button
          onClick={() => navigate("/auth")}
          style={{
            width: "100%",
            height: "58px",
            borderRadius: "18px",
            background: "linear-gradient(135deg, #34D979 0%, #2ECC71 50%, #27AE60 100%)",
            color: "white",
            fontSize: "18px",
            fontWeight: 800,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 10px 32px rgba(46,204,113,0.4)",
            letterSpacing: "0.2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <span>Get Started</span>
          <span style={{ fontSize: "18px" }}>→</span>
        </button>
      </div>
    </MobileFrame>
  );
}

function ShopIllustration() {
  // Food items in the cart
  const foodItems = [
    { emoji: "🥦", x: 108, y: 148, size: 22, bg: "#DCFCE7" },
    { emoji: "🍎", x: 148, y: 138, size: 22, bg: "#FEE2E2" },
    { emoji: "🥕", x: 188, y: 144, size: 22, bg: "#FFF7ED" },
    { emoji: "🫐", x: 128, y: 118, size: 20, bg: "#EDE9FE" },
    { emoji: "🥑", x: 168, y: 114, size: 20, bg: "#DCFCE7" },
    { emoji: "🍋", x: 207, y: 120, size: 19, bg: "#FEF9C3" },
  ];

  // Confetti pieces
  const confetti = [
    { x: 42, y: 52, w: 10, h: 6, color: "#2ECC71", r: 15 },
    { x: 268, y: 44, w: 8, h: 5, color: "#F59E0B", r: -20 },
    { x: 56, y: 92, w: 6, h: 10, color: "#EF4444", r: 40 },
    { x: 285, y: 80, w: 10, h: 5, color: "#8B5CF6", r: -10 },
    { x: 30, y: 148, w: 7, h: 5, color: "#F97316", r: 25 },
    { x: 300, y: 130, w: 6, h: 9, color: "#2ECC71", r: -35 },
    { x: 60, y: 200, w: 8, h: 5, color: "#EAB308", r: 50 },
    { x: 290, y: 185, w: 9, h: 5, color: "#3B82F6", r: -15 },
    { x: 80, y: 42, w: 5, h: 8, color: "#EC4899", r: 60 },
    { x: 245, y: 60, w: 7, h: 5, color: "#2ECC71", r: 30 },
    { x: 20, y: 115, w: 5, h: 7, color: "#F59E0B", r: -45 },
    { x: 315, y: 155, w: 6, h: 5, color: "#EF4444", r: 20 },
  ];

  return (
    <svg
      width="335"
      height="380"
      viewBox="0 0 335 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soft background circle */}
      <circle cx="167" cy="185" r="150" fill="#F0FDF6" />
      <circle cx="167" cy="185" r="120" fill="#E8FDF2" opacity="0.5" />

      {/* Confetti */}
      {confetti.map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y={c.y}
          width={c.w}
          height={c.h}
          rx="2"
          fill={c.color}
          opacity="0.75"
          transform={`rotate(${c.r} ${c.x + c.w / 2} ${c.y + c.h / 2})`}
        />
      ))}

      {/* Star sparkles */}
      {[
        { x: 55, y: 68, s: 8 },
        { x: 288, y: 58, s: 6 },
        { x: 36, y: 170, s: 7 },
        { x: 305, y: 160, s: 9 },
      ].map((sp, i) => (
        <g key={i}>
          <line x1={sp.x} y1={sp.y - sp.s} x2={sp.x} y2={sp.y + sp.s} stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" />
          <line x1={sp.x - sp.s} y1={sp.y} x2={sp.x + sp.s} y2={sp.y} stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" />
          <line x1={sp.x - sp.s * 0.7} y1={sp.y - sp.s * 0.7} x2={sp.x + sp.s * 0.7} y2={sp.y + sp.s * 0.7} stroke="#2ECC71" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <line x1={sp.x + sp.s * 0.7} y1={sp.y - sp.s * 0.7} x2={sp.x - sp.s * 0.7} y2={sp.y + sp.s * 0.7} stroke="#2ECC71" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </g>
      ))}

      {/* ── Shopping Cart Body ── */}
      {/* Cart basket */}
      <path
        d="M88 170 L92 230 Q93 244 107 244 L228 244 Q242 244 243 230 L247 170 Z"
        fill="white"
        stroke="#E5E7EB"
        strokeWidth="2"
      />
      {/* Cart basket inner shade */}
      <path
        d="M96 176 L100 232 Q101 238 107 238 L228 238 Q234 238 235 232 L239 176 Z"
        fill="#F9FAFB"
      />
      {/* Cart vertical lines (basket ribs) */}
      {[130, 167, 204].map((x) => (
        <line key={x} x1={x} y1="176" x2={x + 2} y2="238" stroke="#E5E7EB" strokeWidth="1.5" />
      ))}
      {/* Cart horizontal line */}
      <line x1="96" y1="207" x2="239" y2="207" stroke="#E5E7EB" strokeWidth="1.5" />

      {/* Cart handle bar (top rod) */}
      <rect x="70" y="162" width="195" height="14" rx="7" fill="white" stroke="#E5E7EB" strokeWidth="2" />

      {/* Cart handle connector left */}
      <line x1="85" y1="162" x2="68" y2="132" stroke="#D1D5DB" strokeWidth="5" strokeLinecap="round" />
      {/* Cart handle connector right */}
      <line x1="250" y1="162" x2="267" y2="132" stroke="#D1D5DB" strokeWidth="5" strokeLinecap="round" />

      {/* Cart handle arc */}
      <path
        d="M68 132 Q167 68 267 132"
        fill="none"
        stroke="#D1D5DB"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Cart wheels */}
      <circle cx="126" cy="262" r="14" fill="white" stroke="#D1D5DB" strokeWidth="3" />
      <circle cx="126" cy="262" r="6" fill="#E5E7EB" />
      <circle cx="210" cy="262" r="14" fill="white" stroke="#D1D5DB" strokeWidth="3" />
      <circle cx="210" cy="262" r="6" fill="#E5E7EB" />

      {/* ── Food Items in Cart ── */}
      {foodItems.map((item, i) => (
        <g key={i}>
          <circle cx={item.x} cy={item.y} r={item.size} fill={item.bg} />
          <text
            x={item.x}
            y={item.y + 7}
            textAnchor="middle"
            fontSize={item.size + 2}
            fontFamily="system-ui"
          >
            {item.emoji}
          </text>
        </g>
      ))}

      {/* ── Big Checkmark Badge (top right of cart) ── */}
      <circle cx="242" cy="148" r="30" fill="#2ECC71" />
      <circle cx="242" cy="148" r="30" fill="white" fillOpacity="0.15" />
      {/* Outer ring glow */}
      <circle cx="242" cy="148" r="34" fill="none" stroke="#2ECC71" strokeWidth="3" opacity="0.3" />
      <circle cx="242" cy="148" r="38" fill="none" stroke="#2ECC71" strokeWidth="2" opacity="0.15" />
      {/* Checkmark */}
      <path
        d="M230 148 L239 157 L255 139"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Price tag / discount badge ── */}
      <rect x="54" y="138" width="68" height="28" rx="14" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="1.5" />
      <text x="88" y="157" textAnchor="middle" fill="#F97316" fontSize="12" fontWeight="700" fontFamily="system-ui">Best Price</text>

      {/* Saving pill */}
      <rect x="62" y="284" width="60" height="22" rx="11" fill="#DCFCE7" />
      <text x="92" y="299" textAnchor="middle" fill="#16A34A" fontSize="10" fontWeight="700" fontFamily="system-ui">Save 30%</text>

      {/* Free delivery pill */}
      <rect x="134" y="284" width="75" height="22" rx="11" fill="#EEF2FF" />
      <text x="171" y="299" textAnchor="middle" fill="#6366F1" fontSize="10" fontWeight="700" fontFamily="system-ui">Free Delivery</text>

      {/* Eco pill */}
      <rect x="221" y="284" width="52" height="22" rx="11" fill="#F0FDF4" />
      <text x="247" y="299" textAnchor="middle" fill="#2ECC71" fontSize="10" fontWeight="700" fontFamily="system-ui">Organic</text>

      {/* Bottom product cards */}
      {[
        { name: "Oat Milk", price: "₹299", orig: "₹399", x: 54, emoji: "🥛" },
        { name: "Granola", price: "$4.99", orig: "$7.99", x: 178, emoji: "🌾" },
      ].map((prod) => (
        <g key={prod.name}>
          <rect x={prod.x} y={318} width="104" height="50" rx="14" fill="white" stroke="#F3F4F6" strokeWidth="1.5" />
          <circle cx={prod.x + 18} cy={337} r="12" fill="#F0FDF6" />
          <text x={prod.x + 18} y={341} textAnchor="middle" fontSize="14" fontFamily="system-ui">{prod.emoji}</text>
          <text x={prod.x + 35} y={333} fill="#1A1A2E" fontSize="10" fontWeight="700" fontFamily="system-ui">{prod.name}</text>
          <text x={prod.x + 35} y={346} fill="#2ECC71" fontSize="10" fontWeight="700" fontFamily="system-ui">{prod.price}</text>
          <text x={prod.x + 35} y={358} fill="#D1D5DB" fontSize="8" fontFamily="system-ui" textDecoration="line-through">{prod.orig}</text>
          {/* Cart icon */}
          <rect x={prod.x + 82} y={328} width="18" height="18" rx="6" fill="#2ECC71" />
          <text x={prod.x + 91} y={340} textAnchor="middle" fill="white" fontSize="10" fontFamily="system-ui">+</text>
        </g>
      ))}
    </svg>
  );
}