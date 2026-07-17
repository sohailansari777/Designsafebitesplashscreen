import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Bookmark,
  Share2,
  AlertTriangle,
  ShieldAlert,
  Leaf,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ShoppingCart,
  ExternalLink,
  Eye,
  Info,
  Zap,
} from "lucide-react";
import { MobileFrame } from "../components/MobileFrame";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// ── Data ──────────────────────────────────────────────────────────────────────

const RED_FLAGS = [
  {
    id: 1,
    name: "Palm Oil",
    risk: "Heart disease risk",
    severity: "High",
    color: "#EF4444",
    bg: "#FEE2E2",
  },
  {
    id: 2,
    name: "High Sodium (890mg)",
    risk: "Blood pressure risk",
    severity: "High",
    color: "#EF4444",
    bg: "#FEE2E2",
  },
  {
    id: 3,
    name: "Maida (Refined Flour)",
    risk: "Low nutritional value",
    severity: "Medium",
    color: "#F59E0B",
    bg: "#FEF3C7",
  },
  {
    id: 4,
    name: "MSG (E621)",
    risk: "Sensitivity in some individuals",
    severity: "Medium",
    color: "#F59E0B",
    bg: "#FEF3C7",
  },
];

const HEALTH_RISKS = [
  { label: "Obesity", color: "#EF4444", bg: "#FEE2E2" },
  { label: "High BP", color: "#DC2626", bg: "#FEE2E2" },
  { label: "Heart Disease", color: "#B91C1C", bg: "#FEE2E2" },
  { label: "Diabetes Risk", color: "#F59E0B", bg: "#FEF3C7" },
  { label: "Bloating", color: "#F59E0B", bg: "#FEF3C7" },
];

const NUTRITION = [
  { name: "Calories", value: "310", unit: "kcal", pct: 78, status: "high" },
  { name: "Protein", value: "7.8", unit: "g", pct: 15, status: "low" },
  { name: "Carbohydrates", value: "48", unit: "g", pct: 82, status: "high" },
  { name: "Sugar", value: "2.1", unit: "g", pct: 22, status: "ok" },
  { name: "Total Fat", value: "11", unit: "g", pct: 60, status: "mid" },
  { name: "Sodium", value: "890", unit: "mg", pct: 90, status: "high" },
  { name: "Fibre", value: "1.2", unit: "g", pct: 10, status: "low" },
];

const STORES = [
  { id: "amazon", name: "Amazon", price: "₹12", color: "#FF9900", bg: "#FFF8EE", initial: "a" },
  { id: "flipkart", name: "Flipkart", price: "₹14", color: "#2874F0", bg: "#EEF4FF", initial: "f" },
  { id: "blinkit", name: "Blinkit", price: "₹15", color: "#F9D000", textColor: "#1A1A2E", bg: "#FFFBEA", initial: "b" },
];

