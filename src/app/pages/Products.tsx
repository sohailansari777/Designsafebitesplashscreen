import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Search,
  ScanLine,
  Home as HomeIcon,
  Bookmark,
  User,
  ChevronDown,
  Star,
  ShoppingBag,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { MobileFrame } from "../components/MobileFrame";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// ── Data ──────────────────────────────────────────────────────────────────────

const FILTER_CHIPS = [
  { id: "all", label: "All" },
  { id: "score70", label: "Score > 70" },
  { id: "noPalmOil", label: "No Palm Oil" },
  { id: "lowSugar", label: "Low Sugar" },
  { id: "highProtein", label: "High Protein" },
  { id: "organic", label: "Organic" },
];

const CATEGORY_TABS = [
  { id: "all", label: "All" },
  { id: "snacks", label: "Snacks" },
  { id: "beverages", label: "Beverages" },
  { id: "dairy", label: "Dairy" },
  { id: "baby", label: "Baby Food" },
  { id: "instant", label: "Instant" },
];

const SORT_OPTIONS = [
  "Best Score",
  "Lowest Price",
  "Highest Rated",
  "Most Popular",
];

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Nature Valley Granola Bar",
    brand: "General Mills",
    category: "snacks",
    score: 82,
    rating: 4.5,
    ratingCount: 2341,
    price: "₹150",
    tags: ["noPalmOil", "score70"],
    image: "https://images.unsplash.com/photo-1621057621391-7ed446a24b41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  },
  {
    id: 2,
    name: "Alpro Almond Milk",
    brand: "Alpro",
    category: "beverages",
    score: 91,
    rating: 4.7,
    ratingCount: 1876,
    price: "₹220",
    tags: ["organic", "score70", "noPalmOil", "lowSugar"],
    image: "https://images.unsplash.com/photo-1601436423474-51738541c1b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  },
  {
    id: 3,
    name: "Chobani Greek Yogurt",
    brand: "Chobani",
    category: "dairy",
    score: 88,
    rating: 4.6,
    ratingCount: 3102,
    price: "₹180",
    tags: ["score70", "highProtein", "lowSugar"],
    image: "https://images.unsplash.com/photo-1571230389215-b34a89739ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  },
  {
    id: 4,
    name: "Lindt 85% Dark Chocolate",
    brand: "Lindt",
    category: "snacks",
    score: 74,
    rating: 4.4,
    ratingCount: 987,
    price: "₹299",
    tags: ["score70", "noPalmOil", "lowSugar"],
    image: "https://images.unsplash.com/photo-1772985193807-41c0d4bba3eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  },
  {
    id: 5,
    name: "HiPP Organic Baby Puree",
    brand: "HiPP",
    category: "baby",
    score: 95,
    rating: 4.9,
    ratingCount: 654,
    price: "₹340",
    tags: ["organic", "score70", "noPalmOil", "lowSugar"],
    image: "https://images.unsplash.com/photo-1548289227-b7d966b70003?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  },
  {
    id: 6,
    name: "Optimum Nutrition Whey",
    brand: "ON Gold Standard",
    category: "snacks",
    score: 78,
    rating: 4.6,
    ratingCount: 5421,
    price: "₹3499",
    tags: ["score70", "highProtein"],
    image: "https://images.unsplash.com/photo-1693996045899-7cf0ac0229c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  },
  {
    id: 7,
    name: "Happilo Trail Mix",
    brand: "Happilo",
    category: "snacks",
    score: 86,
    rating: 4.3,
    ratingCount: 1230,
    price: "₹199",
    tags: ["score70", "noPalmOil", "highProtein"],
    image: "https://images.unsplash.com/photo-1693812879565-c0cf703dd7b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function scoreInfo(score: number) {
  if (score >= 75) return { color: "#2ECC71", bg: "#E8FAF0", label: "Good" };
  if (score >= 50) return { color: "#F59E0B", bg: "#FEF3C7", label: "Moderate" };
  return { color: "#EF4444", bg: "#FEE2E2", label: "Avoid" };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = rating >= s;
        const half = !filled && rating >= s - 0.5;
        return (
          <div key={s} style={{ position: "relative", width: "11px", height: "11px" }}>
            <Star size={11} color="#E5E7EB" fill="#E5E7EB" />
            {(filled || half) && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  overflow: "hidden",
                  width: half ? "50%" : "100%",
                }}
              >
                <Star size={11} color="#F59E0B" fill="#F59E0B" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({
  product,
  index,
  onPress,
}: {
  product: (typeof ALL_PRODUCTS)[0];
  index: number;
  onPress: () => void;
}) {
  const { color, bg, label } = scoreInfo(product.score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.36, ease: "easeOut" }}
      whileTap={{ scale: 0.985 }}
      onClick={onPress}
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "13px",
        display: "flex",
        gap: "13px",
        boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
        cursor: "pointer",
        border: "1px solid #F3F4F6",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: "84px",
          height: "90px",
          borderRadius: "13px",
          overflow: "hidden",
          flexShrink: 0,
          background: "#F9FAFB",
          position: "relative",
        }}
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* Top row: name + score badge */}
        <div>
          <div className="flex items-start justify-between gap-1" style={{ marginBottom: "3px" }}>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1.3,
                flex: 1,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical" as const,
              }}
            >
              {product.name}
            </p>
            {/* Score badge */}
            <div
              style={{
                background: bg,
                borderRadius: "8px",
                padding: "3px 7px",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: "4px",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: 900, color, lineHeight: 1 }}>{product.score}</span>
              <span style={{ fontSize: "8px", fontWeight: 600, color, lineHeight: 1.2, marginTop: "1px" }}>{label}</span>
            </div>
          </div>

          <p style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "6px" }}>{product.brand}</p>

          {/* Rating row */}
          <div className="flex items-center gap-1.5" style={{ marginBottom: "8px" }}>
            <StarRating rating={product.rating} />
            <span style={{ fontSize: "10px", color: "#6B7280", fontWeight: 500 }}>
              {product.rating} ({product.ratingCount.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Bottom row: price + store buttons */}
        <div className="flex items-center justify-between">
          <span style={{ fontSize: "15px", fontWeight: 800, color: "#111827" }}>{product.price}</span>

          <div className="flex gap-1.5">
            {/* Amazon button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                height: "26px",
                paddingLeft: "9px",
                paddingRight: "9px",
                borderRadius: "7px",
                background: "#FFF8EE",
                border: "1px solid #FF990030",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <span style={{ fontSize: "10px", fontWeight: 800, color: "#FF9900" }}>A</span>
              <span style={{ fontSize: "10px", fontWeight: 600, color: "#FF9900" }}>Amazon</span>
            </motion.button>

            {/* Flipkart button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                height: "26px",
                paddingLeft: "9px",
                paddingRight: "9px",
                borderRadius: "7px",
                background: "#EEF4FF",
                border: "1px solid #2874F030",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <span style={{ fontSize: "10px", fontWeight: 800, color: "#2874F0" }}>F</span>
              <span style={{ fontSize: "10px", fontWeight: 600, color: "#2874F0" }}>Flipkart</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Sort Dropdown ─────────────────────────────────────────────────────────────
function SortDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          height: "34px",
          paddingLeft: "12px",
          paddingRight: "10px",
          borderRadius: "9px",
          background: "white",
          border: "1.5px solid #E5E7EB",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        <SlidersHorizontal size={12} color="#374151" />
        <span style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Sort: </span>
        <span style={{ fontSize: "12px", fontWeight: 700, color: "#2ECC71" }}>{value}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={13} color="#6B7280" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              right: 0,
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 8px 28px rgba(0,0,0,0.14)",
              border: "1px solid #F3F4F6",
              overflow: "hidden",
              zIndex: 50,
              minWidth: "155px",
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  background: value === opt ? "#F0FDF4" : "white",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                }}
              >
                <span style={{ fontSize: "13px", fontWeight: value === opt ? 700 : 500, color: value === opt ? "#2ECC71" : "#374151" }}>
                  {opt}
                </span>
                {value === opt && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2ECC71" }} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Products() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("Best Score");
  const [activeTab, setActiveTab] = useState("search");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const NAV_TABS = [
    { id: "home", label: "Home", Icon: HomeIcon },
    { id: "search", label: "Search", Icon: Search },
    { id: "scan", label: "Scan", Icon: ScanLine, isCenter: true },
    { id: "saved", label: "Saved", Icon: Bookmark },
    { id: "profile", label: "Profile", Icon: User },
  ];

  // Filter + sort logic
  const filtered = useMemo(() => {
    let list = ALL_PRODUCTS;

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }

    // Category
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Filter chip
    if (activeFilter !== "all") {
      list = list.filter((p) => p.tags.includes(activeFilter));
    }

    // Sort
    if (sortBy === "Best Score") list = [...list].sort((a, b) => b.score - a.score);
    else if (sortBy === "Lowest Price") {
      list = [...list].sort((a, b) => parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, "")));
    } else if (sortBy === "Highest Rated") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Most Popular") {
      list = [...list].sort((a, b) => b.ratingCount - a.ratingCount);
    }

    return list;
  }, [activeFilter, activeCategory, sortBy, searchQuery]);

  return (
    <MobileFrame bg="#F5F7FA" topColor="#2ECC71" lightStatusBar>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* ════════ TOP BAR ════════ */}
        <div
          style={{
            background: "linear-gradient(135deg, #2ECC71 0%, #1BAB58 100%)",
            padding: "8px 20px 14px",
            flexShrink: 0,
          }}
        >
          <div className="flex items-center justify-between">
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

            <span style={{ color: "white", fontSize: "18px", fontWeight: 800, letterSpacing: "-0.3px" }}>
              Products
            </span>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen((o) => !o)}
              style={{
                width: "38px", height: "38px", borderRadius: "11px",
                background: searchOpen ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.18)",
                border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
            >
              {searchOpen ? <X size={18} color="white" /> : <Search size={18} color="white" />}
            </motion.button>
          </div>

          {/* Search bar (expandable) */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: "hidden", marginTop: "12px" }}
              >
                <div
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "0 14px",
                    height: "42px",
                  }}
                >
                  <Search size={15} color="#9CA3AF" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products or brands..."
                    style={{
                      flex: 1, border: "none", outline: "none",
                      fontSize: "13px", color: "#374151", background: "transparent",
                    }}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                      <X size={13} color="#9CA3AF" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ════════ SCROLLABLE CONTENT ════════ */}
        <div style={{ flex: 1, overflowY: "auto" }}>

          {/* ── Filter chips ── */}
          <div style={{ paddingTop: "14px", paddingBottom: "4px" }}>
            <div
              style={{
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                paddingLeft: "16px",
                paddingRight: "16px",
                scrollbarWidth: "none",
              }}
            >
              {FILTER_CHIPS.map((chip) => {
                const isActive = activeFilter === chip.id;
                return (
                  <motion.button
                    key={chip.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(chip.id)}
                    style={{
                      flexShrink: 0,
                      height: "32px",
                      paddingLeft: "13px",
                      paddingRight: "13px",
                      borderRadius: "20px",
                      background: isActive ? "#2ECC71" : "white",
                      border: `1.5px solid ${isActive ? "#2ECC71" : "#E5E7EB"}`,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      boxShadow: isActive ? "0 4px 12px rgba(46,204,113,0.30)" : "0 1px 4px rgba(0,0,0,0.05)",
                      transition: "all 0.18s",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "white" : "#6B7280",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {chip.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ── Sort row ── */}
          <div
            className="flex items-center justify-between"
            style={{ padding: "10px 16px 4px" }}
          >
            <span style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: 500 }}>
              {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
            </span>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          {/* ── Category tabs ── */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "10px",
              paddingBottom: "12px",
              scrollbarWidth: "none",
            }}
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(tab.id)}
                  style={{
                    flexShrink: 0,
                    height: "34px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    borderRadius: "9px",
                    background: isActive ? "#2ECC71" : "white",
                    border: `1.5px solid ${isActive ? "#2ECC71" : "#E5E7EB"}`,
                    cursor: "pointer",
                    boxShadow: isActive ? "0 4px 14px rgba(46,204,113,0.35)" : "0 1px 4px rgba(0,0,0,0.05)",
                    transition: "all 0.18s",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "white" : "#6B7280",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* ── Product list ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingBottom: "90px", // space for FAB + nav
            }}
          >
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: "center",
                  padding: "50px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "60px", height: "60px", borderRadius: "18px",
                    background: "#F3F4F6", display: "flex",
                    alignItems: "center", justifyContent: "center",
                  }}
                >
                  <ShoppingBag size={28} color="#D1D5DB" />
                </div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#374151" }}>No products found</p>
                <p style={{ fontSize: "13px", color: "#9CA3AF" }}>Try changing your filters</p>
                <button
                  onClick={() => { setActiveFilter("all"); setActiveCategory("all"); setSearchQuery(""); }}
                  style={{
                    marginTop: "4px",
                    background: "#2ECC71", border: "none", borderRadius: "10px",
                    padding: "9px 20px", cursor: "pointer",
                  }}
                >
                  <span style={{ color: "white", fontSize: "13px", fontWeight: 700 }}>Reset Filters</span>
                </button>
              </motion.div>
            ) : (
              filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  onPress={() => navigate(`/product/${product.id}`)}
                />
              ))
            )}
          </div>
        </div>

        {/* ════════ FLOATING ACTION BUTTON ════════ */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 18 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/scan")}
          style={{
            position: "absolute",
            bottom: "82px",
            right: "18px",
            width: "52px",
            height: "52px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #2ECC71 0%, #1BAB58 100%)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 6px 22px rgba(46,204,113,0.45)",
            zIndex: 30,
          }}
        >
          <ScanLine size={24} color="white" strokeWidth={2} />
        </motion.button>

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
            position: "relative",
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
                      background: "linear-gradient(135deg, #2ECC71 0%, #1BAB58 100%)",
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
