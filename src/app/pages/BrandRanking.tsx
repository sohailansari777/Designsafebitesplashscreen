import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Search,
  Trophy,
  AlertTriangle,
  ChevronRight,
  Home as HomeIcon,
  ScanLine,
  Bookmark,
  User,
  X,
  Medal,
  TrendingUp,
  TrendingDown,
  Package,
  Star,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { MobileFrame } from "../components/MobileFrame";

// ── Data ──────────────────────────────────────────────────────────────────────

const ALL_BRANDS = [
  {
    id: 1,
    name: "Saffola",
    category: "Edible Oils & Health Food",
    score: 78,
    products: 45,
    trend: "up",
    initials: "SF",
    bg: "#E8FAF0",
    color: "#2ECC71",
    rank: 1,
    tagline: "Heart-healthy oils & oats",
    type: "good",
  },
  {
    id: 2,
    name: "24 Mantra Organic",
    category: "Organic Foods",
    score: 75,
    products: 92,
    trend: "up",
    initials: "24",
    bg: "#EFF6FF",
    color: "#3B82F6",
    rank: 2,
    tagline: "Certified organic range",
    type: "good",
  },
  {
    id: 3,
    name: "Yoga Bar",
    category: "Snacks & Nutrition Bars",
    score: 73,
    products: 38,
    trend: "up",
    initials: "YB",
    bg: "#F5F3FF",
    color: "#7C3AED",
    rank: 3,
    tagline: "Clean label energy bars",
    type: "good",
  },
  {
    id: 4,
    name: "True Elements",
    category: "Superfoods & Seeds",
    score: 71,
    products: 67,
    trend: "up",
    initials: "TE",
    bg: "#FFF7ED",
    color: "#EA580C",
    rank: 4,
    tagline: "Whole grains & seeds",
    type: "good",
  },
  {
    id: 5,
    name: "Organic India",
    category: "Herbal & Organic",
    score: 69,
    products: 110,
    trend: "stable",
    initials: "OI",
    bg: "#F0FDF4",
    color: "#16A34A",
    rank: 5,
    tagline: "Ayurvedic & herbal products",
    type: "good",
  },
  {
    id: 6,
    name: "Maggi",
    category: "Instant Noodles & Seasoning",
    score: 38,
    products: 28,
    trend: "down",
    initials: "MG",
    bg: "#FEF2F2",
    color: "#EF4444",
    rank: 1,
    tagline: "High sodium & refined flour",
    type: "bad",
  },
  {
    id: 7,
    name: "Kurkure",
    category: "Fried Snacks",
    score: 25,
    products: 16,
    trend: "down",
    initials: "KK",
    bg: "#FFF7ED",
    color: "#F97316",
    rank: 2,
    tagline: "Artificial flavors & palm oil",
    type: "bad",
  },
  {
    id: 8,
    name: "Lays",
    category: "Potato Chips",
    score: 30,
    products: 22,
    trend: "down",
    initials: "LY",
    bg: "#FEFCE8",
    color: "#CA8A04",
    rank: 3,
    tagline: "Trans fats & high sodium",
    type: "bad",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function scoreInfo(score: number) {
  if (score >= 70) return { color: "#2ECC71", bg: "#E8FAF0", label: "Excellent" };
  if (score >= 55) return { color: "#22C55E", bg: "#F0FDF4", label: "Good" };
  if (score >= 40) return { color: "#F59E0B", bg: "#FEF3C7", label: "Moderate" };
  return { color: "#EF4444", bg: "#FEE2E2", label: "Poor" };
}

const RANK_META = [
  { medal: "🥇", badgeBg: "linear-gradient(135deg,#FFD700,#FFA500)", shadow: "0 6px 20px rgba(255,200,0,0.40)", label: "Gold" },
  { medal: "🥈", badgeBg: "linear-gradient(135deg,#C0C0C0,#909090)", shadow: "0 6px 20px rgba(150,150,150,0.35)", label: "Silver" },
  { medal: "🥉", badgeBg: "linear-gradient(135deg,#CD7F32,#A0522D)", shadow: "0 6px 20px rgba(180,120,50,0.35)", label: "Bronze" },
];

// ── Brand Logo ─────────────────────────────────────────────────────────────────
function BrandLogo({ brand }: { brand: typeof ALL_BRANDS[0] }) {
  return (
    <div
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "14px",
        background: brand.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        border: `2px solid ${brand.color}28`,
      }}
    >
      <span style={{ fontSize: "14px", fontWeight: 900, color: brand.color, letterSpacing: "-0.5px" }}>
        {brand.initials}
      </span>
    </div>
  );
}

