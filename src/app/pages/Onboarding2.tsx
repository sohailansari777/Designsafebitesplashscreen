import { useNavigate } from "react-router";
import { MobileFrame } from "../components/MobileFrame";

export default function Onboarding2() {
  const navigate = useNavigate();

  return (
    <MobileFrame bg="#ffffff">
      {/* Skip button */}
      <div className="flex justify-end px-6 pt-4 pb-0 shrink-0">
        <button
          onClick={() => navigate("/auth")}
          style={{
            color: "#9CA3AF",
            fontSize: "15px",
            fontWeight: 500,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 0",
          }}
        >
          Skip
        </button>
      </div>

      {/* Illustration */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{ flex: "0 0 auto", height: "380px", padding: "0 20px" }}
      >
        <HealthScoreIllustration />
      </div>

      {/* Text content */}
      <div className="flex flex-col flex-1 px-8 pt-2">
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
          Get Health Score
        </h2>
        <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.65, fontWeight: 400 }}>
          Know instantly if a product is safe to eat with our AI-powered health scoring system.
        </p>
      </div>

      {/* Bottom nav */}
      <div
        className="flex flex-col items-center px-8 shrink-0"
        style={{ paddingBottom: "48px", gap: "28px" }}
      >
        {/* Dots */}
        <div className="flex items-center gap-2">
          <div style={{ width: "8px", height: "8px", borderRadius: "4px", background: "#E5E7EB" }} />
          <div style={{ width: "24px", height: "8px", borderRadius: "4px", background: "#2ECC71" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "4px", background: "#E5E7EB" }} />
        </div>

        {/* Next button */}
        <button
          onClick={() => navigate("/onboarding/3")}
          style={{
            width: "100%",
            height: "56px",
            borderRadius: "16px",
            background: "#2ECC71",
            color: "white",
            fontSize: "17px",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(46,204,113,0.35)",
            letterSpacing: "0.2px",
          }}
        >
          Next
        </button>
      </div>
    </MobileFrame>
  );
}