const ALTERNATIVES = [
  {
    id: 1,
    name: "Organic Whole Wheat Pasta",
    brand: "Millet Magic",
    score: 82,
    image: "https://images.unsplash.com/photo-1761222191837-4448599c09fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  },
  {
    id: 2,
    name: "Quick Oats Original",
    brand: "True Elements",
    score: 88,
    image: "https://images.unsplash.com/photo-1630361802236-e2b611c7065c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  },
  {
    id: 3,
    name: "Quinoa Grain Pouch",
    brand: "Organic India",
    score: 91,
    image: "https://images.unsplash.com/photo-1722882270052-e132567e9f70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function statusColor(status: string) {
  if (status === "high") return "#EF4444";
  if (status === "mid") return "#F59E0B";
  if (status === "low") return "#3B82F6";
  return "#2ECC71";
}

function statusBg(status: string) {
  if (status === "high") return "#FEE2E2";
  if (status === "mid") return "#FEF3C7";
  if (status === "low") return "#EFF6FF";
  return "#E8FAF0";
}

// ── Circular Score Ring ───────────────────────────────────────────────────────
function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const circumference = 2 * Math.PI * r;
  const filled = (score / 100) * circumference;
  const color = score >= 70 ? "#2ECC71" : score >= 45 ? "#F59E0B" : "#EF4444";

  return (
    <div style={{ position: "relative", width: "130px", height: "130px" }}>
      <svg width="130" height="130" viewBox="0 0 130 130" style={{ transform: "rotate(-90deg)" }}>
        {/* Track */}
        <circle cx="65" cy="65" r={r} fill="none" stroke="#FEE2E2" strokeWidth="10" />
        {/* Progress */}
        <motion.circle
          cx="65"
          cy="65"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - filled }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      {/* Center text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          style={{ fontSize: "30px", fontWeight: 900, color, lineHeight: 1 }}
        >
          {score}
        </motion.span>
        <span style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: 500 }}>/100</span>
      </div>
    </div>
  );
}

// ── Store Logo ────────────────────────────────────────────────────────────────
function StoreLogo({ store }: { store: typeof STORES[0] }) {
  const letters: Record<string, string> = { a: "A", f: "F", b: "B" };
  const icons: Record<string, string> = {
    a: "amazon",
    f: "flipkart",
    b: "blinkit",
  };
  return (
    <div
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        background: store.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        border: `1.5px solid ${store.color}22`,
      }}
    >
      <span style={{ fontSize: "14px", fontWeight: 900, color: store.textColor || store.color }}>
        {letters[store.initial]}
      </span>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ProductDetail() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [nutritionOpen, setNutritionOpen] = useState(false);

  return (
    <MobileFrame bg="#F5F7FA" topColor="#2ECC71" lightStatusBar>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* ════════ TOP BAR (GREEN) ════════ */}
        <div
          style={{
            background: "linear-gradient(135deg, #2ECC71 0%, #1BAB58 100%)",
            padding: "8px 20px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              width: "38px", height: "38px", borderRadius: "11px",
              background: "rgba(255,255,255,0.18)", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={20} color="white" />
          </button>

          <span style={{ color: "white", fontSize: "16px", fontWeight: 700 }}>
            Product Analysis
          </span>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setSaved((s) => !s)}
              style={{
                width: "38px", height: "38px", borderRadius: "11px",
                background: saved ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.18)",
                border: "none", display: "flex", alignItems: "center",
                justifyContent: "center", cursor: "pointer",
              }}
            >
              <Bookmark size={18} color="white" fill={saved ? "white" : "none"} />
            </motion.button>
            <button
              style={{
                width: "38px", height: "38px", borderRadius: "11px",
                background: "rgba(255,255,255,0.18)", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Share2 size={18} color="white" />
            </button>
          </div>
        </div>

        {/* ════════ SCROLLABLE CONTENT ════════ */}
        <div style={{ flex: 1, overflowY: "auto" }}>

          {/* ── Product Info ── */}
          <div
            style={{
              background: "white",
              borderRadius: "0 0 24px 24px",
              padding: "20px 20px 24px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              marginBottom: "14px",
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
            }}
          >
            {/* Product image */}
            <div
              style={{
                width: "100px",
                height: "110px",
                borderRadius: "16px",
                overflow: "hidden",
                flexShrink: 0,
                background: "#F3F4F6",
                boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1761579339698-76489ea1bce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300"
                alt="Maggi Masala Noodles"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Product info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Category tag */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "#FFF8EE",
                  borderRadius: "6px",
                  padding: "3px 8px",
                  marginBottom: "8px",
                }}
              >
                <Zap size={10} color="#F59E0B" fill="#F59E0B" />
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#F59E0B" }}>
                  INSTANT FOOD
                </span>
              </div>

              <p
                style={{
                  fontSize: "17px",
                  fontWeight: 800,
                  color: "#111827",
                  lineHeight: 1.25,
                  marginBottom: "5px",
                }}
              >
                Maggi Masala Noodles
              </p>
              <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "10px" }}>
                Nestlé India
              </p>

              {/* Barcode badge */}
              <div className="flex items-center gap-1.5">
                <div
                  style={{
                    background: "#F3F4F6",
                    borderRadius: "6px",
                    padding: "4px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4" width="2" height="16" rx="0.5" fill="#9CA3AF" />
                    <rect x="6" y="4" width="1" height="16" rx="0.5" fill="#9CA3AF" />
                    <rect x="9" y="4" width="2" height="16" rx="0.5" fill="#9CA3AF" />
                    <rect x="13" y="4" width="1" height="16" rx="0.5" fill="#9CA3AF" />
                    <rect x="16" y="4" width="2" height="16" rx="0.5" fill="#9CA3AF" />
                    <rect x="20" y="4" width="2" height="16" rx="0.5" fill="#9CA3AF" />
                  </svg>
                  <span style={{ fontSize: "10px", color: "#9CA3AF", fontWeight: 500 }}>
                    8901058852396
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: "14px", paddingBottom: "28px" }}>

            {/* ── Health Score Card ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              style={{
                background: "linear-gradient(135deg, #FFF5F5 0%, #FEE2E2 100%)",
                borderRadius: "20px",
                padding: "20px",
                border: "1.5px solid #FECACA",
                boxShadow: "0 4px 20px rgba(239,68,68,0.12)",
              }}
            >
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.8px", marginBottom: "16px" }}>
                HEALTH SCORE
              </p>

              <div className="flex items-center gap-5">
                <ScoreRing score={35} />

                <div style={{ flex: 1 }}>
                  {/* Avoid badge */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      background: "#EF4444",
                      borderRadius: "8px",
                      padding: "5px 12px",
                      marginBottom: "12px",
                    }}
                  >
                    <ShieldAlert size={13} color="white" />
                    <span style={{ fontSize: "12px", fontWeight: 800, color: "white", letterSpacing: "0.5px" }}>
                      AVOID
                    </span>
                  </div>

                  <p style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.5, marginBottom: "12px" }}>
                    This product has several concerning ingredients. Consume rarely or not at all.
                  </p>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between" style={{ marginBottom: "5px" }}>
                      <span style={{ fontSize: "11px", color: "#9CA3AF" }}>Health Score</span>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#EF4444" }}>35/100</span>
                    </div>
                    <div
                      style={{
                        height: "7px",
                        borderRadius: "4px",
                        background: "#FCA5A5",
                        overflow: "hidden",
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "35%" }}
                        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                        style={{
                          height: "100%",
                          borderRadius: "4px",
                          background: "linear-gradient(90deg, #EF4444, #DC2626)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Red Flags ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.4 }}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "18px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              {/* Heading */}
              <div className="flex items-center gap-2" style={{ marginBottom: "14px" }}>
                <div
                  style={{
                    width: "30px", height: "30px", borderRadius: "9px",
                    background: "#FEE2E2", display: "flex", alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AlertTriangle size={15} color="#EF4444" />
                </div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>Red Flags</p>
                <div
                  style={{
                    marginLeft: "auto",
                    background: "#FEE2E2",
                    borderRadius: "6px",
                    padding: "2px 8px",
                  }}
                >
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#EF4444" }}>
                    {RED_FLAGS.length} found
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {RED_FLAGS.map((flag) => (
                  <div
                    key={flag.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      background: flag.bg,
                      borderRadius: "12px",
                      padding: "11px 12px",
                      borderLeft: `3px solid ${flag.color}`,
                    }}
                  >
                    {/* Dot */}
                    <div
                      style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: flag.color, flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>{flag.name}</p>
                      <p style={{ fontSize: "11px", color: "#6B7280", marginTop: "1px" }}>{flag.risk}</p>
                    </div>
                    {/* Severity chip */}
                    <div
                      style={{
                        borderRadius: "6px",
                        padding: "3px 7px",
                        background: `${flag.color}18`,
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: "10px", fontWeight: 700, color: flag.color }}>
                        {flag.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Health Risks ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.4 }}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "18px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-center gap-2" style={{ marginBottom: "14px" }}>
                <div
                  style={{
                    width: "30px", height: "30px", borderRadius: "9px",
                    background: "#FFF3E0", display: "flex", alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShieldAlert size={15} color="#F59E0B" />
                </div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>
                  Potential Health Risks
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {HEALTH_RISKS.map((risk) => (
                  <div
                    key={risk.label}
                    style={{
                      background: risk.bg,
                      borderRadius: "20px",
                      padding: "6px 14px",
                      border: `1px solid ${risk.color}30`,
                    }}
                  >
                    <span style={{ fontSize: "12px", fontWeight: 700, color: risk.color }}>
                      {risk.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Safe Consumption ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              style={{
                background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
                borderRadius: "20px",
                padding: "18px",
                border: "1.5px solid #BBF7D0",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "46px", height: "46px", borderRadius: "13px",
                  background: "#2ECC71", display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(46,204,113,0.30)",
                }}
              >
                <Leaf size={22} color="white" />
              </div>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "#16A34A", letterSpacing: "0.5px", marginBottom: "4px" }}>
                  SAFE CONSUMPTION
                </p>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>
                  Maximum 1 pack per week
                </p>
                <p style={{ fontSize: "11px", color: "#6B7280", marginTop: "3px" }}>
                  Due to high sodium & refined flour content
                </p>
              </div>
            </motion.div>

            {/* ── Nutrition Facts (expandable) ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.4 }}
              style={{
                background: "white",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              {/* Header (tappable) */}
              <button
                onClick={() => setNutritionOpen((o) => !o)}
                style={{
                  width: "100%", background: "none", border: "none",
                  cursor: "pointer", padding: "18px 18px",
                  display: "flex", alignItems: "center", gap: "10px",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: "30px", height: "30px", borderRadius: "9px",
                    background: "#EFF6FF", display: "flex", alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Info size={15} color="#3B82F6" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>
                    Nutrition Facts
                  </p>
                  <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "1px" }}>per 100g serving</p>
                </div>
                {nutritionOpen ? (
                  <ChevronUp size={18} color="#9CA3AF" />
                ) : (
                  <ChevronDown size={18} color="#9CA3AF" />
                )}
              </button>

              <AnimatePresence>
                {nutritionOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ padding: "0 18px 18px" }}>
                      {/* Column header */}
                      <div
                        className="flex items-center justify-between"
                        style={{
                          padding: "8px 10px",
                          background: "#F9FAFB",
                          borderRadius: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        <span style={{ fontSize: "11px", fontWeight: 600, color: "#9CA3AF" }}>NUTRIENT</span>
                        <span style={{ fontSize: "11px", fontWeight: 600, color: "#9CA3AF" }}>AMOUNT</span>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {NUTRITION.map((n, i) => (
                          <div
                            key={n.name}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              padding: "9px 10px",
                              borderRadius: "9px",
                              background: i % 2 === 0 ? "#FAFAFA" : "white",
                            }}
                          >
                            <p style={{ flex: 1, fontSize: "13px", color: "#374151", fontWeight: 500 }}>
                              {n.name}
                            </p>
                            {/* Mini bar */}
                            <div
                              style={{
                                width: "60px",
                                height: "5px",
                                borderRadius: "3px",
                                background: "#F3F4F6",
                                overflow: "hidden",
                                flexShrink: 0,
                              }}
                            >
                              <div
                                style={{
                                  width: `${n.pct}%`,
                                  height: "100%",
                                  borderRadius: "3px",
                                  background: statusColor(n.status),
                                }}
                              />
                            </div>
                            <div
                              style={{
                                minWidth: "70px",
                                textAlign: "right",
                                background: statusBg(n.status),
                                borderRadius: "7px",
                                padding: "3px 8px",
                                flexShrink: 0,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  color: statusColor(n.status),
                                }}
                              >
                                {n.value} {n.unit}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ── Buy This Product ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.4 }}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "18px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-center gap-2" style={{ marginBottom: "14px" }}>
                <div
                  style={{
                    width: "30px", height: "30px", borderRadius: "9px",
                    background: "#F0FDF4", display: "flex", alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShoppingCart size={15} color="#2ECC71" />
                </div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>Buy This Product</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {STORES.map((store) => (
                  <motion.button
                    key={store.id}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      background: store.bg,
                      borderRadius: "13px",
                      padding: "12px 14px",
                      border: `1.5px solid ${store.color}22`,
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <StoreLogo store={store} />
                    <span style={{ flex: 1, fontSize: "14px", fontWeight: 700, color: "#111827", textAlign: "left" }}>
                      {store.name}
                    </span>
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 800,
                        color: store.textColor || store.color,
                      }}
                    >
                      {store.price}
                    </span>
                    <div
                      style={{
                        width: "28px", height: "28px", borderRadius: "8px",
                        background: `${store.color}18`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <ExternalLink size={13} color={store.textColor || store.color} />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* ── Healthier Alternatives ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.4 }}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "18px",
                paddingBottom: "0",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                overflow: "hidden",
              }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: "14px" }}>
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      width: "30px", height: "30px", borderRadius: "9px",
                      background: "#F0FDF4", display: "flex", alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Leaf size={15} color="#2ECC71" />
                  </div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>
                    Healthier Alternatives
                  </p>
                </div>
                <button
                  style={{
                    fontSize: "12px", color: "#2ECC71", fontWeight: 600,
                    background: "none", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "2px",
                  }}
                >
                  See All <ChevronRight size={12} />
                </button>
              </div>

              {/* Horizontal scroll */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  overflowX: "auto",
                  paddingBottom: "18px",
                  scrollbarWidth: "none",
                  marginLeft: "-18px",
                  marginRight: "-18px",
                  paddingLeft: "18px",
                  paddingRight: "18px",
                }}
              >
                {ALTERNATIVES.map((alt) => (
                  <motion.div
                    key={alt.id}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      minWidth: "140px",
                      background: "#F9FAFB",
                      borderRadius: "16px",
                      overflow: "hidden",
                      flexShrink: 0,
                      border: "1.5px solid #E5E7EB",
                      cursor: "pointer",
                    }}
                  >
                    {/* Image */}
                    <div style={{ width: "100%", height: "90px", overflow: "hidden", position: "relative" }}>
                      <ImageWithFallback
                        src={alt.image}
                        alt={alt.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      {/* Score overlay */}
                      <div
                        style={{
                          position: "absolute", top: "7px", right: "7px",
                          background: "#2ECC71", borderRadius: "6px",
                          padding: "2px 7px",
                          display: "flex", alignItems: "center", gap: "3px",
                        }}
                      >
                        <span style={{ fontSize: "11px", fontWeight: 800, color: "white" }}>
                          {alt.score}
                        </span>
                      </div>
                    </div>

                    <div style={{ padding: "10px 10px 12px" }}>
                      <p
                        style={{
                          fontSize: "11px", fontWeight: 700, color: "#111827",
                          lineHeight: 1.35, marginBottom: "2px",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical" as const,
                        }}
                      >
                        {alt.name}
                      </p>
                      <p style={{ fontSize: "10px", color: "#9CA3AF", marginBottom: "9px" }}>{alt.brand}</p>

                      {/* View button */}
                      <button
                        onClick={() => navigate(`/product/${alt.id}`)}
                        style={{
                          width: "100%", height: "28px", borderRadius: "8px",
                          background: "#2ECC71", border: "none", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          gap: "4px",
                        }}
                      >
                        <Eye size={11} color="white" />
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "white" }}>View</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>{/* /padding wrapper */}
        </div>{/* /scrollable */}
      </div>
    </MobileFrame>
  );
}
