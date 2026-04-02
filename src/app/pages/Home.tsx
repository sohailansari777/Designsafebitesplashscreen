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
    <MobileFrame bg="#F5F7FA">
      {/* ── STATUS BAR color fix: white text on green ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* ════════════════════ HEADER ════════════════════ */}
        <div
          style={{
            background: "linear-gradient(135deg, #2ECC71 0%, #1BAB58 100%)",
            padding: "0 20px 0",
            flexShrink: 0,
          }}
        >
          {/* Top row */}
          <div
            className="flex items-center justify-between"
            style={{ paddingBottom: "14px", paddingTop: "6px" }}
          >
            {/* Hamburger */}
            <button
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
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

            {/* App name */}
            <div className="flex items-center gap-1.5">
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ScanLine size={16} color="white" />
              </div>
              <span style={{ color: "white", fontSize: "20px", fontWeight: 800, letterSpacing: "-0.3px" }}>
                SafeBite
              </span>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-2">
              {/* Notification bell */}
              <button
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
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
                {/* Badge dot */}
                <span
                  style={{
                    position: "absolute",
                    top: "7px",
                    right: "8px",
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#FF4757",
                    border: "1.5px solid #1BAB58",
                  }}
                />
              </button>

              {/* Avatar */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid rgba(255,255,255,0.5)",
                  flexShrink: 0,
                  background: "rgba(255,255,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <User size={18} color="white" />
              </div>
            </div>
          </div>

          {/* ── Search bar (sits on green, bleeds into white) ── */}
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
              boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
            }}
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
              }}
            />
          </div>
        </div>

        {/* ════════════════════ SCROLLABLE CONTENT ════════════════════ */}
        <div style={{ flex: 1, overflowY: "auto", paddingTop: "30px" }}>

          {/* ── SCAN BUTTON CARD ── */}
          <div style={{ padding: "0 18px", marginBottom: "22px" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #2ECC71 0%, #1BAB58 60%, #159B48 100%)",
                borderRadius: "20px",
                padding: "22px 24px",
                display: "flex",
                alignItems: "center",
                gap: "18px",
                boxShadow: "0 8px 28px rgba(46,204,113,0.38)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative circles */}
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  right: "30px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  backdropFilter: "blur(4px)",
                }}
              >
                <ScanLine size={36} color="white" strokeWidth={1.8} />
              </div>

              {/* Text */}
              <div>
                <p style={{ color: "white", fontSize: "20px", fontWeight: 800, lineHeight: 1.2 }}>
                  Scan Product
                </p>
                <p style={{ color: "rgba(255,255,255,0.80)", fontSize: "13px", marginTop: "4px" }}>
                  Check if it's safe to eat
                </p>
                <div
                  style={{
                    marginTop: "12px",
                    background: "rgba(255,255,255,0.22)",
                    borderRadius: "8px",
                    padding: "5px 12px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span style={{ color: "white", fontSize: "12px", fontWeight: 600 }}>Tap to scan</span>
                  <ChevronRight size={13} color="white" />
                </div>
              </div>
            </div>
          </div>

          {/* ── TODAY'S HEALTHY PICKS ── */}
          <div style={{ marginBottom: "22px" }}>
            <div
              className="flex items-center justify-between"
              style={{ padding: "0 18px", marginBottom: "12px" }}
            >
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>
                Today's Healthy Picks
              </p>
              <button
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

            {/* Horizontal scroll */}
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
                  style={{
                    minWidth: "140px",
                    background: "white",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                    flexShrink: 0,
                    cursor: "pointer",
                  }}
                >
                  {/* Image */}
                  <div style={{ width: "100%", height: "100px", overflow: "hidden", position: "relative" }}>
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {/* Score badge overlay */}
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                      }}
                    >
                      <ScoreBadge score={item.score} />
                    </div>
                  </div>
                  {/* Info */}
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

          {/* ── CATEGORIES ── */}
          <div style={{ padding: "0 18px", marginBottom: "22px" }}>
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: "12px" }}
            >
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>Categories</p>
              <button
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
                  style={{
                    background: "white",
                    borderRadius: "14px",
                    padding: "14px 8px 12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
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
          <div style={{ padding: "0 18px", paddingBottom: "20px" }}>
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: "12px" }}
            >
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>
                Recently Scanned
              </p>
              <button
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
                  style={{
                    background: "white",
                    borderRadius: "14px",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                    cursor: "pointer",
                  }}
                >
                  {/* Thumbnail */}
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

                  {/* Info */}
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

                  {/* Score badge */}
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
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        color: item.scoreColor,
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
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
            borderTop: "1px solid #F3F4F6",
            paddingBottom: "20px",
            paddingTop: "6px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-end",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.05)",
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
                      width: "52px",
                      height: "52px",
                      borderRadius: "16px",
                      background: isActive
                        ? "linear-gradient(135deg, #2ECC71 0%, #1BAB58 100%)"
                        : "linear-gradient(135deg, #2ECC71 0%, #1BAB58 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 6px 18px rgba(46,204,113,0.40)",
                      marginBottom: "4px",
                    }}
                  >
                    <tab.Icon size={24} color="white" strokeWidth={2} />
                  </div>
                ) : (
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
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