function HealthScoreIllustration() {
  // Gauge arc parameters
  // The gauge is a semicircle from 180° (left) to 0° (right)
  // We draw it as an SVG arc centered at (160, 230)
  const cx = 160;
  const cy = 218;
  const R = 110; // outer radius
  const r = 78;  // inner radius (ring thickness = 32)

  // Helper: point on circle
  const pt = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos((angle * Math.PI) / 180),
    y: cy + radius * Math.sin((angle * Math.PI) / 180),
  });

  // Gauge spans from 180° to 0° (left to right, top half)
  // Colour segments: red → orange → yellow → green
  // Angles in SVG: 180° = left, 270° = top, 0°/360° = right
  const segments = [
    { startDeg: 180, endDeg: 225, color: "#EF4444" },   // red
    { startDeg: 225, endDeg: 270, color: "#F97316" },   // orange
    { startDeg: 270, endDeg: 315, color: "#EAB308" },   // yellow
    { startDeg: 315, endDeg: 360, color: "#2ECC71" },   // green
  ];

  // Build an SVG arc path for a ring segment
  const arcPath = (startDeg: number, endDeg: number, outerR: number, innerR: number) => {
    const s1 = pt(startDeg, outerR);
    const e1 = pt(endDeg, outerR);
    const s2 = pt(endDeg, innerR);
    const e2 = pt(startDeg, innerR);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return [
      `M ${s1.x} ${s1.y}`,
      `A ${outerR} ${outerR} 0 ${large} 1 ${e1.x} ${e1.y}`,
      `L ${s2.x} ${s2.y}`,
      `A ${innerR} ${innerR} 0 ${large} 0 ${e2.x} ${e2.y}`,
      "Z",
    ].join(" ");
  };

  // Needle at 82/100 score → maps to ~332° (near green end)
  // 180°→360° maps to score 0→100
  const score = 82;
  const needleDeg = 180 + (score / 100) * 180;
  const needleTip = pt(needleDeg, R - 6);
  const needleBase1 = pt(needleDeg + 90, 10);
  const needleBase2 = pt(needleDeg - 90, 10);

  // Score label segment colours
  const labels = [
    { label: "Poor", deg: 202, color: "#EF4444" },
    { label: "Fair", deg: 247, color: "#F97316" },
    { label: "Good", deg: 292, color: "#EAB308" },
    { label: "Great", deg: 337, color: "#2ECC71" },
  ];

  // Product score cards
  const products = [
    { name: "Granola Bar", score: 91, color: "#2ECC71", bg: "#F0FDF4", emoji: "🌾" },
    { name: "Diet Soda", score: 28, color: "#EF4444", bg: "#FEF2F2", emoji: "🥤" },
    { name: "Greek Yogurt", score: 76, color: "#EAB308", bg: "#FEFCE8", emoji: "🥛" },
  ];

  return (
    <svg
      width="335"
      height="370"
      viewBox="0 0 335 370"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soft background blob */}
      <ellipse cx="167" cy="185" rx="152" ry="148" fill="#F0FDF6" />

      {/* ── Gauge ring segments ── */}
      {segments.map((seg, i) => (
        <path
          key={i}
          d={arcPath(seg.startDeg, seg.endDeg, R, r)}
          fill={seg.color}
          opacity="0.92"
        />
      ))}

      {/* Gap lines between segments (thin white dividers) */}
      {[225, 270, 315].map((deg) => {
        const inner = pt(deg, r - 2);
        const outer = pt(deg, R + 2);
        return (
          <line
            key={deg}
            x1={inner.x} y1={inner.y}
            x2={outer.x} y2={outer.y}
            stroke="white"
            strokeWidth="3"
          />
        );
      })}

      {/* Outer glow ring (very subtle) */}
      <path
        d={arcPath(180, 360, R + 6, R + 2)}
        fill="none"
        stroke="rgba(0,0,0,0.04)"
        strokeWidth="1"
      />

      {/* Inner white circle (centre of gauge) */}
      <circle cx={cx} cy={cy} r={r - 2} fill="white" />

      {/* Score number */}
      <text
        x={cx}
        y={cy - 16}
        textAnchor="middle"
        fill="#1A1A2E"
        fontSize="42"
        fontWeight="800"
        fontFamily="system-ui"
      >
        {score}
      </text>
      <text
        x={cx}
        y={cy + 8}
        textAnchor="middle"
        fill="#9CA3AF"
        fontSize="13"
        fontFamily="system-ui"
        fontWeight="500"
      >
        out of 100
      </text>

      {/* "Great" badge pill */}
      <rect x={cx - 28} y={cy + 20} width="56" height="22" rx="11" fill="#DCFCE7" />
      <text
        x={cx}
        y={cy + 35}
        textAnchor="middle"
        fill="#2ECC71"
        fontSize="11"
        fontWeight="700"
        fontFamily="system-ui"
      >
        ✓ Great
      </text>

      {/* Segment labels */}
      {labels.map((lbl) => {
        const pos = pt(lbl.deg, r - 18);
        return (
          <text
            key={lbl.label}
            x={pos.x}
            y={pos.y + 4}
            textAnchor="middle"
            fill={lbl.color}
            fontSize="9"
            fontWeight="700"
            fontFamily="system-ui"
            opacity="0.9"
          >
            {lbl.label}
          </text>
        );
      })}

      {/* Needle */}
      <polygon
        points={`${needleTip.x},${needleTip.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
        fill="#1A1A2E"
        opacity="0.85"
      />
      {/* Needle pivot circle */}
      <circle cx={cx} cy={cy} r="10" fill="#1A1A2E" opacity="0.9" />
      <circle cx={cx} cy={cy} r="5" fill="white" />

      {/* Min / Max labels on gauge ends */}
      <text x="44" y={cy + 10} textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">0</text>
      <text x="277" y={cy + 10} textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">100</text>

      {/* ── Product score cards ── */}
      {products.map((p, i) => {
        const cardX = 14 + i * 103;
        const cardY = 300;
        const barW = Math.round((p.score / 100) * 76);
        return (
          <g key={i}>
            <rect x={cardX} y={cardY} width="96" height="58" rx="14" fill="white" stroke="#F3F4F6" strokeWidth="1.5" />
            {/* Emoji circle */}
            <circle cx={cardX + 18} cy={cardY + 18} r="12" fill={p.bg} />
            <text x={cardX + 18} y={cardY + 22} textAnchor="middle" fontSize="12" fontFamily="system-ui">{p.emoji}</text>
            {/* Name */}
            <text x={cardX + 34} y={cardY + 16} fill="#1A1A2E" fontSize="9" fontWeight="700" fontFamily="system-ui">{p.name}</text>
            {/* Score */}
            <text x={cardX + 34} y={cardY + 28} fill={p.color} fontSize="9" fontWeight="600" fontFamily="system-ui">{p.score}/100</text>
            {/* Mini bar track */}
            <rect x={cardX + 10} y={cardY + 40} width="76" height="6" rx="3" fill="#F3F4F6" />
            {/* Mini bar fill */}
            <rect x={cardX + 10} y={cardY + 40} width={barW} height="6" rx="3" fill={p.color} opacity="0.85" />
          </g>
        );
      })}

      {/* AI badge */}
      <rect x="118" y="260" width="99" height="26" rx="13" fill="#1A1A2E" />
      <text x="167" y="277" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" fontFamily="system-ui">✦ AI-Powered</text>
    </svg>
  );
}