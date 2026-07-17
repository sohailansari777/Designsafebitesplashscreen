import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Menu,
  Bell,
  Search,
  ScanLine,
  Home as HomeIcon,
  Bookmark,
  User,
  ChevronRight,
  Cookie,
  Coffee,
  Droplets,
  Baby,
  Zap,
  Sunrise,
  Star,
  Award,
} from "lucide-react";
import { MobileFrame } from "../components/MobileFrame";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// ── Data ──────────────────────────────────────────────────────────────────────

const HEALTHY_PICKS = [
  {
    id: 1,
    name: "Nature Granola Bar",
    brand: "Nature's Path",
    score: 91,
    image:
      "https://images.unsplash.com/photo-1558021984-46774cdb0e83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    id: 2,
    name: "Green Smoothie",
    brand: "Suja Organic",
    score: 88,
    image:
      "https://images.unsplash.com/photo-1759006249055-8c4030a2d56a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    id: 3,
    name: "Mixed Nuts Pack",
    brand: "Planters",
    score: 85,
    image:
      "https://images.unsplash.com/photo-1769255484233-94ece98f722d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
];

const CATEGORIES = [
  { id: "snacks", label: "Snacks", Icon: Cookie, color: "#FFF3E0", iconColor: "#F57C00" },
  { id: "beverages", label: "Beverages", Icon: Coffee, color: "#E3F2FD", iconColor: "#1565C0" },
  { id: "dairy", label: "Dairy", Icon: Droplets, color: "#F3E5F5", iconColor: "#7B1FA2" },
  { id: "baby", label: "Baby Food", Icon: Baby, color: "#FCE4EC", iconColor: "#C62828" },
  { id: "instant", label: "Instant Food", Icon: Zap, color: "#FFF8E1", iconColor: "#F9A825" },
  { id: "breakfast", label: "Breakfast", Icon: Sunrise, color: "#E8F5E9", iconColor: "#2E7D32" },
];

const RECENT_SCANS = [
  {
    id: 1,
    name: "Organic Granola Bar",
    brand: "Nature's Path",
    score: 87,
    label: "Good",
    scoreColor: "#2ECC71",
    scoreBg: "#E8FAF0",
    image:
      "https://images.unsplash.com/photo-1622484212850-eb596d769edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
  {
    id: 2,
    name: "Greek Yogurt Plain",
    brand: "Chobani",
    score: 92,
    label: "Excellent",
    scoreColor: "#2ECC71",
    scoreBg: "#E8FAF0",
    image:
      "https://images.unsplash.com/photo-1763825613390-287a9db0803d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
  {
    id: 3,
    name: "Cheddar Cheese Crackers",
    brand: "Goldfish",
    score: 54,
    label: "Moderate",
    scoreColor: "#F59E0B",
    scoreBg: "#FEF3C7",
    image:
      "https://images.unsplash.com/photo-1561239781-615abe0878db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
  {
    id: 4,
    name: "Diet Cola Zero",
    brand: "Coca-Cola Zero",
    score: 31,
    label: "Avoid",
    scoreColor: "#EF4444",
    scoreBg: "#FEE2E2",
    image:
      "https://images.unsplash.com/photo-1622484212850-eb596d769edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
];

const NAV_TABS = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "search", label: "Search", Icon: Search },
  { id: "scan", label: "Scan", Icon: ScanLine, isCenter: true },
  { id: "saved", label: "Saved", Icon: Bookmark },
  { id: "profile", label: "Profile", Icon: User },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// ── Score badge ───────────────────────────────────────────────────────────────
function ScoreBadge({ score }: { score: number }) {
  const color = score >= 75 ? "#2ECC71" : score >= 50 ? "#F59E0B" : "#EF4444";
  const bg = score >= 75 ? "#E8FAF0" : score >= 50 ? "#FEF3C7" : "#FEE2E2";
  return (
    <div
      style={{
        background: bg,
        borderRadius: "8px",
        padding: "3px 8px",
        display: "flex",
        alignItems: "center",
        gap: "3px",
      }}
    >
      <Star size={9} color={color} fill={color} />
      <span style={{ fontSize: "12px", fontWeight: 700, color }}>{score}</span>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  return (
    <MobileFrame bg="#F5F7FA" topColor="#2ECC71" lightStatusBar>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* ════════════════════ HEADER ════════════════════ */}
        <div
          style={{
            background: "linear-gradient(150deg, #34D06A 0%, #2ECC71 40%, #27AE60 100%)",
            padding: "0 20px 0",
            flexShrink: 0,
          }}
        >
          {/* Top row */}
          <div
            className="flex items-center justify-between"
            style={{ paddingBottom: "10px", paddingTop: "4px" }}
          >
            {/* Hamburger */}
            <button
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "11px",
                background: "rgba(255,255,255,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Menu size={20} color="white" />
            </button>

            {/* Greeting + app name */}
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.2px" }}>
                {getGreeting()}, Priya 👋
              </p>
              <div className="flex items-center gap-1.5" style={{ justifyContent: "center" }}>
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "7px",
                    background: "rgba(255,255,255,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ScanLine size={13} color="white" />
                </div>
                <span style={{ color: "white", fontSize: "18px", fontWeight: 800, letterSpacing: "-0.4px" }}>
                  SafeBite
                </span>
              </div>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-2">
              <button
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "11px",
                  background: "rgba(255,255,255,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <Bell size={18} color="white" />
                <span
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "9px",
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#FF4757",
                    border: "1.5px solid #27AE60",
                  }}
                />
              </button>

              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid rgba(255,255,255,0.45)",
                  flexShrink: 0,
                  background: "rgba(255,255,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <User size={18} color="white" />
              </div>
            </div>
          </div>

          {/* ── Health streak pill ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "18px",
              marginBottom: "16px",
            }}
          >
            {[
              { label: "Scans Today", value: "4", icon: "📷" },
              { label: "Avg Score", value: "76", icon: "⭐" },
              { label: "Avoided", value: "2", icon: "🚫" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(255,255,255,0.14)",
                  borderRadius: "20px",
                  padding: "5px 10px 5px 8px",
                }}
              >
                <span style={{ fontSize: "13px" }}>{stat.icon}</span>
                <div>
                  <p style={{ color: "white", fontSize: "13px", fontWeight: 800, lineHeight: 1 }}>{stat.value}</p>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "9px", fontWeight: 500, lineHeight: 1.2 }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Search bar (bleeds into content) ── */}
          <div
            style={{
              background: "white",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "0 14px",
              height: "46px",
              marginBottom: "-20px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              cursor: "pointer",
            }}
            onClick={() => navigate("/products")}
          >
            <Search size={17} color="#9CA3AF" />
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products or brands..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "13px",
                color: "#374151",
                background: "transparent",
                cursor: "pointer",
              }}
              readOnly
            />
            <div
              style={{
                background: "#2ECC71",
                borderRadius: "8px",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Search size={13} color="white" />
            </div>
          </div>
        </div>

        {/* ════════════════════ SCROLLABLE CONTENT ════════════════════ */}
        <div style={{ flex: 1, overflowY: "auto", paddingTop: "30px" }}>

          {/* ── SCAN BUTTON CARD ── */}
          <div style={{ padding: "0 18px", marginBottom: "24px" }}>
            <div
              onClick={() => navigate("/scan")}
              style={{
                background: "linear-gradient(135deg, #2ECC71 0%, #1BAB58 60%, #138F44 100%)",
                borderRadius: "22px",
                padding: "22px 24px",
                display: "flex",
                alignItems: "center",
                gap: "18px",
                boxShadow: "0 10px 32px rgba(46,204,113,0.40)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative circles */}
              <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "110px", height: "110px", borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
              <div style={{ position: "absolute", bottom: "-30px", right: "40px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />

              {/* Icon */}
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  backdropFilter: "blur(4px)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25)",
                }}
              >
                <ScanLine size={36} color="white" strokeWidth={1.7} />
              </div>

              {/* Text */}
              <div>
                <p style={{ color: "white", fontSize: "20px", fontWeight: 800, lineHeight: 1.15 }}>
                  Scan a Product
                </p>
                <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "13px", marginTop: "5px", lineHeight: 1.4 }}>
                  Get instant health analysis
                </p>
                <div
                  style={{
                    marginTop: "13px",
                    background: "rgba(255,255,255,0.22)",
                    borderRadius: "8px",
                    padding: "5px 13px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <span style={{ color: "white", fontSize: "12px", fontWeight: 600 }}>Tap to scan</span>
                  <ChevronRight size={12} color="white" />
                </div>
              </div>
            </div>
          </div>

          {/* ── TODAY'S HEALTHY PICKS ── */}
          <div style={{ marginBottom: "24px" }}>
            <div
              className="flex items-center justify-between"
              style={{ padding: "0 18px", marginBottom: "12px" }}
            >
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>
                Today's Healthy Picks
              </p>
              <button
                onClick={() => navigate("/products")}
                style={{
                  fontSize: "13px",
                  color: "#2ECC71",
                  fontWeight: 600,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                See All <ChevronRight size={13} />
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                overflowX: "auto",
                paddingLeft: "18px",
                paddingRight: "18px",
                paddingBottom: "6px",
                scrollbarWidth: "none",
              }}
            >
              {HEALTHY_PICKS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/product/${item.id}`)}
                  style={{
                    minWidth: "140px",
                    background: "white",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 2px 14px rgba(0,0,0,0.08)",
                    flexShrink: 0,
                    cursor: "pointer",
                    border: "1px solid rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ width: "100%", height: "100px", overflow: "hidden", position: "relative" }}>
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                      <ScoreBadge score={item.score} />
                    </div>
                  </div>
                  <div style={{ padding: "10px 10px 12px" }}>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#111827",
                        lineHeight: 1.3,
                        marginBottom: "3px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical" as const,
                      }}
                    >
                      {item.name}
                    </p>
                    <p style={{ fontSize: "10px", color: "#9CA3AF" }}>{item.brand}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── BRAND RANKING CTA ── */}
          <div style={{ padding: "0 18px", marginBottom: "24px" }}>
            <div
              onClick={() => navigate("/brands")}
              style={{
                background: "linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%)",
                borderRadius: "18px",
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", right: "-10px", top: "-10px", width: "90px", height: "90px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "13px",
                  background: "rgba(255,255,255,0.14)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Award size={22} color="#FFD700" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: "white", fontSize: "15px", fontWeight: 800, marginBottom: "3px" }}>Brand Health Rankings</p>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "12px" }}>See which brands to trust</p>
              </div>
              <ChevronRight size={18} color="rgba(255,255,255,0.5)" />
            </div>
          </div>

          {/* ── CATEGORIES ── */}
          <div style={{ padding: "0 18px", marginBottom: "24px" }}>
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: "12px" }}
            >
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>Categories</p>
              <button
                onClick={() => navigate("/products")}
                style={{
                  fontSize: "13px",
                  color: "#2ECC71",
                  fontWeight: 600,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                See All <ChevronRight size={13} />
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
              }}
            >
              {CATEGORIES.map(({ id, label, Icon, color, iconColor }) => (
                <button
                  key={id}
                  onClick={() => navigate("/products")}
                  style={{
                    background: "white",
                    borderRadius: "14px",
                    padding: "14px 8px 12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    border: "1px solid rgba(0,0,0,0.04)",
                    cursor: "pointer",
                    boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      background: color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={20} color={iconColor} />
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#374151" }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── RECENTLY SCANNED ── */}
          <div style={{ padding: "0 18px", paddingBottom: "28px" }}>
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: "12px" }}
            >
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>
                Recently Scanned
              </p>
              <button
                onClick={() => navigate("/products")}
                style={{
                  fontSize: "13px",
                  color: "#2ECC71",
                  fontWeight: 600,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                See All <ChevronRight size={13} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {RECENT_SCANS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/product/${item.id}`)}
                  style={{
                    background: "white",
                    borderRadius: "14px",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                    cursor: "pointer",
                    border: "1px solid rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "#F3F4F6",
                    }}
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#111827",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name}
                    </p>
                    <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>{item.brand}</p>
                  </div>

                  <div style={{ flexShrink: 0, textAlign: "center" }}>
                    <div
                      style={{
                        background: item.scoreBg,
                        borderRadius: "10px",
                        padding: "5px 10px",
                        marginBottom: "3px",
                      }}
                    >
                      <span style={{ fontSize: "16px", fontWeight: 800, color: item.scoreColor }}>
                        {item.score}
                      </span>
                    </div>
                    <span style={{ fontSize: "10px", fontWeight: 600, color: item.scoreColor }}>
                      {item.label}
                    </span>
                  </div>

                  <ChevronRight size={14} color="#D1D5DB" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════ BOTTOM NAV ════════════════════ */}
        <div
          style={{
            flexShrink: 0,
            background: "white",
            borderTop: "1px solid #F0F0F0",
            paddingBottom: "22px",
            paddingTop: "6px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-end",
            boxShadow: "0 -6px 24px rgba(0,0,0,0.06)",
          }}
        >
          {NAV_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const isCenter = tab.isCenter;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === "scan") {
                    navigate("/scan");
                  } else if (tab.id === "search") {
                    navigate("/products");
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: isCenter ? "0" : "3px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 10px",
                  position: "relative",
                  ...(isCenter ? { marginBottom: "4px" } : {}),
                }}
              >
                {isCenter ? (
                  <div
                    style={{
                      width: "54px",
                      height: "54px",
                      borderRadius: "18px",
                      background: "linear-gradient(135deg, #2ECC71 0%, #1BAB58 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 6px 20px rgba(46,204,113,0.45)",
                      marginBottom: "4px",
                    }}
                  >
                    <tab.Icon size={24} color="white" strokeWidth={2} />
                  </div>
                ) : (
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "9px",
                      background: isActive ? "#E8FAF0" : "transparent",
                      transition: "background 0.15s",
                    }}
                  >
                    <tab.Icon
                      size={20}
                      color={isActive ? "#2ECC71" : "#9CA3AF"}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                  </div>
                )}
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: isActive || isCenter ? 600 : 400,
                    color: isCenter ? "#2ECC71" : isActive ? "#2ECC71" : "#9CA3AF",
                    lineHeight: 1,
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </MobileFrame>
  );
}