// ── Top Brand Card (Gold / Silver / Bronze) ────────────────────────────────────
function TopBrandCard({ brand, index }: { brand: typeof ALL_BRANDS[0]; index: number }) {
  const meta = RANK_META[brand.rank - 1] ?? RANK_META[2];
  const { color, bg, label } = scoreInfo(brand.score);
  const rankIndex = brand.rank - 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.38, ease: "easeOut" }}
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "14px 14px 14px 12px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: rankIndex === 0 ? "0 4px 20px rgba(255,200,0,0.14)" : "0 2px 12px rgba(0,0,0,0.07)",
        border: rankIndex === 0 ? "1.5px solid #FFD70030" : "1px solid #F3F4F6",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold shimmer accent */}
      {rankIndex === 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg,#FFD700,#FFA500,#FFD700)",
            borderRadius: "18px 18px 0 0",
          }}
        />
      )}

      {/* Rank medal */}
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "10px",
          background: meta.badgeBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: meta.shadow,
        }}
      >
        <span style={{ fontSize: "15px" }}>{meta.medal}</span>
      </div>

      {/* Brand logo */}
      <BrandLogo brand={brand} />

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="flex items-center gap-1.5" style={{ marginBottom: "2px" }}>
          <p style={{ fontSize: "14px", fontWeight: 800, color: "#111827" }}>{brand.name}</p>
          {brand.trend === "up" && <TrendingUp size={12} color="#2ECC71" />}
          {brand.trend === "down" && <TrendingDown size={12} color="#EF4444" />}
        </div>
        <p style={{ fontSize: "10px", color: "#9CA3AF", marginBottom: "7px" }}>{brand.products} Products • {brand.category}</p>

        {/* Progress bar */}
        <div>
          <div
            style={{
              height: "5px",
              borderRadius: "3px",
              background: "#F3F4F6",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${brand.score}%` }}
              transition={{ delay: 0.4 + index * 0.08, duration: 0.8, ease: "easeOut" }}
              style={{
                height: "100%",
                borderRadius: "3px",
                background: `linear-gradient(90deg, ${color}, ${color}BB)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Score + arrow */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", flexShrink: 0 }}>
        <div
          style={{
            background: bg,
            borderRadius: "9px",
            padding: "4px 9px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: 900, color, lineHeight: 1 }}>{brand.score}</span>
          <span style={{ fontSize: "8px", fontWeight: 600, color, marginTop: "1px" }}>/100</span>
        </div>
        <div
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "6px",
            background: "#F9FAFB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ChevronRight size={13} color="#9CA3AF" />
        </div>
      </div>
    </motion.div>
  );
}

// ── Danger Brand Card ──────────────────────────────────────────────────────────
function DangerBrandCard({ brand, index }: { brand: typeof ALL_BRANDS[0]; index: number }) {
  const { color, bg } = scoreInfo(brand.score);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + index * 0.09, duration: 0.38, ease: "easeOut" }}
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "14px 14px 14px 12px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 2px 12px rgba(239,68,68,0.09)",
        border: "1px solid #FEE2E2",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Red left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "20%",
          bottom: "20%",
          width: "3.5px",
          borderRadius: "0 2px 2px 0",
          background: color,
        }}
      />

      {/* Rank number */}
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "10px",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          border: `1.5px solid ${color}30`,
        }}
      >
        <span style={{ fontSize: "13px", fontWeight: 900, color }}>#{brand.rank}</span>
      </div>

      {/* Brand logo */}
      <BrandLogo brand={brand} />

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="flex items-center gap-1.5" style={{ marginBottom: "2px" }}>
          <p style={{ fontSize: "14px", fontWeight: 800, color: "#111827" }}>{brand.name}</p>
          <TrendingDown size={12} color={color} />
        </div>
        <p style={{ fontSize: "10px", color: "#9CA3AF", marginBottom: "7px" }}>
          {brand.products} Products • {brand.tagline}
        </p>

        {/* Progress bar */}
        <div>
          <div
            style={{
              height: "5px",
              borderRadius: "3px",
              background: "#FEE2E2",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${brand.score}%` }}
              transition={{ delay: 0.5 + index * 0.09, duration: 0.8, ease: "easeOut" }}
              style={{
                height: "100%",
                borderRadius: "3px",
                background: `linear-gradient(90deg, ${color}, ${color}BB)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Score */}
      <div
        style={{
          background: bg,
          borderRadius: "9px",
          padding: "4px 9px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "16px", fontWeight: 900, color, lineHeight: 1 }}>{brand.score}</span>
        <span style={{ fontSize: "8px", fontWeight: 600, color, marginTop: "1px" }}>/100</span>
      </div>
    </motion.div>
  );
}

// ── Flat Brand Row (used in "All" / "Best Rated" / "Worst Rated" filtered list) ──
function BrandRow({ brand, index }: { brand: typeof ALL_BRANDS[0]; index: number }) {
  const { color, bg, label } = scoreInfo(brand.score);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.32 }}
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "13px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        border: "1px solid #F3F4F6",
        cursor: "pointer",
      }}
    >
      {/* Rank */}
      <span style={{ fontSize: "13px", fontWeight: 700, color: "#9CA3AF", width: "20px", flexShrink: 0, textAlign: "center" }}>
        #{brand.rank}
      </span>

      <BrandLogo brand={brand} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827", marginBottom: "2px" }}>{brand.name}</p>
        <div className="flex items-center gap-1">
          <Package size={9} color="#9CA3AF" />
          <span style={{ fontSize: "10px", color: "#9CA3AF" }}>{brand.products} products</span>
        </div>
      </div>

      <div
        style={{
          background: bg,
          borderRadius: "9px",
          padding: "4px 9px",
          flexShrink: 0,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: 900, color, lineHeight: 1 }}>{brand.score}</div>
        <div style={{ fontSize: "8px", fontWeight: 600, color }}>{label}</div>
      </div>

      <ChevronRight size={14} color="#D1D5DB" />
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function BrandRanking() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<"all" | "best" | "worst">("all");
  const [activeTab, setActiveTab] = useState("brands");
  const [searchQuery, setSearchQuery] = useState("");

  const NAV_TABS = [
    { id: "home", label: "Home", Icon: HomeIcon },
    { id: "search", label: "Search", Icon: Search },
    { id: "scan", label: "Scan", Icon: ScanLine, isCenter: true },
    { id: "saved", label: "Saved", Icon: Bookmark },
    { id: "profile", label: "Profile", Icon: User },
  ];

  const goodBrands = ALL_BRANDS.filter((b) => b.type === "good");
  const badBrands = ALL_BRANDS.filter((b) => b.type === "bad");

  // Flat filtered list for filter tabs
  const filteredList = useMemo(() => {
    let list = [...ALL_BRANDS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (b) => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)
      );
    }

    if (activeFilter === "best") {
      list = list.filter((b) => b.type === "good").sort((a, b) => b.score - a.score);
      list = list.map((b, i) => ({ ...b, rank: i + 1 }));
    } else if (activeFilter === "worst") {
      list = list.filter((b) => b.type === "bad").sort((a, b) => a.score - b.score);
      list = list.map((b, i) => ({ ...b, rank: i + 1 }));
    } else {
      list = list.sort((a, b) => b.score - a.score).map((b, i) => ({ ...b, rank: i + 1 }));
    }

    return list;
  }, [activeFilter, searchQuery]);

  const showSections = activeFilter === "all" && !searchQuery.trim();

  return (
    <MobileFrame bg="#F5F7FA" topColor="#2ECC71" lightStatusBar>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* ════════ TOP BAR ════════ */}
        <div
          style={{
            background: "linear-gradient(135deg, #2ECC71 0%, #1BAB58 100%)",
            padding: "8px 20px 20px",
            flexShrink: 0,
          }}
        >
          {/* Title row */}
          <div className="flex items-center justify-between" style={{ marginBottom: "14px" }}>
            <button
              onClick={() => navigate("/home")}
              style={{
                width: "38px", height: "38px", borderRadius: "11px",
                background: "rgba(255,255,255,0.18)", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ArrowLeft size={20} color="white" />
            </button>

            <div style={{ textAlign: "center" }}>
              <p style={{ color: "white", fontSize: "17px", fontWeight: 800, lineHeight: 1.1 }}>
                Brand Health Score
              </p>
              <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "11px", marginTop: "2px" }}>
                {ALL_BRANDS.length} brands analysed
              </p>
            </div>

            <div style={{ width: "38px" }} />
          </div>

          {/* Search bar */}
          <div
            style={{
              background: "white",
              borderRadius: "13px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "0 14px",
              height: "44px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            }}
          >
            <Search size={15} color="#9CA3AF" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brands..."
              style={{
                flex: 1, border: "none", outline: "none",
                fontSize: "13px", color: "#374151", background: "transparent",
              }}
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  onClick={() => setSearchQuery("")}
                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                >
                  <X size={14} color="#9CA3AF" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ════════ SCROLLABLE CONTENT ════════ */}
        <div style={{ flex: 1, overflowY: "auto" }}>

          {/* ── Filter tabs ── */}
          <div style={{ padding: "14px 16px 0" }}>
            <div
              style={{
                display: "flex",
                background: "white",
                borderRadius: "12px",
                padding: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                gap: "4px",
              }}
            >
              {[
                { id: "all", label: "All Brands", Icon: Star },
                { id: "best", label: "Best Rated", Icon: ShieldCheck },
                { id: "worst", label: "Worst Rated", Icon: ShieldAlert },
              ].map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setActiveFilter(tab.id as "all" | "best" | "worst")}
                    style={{
                      flex: 1,
                      height: "36px",
                      borderRadius: "9px",
                      background: isActive
                        ? tab.id === "worst" ? "#EF4444" : "#2ECC71"
                        : "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      transition: "background 0.18s",
                      boxShadow: isActive ? "0 3px 10px rgba(0,0,0,0.14)" : "none",
                    }}
                  >
                    <tab.Icon
                      size={11}
                      color={isActive ? "white" : "#9CA3AF"}
                    />
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "white" : "#9CA3AF",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tab.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ── Summary stats row ── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "12px 16px",
            }}
          >
            {[
              { label: "Healthy Brands", value: goodBrands.length, color: "#2ECC71", bg: "#E8FAF0", Icon: ShieldCheck },
              { label: "Avg Score", value: "57", color: "#F59E0B", bg: "#FEF3C7", Icon: Star },
              { label: "Caution Brands", value: badBrands.length, color: "#EF4444", bg: "#FEE2E2", Icon: ShieldAlert },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  flex: 1,
                  background: stat.bg,
                  borderRadius: "12px",
                  padding: "10px 8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                <stat.Icon size={14} color={stat.color} />
                <span style={{ fontSize: "18px", fontWeight: 900, color: stat.color, lineHeight: 1 }}>
                  {stat.value}
                </span>
                <span style={{ fontSize: "9px", fontWeight: 600, color: stat.color, textAlign: "center", lineHeight: 1.2 }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* ── CONDITIONAL: Sections layout vs flat filtered list ── */}
          <div style={{ padding: "0 16px", paddingBottom: "24px" }}>
            <AnimatePresence mode="wait">
              {showSections ? (
                <motion.div
                  key="sections"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                >
                  {/* ── Top Healthy Brands section ── */}
                  <div>
                    {/* Section heading */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          style={{
                            width: "32px", height: "32px", borderRadius: "10px",
                            background: "linear-gradient(135deg,#FFD700,#FFA500)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: "0 4px 12px rgba(255,200,0,0.38)",
                          }}
                        >
                          <Trophy size={16} color="white" />
                        </div>
                        <div>
                          <p style={{ fontSize: "15px", fontWeight: 800, color: "#111827", lineHeight: 1.1 }}>
                            Top Healthy Brands
                          </p>
                          <p style={{ fontSize: "10px", color: "#9CA3AF" }}>Ranked by health score</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveFilter("best")}
                        style={{
                          fontSize: "11px", color: "#2ECC71", fontWeight: 600,
                          background: "none", border: "none", cursor: "pointer",
                          display: "flex", alignItems: "center", gap: "2px",
                        }}
                      >
                        See All <ChevronRight size={11} />
                      </button>
                    </div>

                    {/* Brand cards */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {goodBrands.slice(0, 5).map((brand, i) => (
                        <TopBrandCard key={brand.id} brand={brand} index={i} />
                      ))}
                    </div>
                  </div>

                  {/* ── Brands to Watch Out section ── */}
                  <div>
                    {/* Section heading */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          style={{
                            width: "32px", height: "32px", borderRadius: "10px",
                            background: "linear-gradient(135deg,#EF4444,#DC2626)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: "0 4px 12px rgba(239,68,68,0.35)",
                          }}
                        >
                          <AlertTriangle size={16} color="white" />
                        </div>
                        <div>
                          <p style={{ fontSize: "15px", fontWeight: 800, color: "#111827", lineHeight: 1.1 }}>
                            Brands to Watch Out
                          </p>
                          <p style={{ fontSize: "10px", color: "#9CA3AF" }}>Low health score brands</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveFilter("worst")}
                        style={{
                          fontSize: "11px", color: "#EF4444", fontWeight: 600,
                          background: "none", border: "none", cursor: "pointer",
                          display: "flex", alignItems: "center", gap: "2px",
                        }}
                      >
                        See All <ChevronRight size={11} />
                      </button>
                    </div>

                    {/* Warning banner */}
                    <div
                      style={{
                        background: "linear-gradient(135deg,#FFF5F5,#FEE2E2)",
                        borderRadius: "14px",
                        padding: "12px 14px",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        border: "1px solid #FECACA",
                      }}
                    >
                      <AlertTriangle size={16} color="#EF4444" />
                      <p style={{ fontSize: "12px", color: "#B91C1C", fontWeight: 500, lineHeight: 1.4 }}>
                        These brands consistently score below <strong>40/100</strong>. Consume their products with caution.
                      </p>
                    </div>

                    {/* Danger brand cards */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {badBrands.map((brand, i) => (
                        <DangerBrandCard key={brand.id} brand={brand} index={i} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  {/* List heading */}
                  <div
                    className="flex items-center justify-between"
                    style={{ marginBottom: "12px" }}
                  >
                    <p style={{ fontSize: "13px", color: "#9CA3AF", fontWeight: 500 }}>
                      {filteredList.length} brand{filteredList.length !== 1 ? "s" : ""} found
                    </p>
                    {activeFilter === "best" && (
                      <div className="flex items-center gap-1" style={{ background: "#E8FAF0", borderRadius: "7px", padding: "3px 9px" }}>
                        <TrendingUp size={10} color="#2ECC71" />
                        <span style={{ fontSize: "10px", color: "#2ECC71", fontWeight: 600 }}>Best Rated</span>
                      </div>
                    )}
                    {activeFilter === "worst" && (
                      <div className="flex items-center gap-1" style={{ background: "#FEE2E2", borderRadius: "7px", padding: "3px 9px" }}>
                        <TrendingDown size={10} color="#EF4444" />
                        <span style={{ fontSize: "10px", color: "#EF4444", fontWeight: 600 }}>Worst Rated</span>
                      </div>
                    )}
                  </div>

                  {filteredList.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center", padding: "48px 20px",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "60px", height: "60px", borderRadius: "18px",
                          background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        <Search size={28} color="#D1D5DB" />
                      </div>
                      <p style={{ fontSize: "15px", fontWeight: 700, color: "#374151" }}>No brands found</p>
                      <p style={{ fontSize: "13px", color: "#9CA3AF" }}>Try a different search term</p>
                      <button
                        onClick={() => setSearchQuery("")}
                        style={{
                          marginTop: "4px", background: "#2ECC71", border: "none",
                          borderRadius: "10px", padding: "9px 20px", cursor: "pointer",
                        }}
                      >
                        <span style={{ color: "white", fontSize: "13px", fontWeight: 700 }}>Clear Search</span>
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {filteredList.map((brand, i) => (
                        <BrandRow key={brand.id} brand={brand} index={i} />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ════════ BOTTOM NAV ════════ */}
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
            zIndex: 20,
          }}
        >
          {NAV_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const isCenter = tab.isCenter;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === "scan") navigate("/scan");
                  else if (tab.id === "home") navigate("/home");
                  else if (tab.id === "search") navigate("/products");
                  else setActiveTab(tab.id);
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
                  ...(isCenter ? { marginBottom: "4px" } : {}),
                }}
              >
                {isCenter ? (
                  <div
                    style={{
                      width: "52px", height: "52px", borderRadius: "16px",
                      background: "linear-gradient(135deg, #2ECC71 0%, #1BAB58 100%)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 6px 18px rgba(46,204,113,0.40)",
                      marginBottom: "4px",
                    }}
                  >
                    <tab.Icon size={24} color="white" strokeWidth={2} />
                  </div>
                ) : (
                  <div
                    style={{
                      width: "28px", height: "28px", borderRadius: "8px",
                      background: isActive ? "#E8FAF0" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <tab.Icon size={20} color={isActive ? "#2ECC71" : "#9CA3AF"} strokeWidth={isActive ? 2.2 : 1.8} />
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
