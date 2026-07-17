import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Zap,
  ZapOff,
  Search,
  ScanLine,
  Clock,
  ChevronRight,
  X,
  CheckCircle2,
} from "lucide-react";
import { MobileFrame } from "../components/MobileFrame";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// ── Recent scans data ─────────────────────────────────────────────────────────
const RECENT = [
  {
    id: 1,
    name: "Granola Bar",
    brand: "Nature's Path",
    score: 87,
    scoreColor: "#2ECC71",
    scoreBg: "#E8FAF0",
    image:
      "https://images.unsplash.com/photo-1667810020794-a838e629ba1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
  {
    id: 2,
    name: "Green Smoothie",
    brand: "Suja Organic",
    score: 91,
    scoreColor: "#2ECC71",
    scoreBg: "#E8FAF0",
    image:
      "https://images.unsplash.com/photo-1759006249055-8c4030a2d56a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
  {
    id: 3,
    name: "Protein Bar",
    brand: "RXBAR",
    score: 78,
    scoreColor: "#2ECC71",
    scoreBg: "#E8FAF0",
    image:
      "https://images.unsplash.com/photo-1742860866012-fc167d8366bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
];

// ── Corner bracket SVG component ──────────────────────────────────────────────
type CornerProps = {
  position: "tl" | "tr" | "bl" | "br";
  size?: number;
  thickness?: number;
  color?: string;
};

function CornerBracket({ position, size = 28, thickness = 3.5, color = "#2ECC71" }: CornerProps) {
  const isLeft = position === "tl" || position === "bl";
  const isTop = position === "tl" || position === "tr";

  const style: React.CSSProperties = {
    position: "absolute",
    ...(isTop ? { top: -thickness / 2 } : { bottom: -thickness / 2 }),
    ...(isLeft ? { left: -thickness / 2 } : { right: -thickness / 2 }),
  };

  return (
    <svg
      width={size + thickness}
      height={size + thickness}
      viewBox={`0 0 ${size + thickness} ${size + thickness}`}
      fill="none"
      style={style}
    >
      {/* Horizontal arm */}
      <line
        x1={isLeft ? thickness / 2 : size + thickness / 2}
        y1={isTop ? thickness / 2 : size + thickness / 2}
        x2={isLeft ? size + thickness / 2 : thickness / 2}
        y2={isTop ? thickness / 2 : size + thickness / 2}
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
      />
      {/* Vertical arm */}
      <line
        x1={isLeft ? thickness / 2 : size + thickness / 2}
        y1={isTop ? thickness / 2 : size + thickness / 2}
        x2={isLeft ? thickness / 2 : size + thickness / 2}
        y2={isTop ? size + thickness / 2 : thickness / 2}
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Barcode lines simulation ───────────────────────────────────────────────────
function BarcodeLines() {
  const lines = [6, 3, 5, 2, 7, 2, 4, 6, 3, 8, 2, 5, 3, 4, 6, 2, 7, 3, 5, 2, 4, 6, 3];
  return (
    <div className="flex items-end justify-center gap-[2px]" style={{ height: "50px", opacity: 0.18 }}>
      {lines.map((w, i) => (
        <div
          key={i}
          style={{
            width: `${w}px`,
            height: i % 3 === 0 ? "100%" : i % 2 === 0 ? "85%" : "70%",
            background: "white",
            borderRadius: "1px",
          }}
        />
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Scan() {
  const navigate = useNavigate();
  const [flashOn, setFlashOn] = useState(false);
  const [scanLine, setScanLine] = useState(0); // 0 = top, animates to bottom
  const [manualBarcode, setManualBarcode] = useState("");
  const [scanning, setScanning] = useState(true);
  const [scanComplete, setScanComplete] = useState(false);
  const [cornerPulse, setCornerPulse] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const SCAN_DURATION = 2200; // ms per full sweep

  // Animate scan line
  useEffect(() => {
    if (!scanning) return;
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) % SCAN_DURATION;
      const progress = elapsed / SCAN_DURATION;
      // Ping-pong: 0→1→0
      const pingPong = progress < 0.5 ? progress * 2 : 2 - progress * 2;
      setScanLine(pingPong);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [scanning]);

  // Pulsing corners
  useEffect(() => {
    const id = setInterval(() => setCornerPulse((p) => !p), 900);
    return () => clearInterval(id);
  }, []);

  const handleSimulateScan = () => {
    setScanning(false);
    setScanComplete(true);
    setTimeout(() => {
      navigate("/product/maggi-masala-noodles");
    }, 1200);
  };

  const FRAME_W = 260;
  const FRAME_H = 180;

  return (
    <MobileFrame bg="#0A0A0A" topColor="#0A0A0A" lightStatusBar>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>

        {/* ════════ CAMERA BACKGROUND ════════ */}
        {/* Simulated camera noise/texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 35%, #1a2a1a 0%, #0e1a0e 40%, #050d05 80%, #020802 100%)",
            zIndex: 0,
          }}
        />
        {/* Subtle grain overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
            opacity: 0.4,
            zIndex: 1,
          }}
        />

        {/* ════════ TOP BAR ════════ */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px 10px",
          }}
        >
          {/* Back button */}
          <button
            onClick={() => navigate("/home")}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={20} color="white" />
          </button>

          {/* Title */}
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "white", fontSize: "16px", fontWeight: 700, letterSpacing: "-0.2px" }}>
              Scan Barcode
            </p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", marginTop: "1px" }}>
              SafeBite Scanner
            </p>
          </div>

          {/* Flash toggle */}
          <button
            onClick={() => setFlashOn((f) => !f)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: flashOn ? "rgba(46,204,113,0.25)" : "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              border: `1px solid ${flashOn ? "rgba(46,204,113,0.5)" : "rgba(255,255,255,0.12)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {flashOn ? (
              <Zap size={20} color="#2ECC71" fill="#2ECC71" />
            ) : (
              <ZapOff size={20} color="rgba(255,255,255,0.8)" />
            )}
          </button>
        </div>

        {/* ════════ SCAN VIEWPORT ════════ */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {/* Outer overlay mask */}
          <div
            style={{
              position: "relative",
              width: `${FRAME_W}px`,
              height: `${FRAME_H}px`,
            }}
          >
            {/* Semi-transparent overlays outside frame — top, left, right, bottom handled by absolute divs on outer */}
            {/* Shadow vignette around the frame */}
            <div
              style={{
                position: "absolute",
                inset: -1000,
                background: "rgba(0,0,0,0.62)",
                zIndex: 1,
              }}
            />
            {/* Clear window */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                borderRadius: "14px",
                background: "transparent",
                boxShadow: "0 0 0 1000px rgba(0,0,0,0.62)",
                overflow: "hidden",
              }}
            >
              {/* Subtle inner barcode hint */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <BarcodeLines />
              </div>

              {/* Scan line */}
              {scanning && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: `${scanLine * 100}%`,
                    height: "2px",
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(46,204,113,0.4) 15%, #2ECC71 50%, rgba(46,204,113,0.4) 85%, transparent 100%)",
                    boxShadow: "0 0 10px 3px rgba(46,204,113,0.35)",
                    zIndex: 10,
                    transform: "translateY(-50%)",
                  }}
                />
              )}

              {/* Success overlay */}
              <AnimatePresence>
                {scanComplete && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(46,204,113,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 20,
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle2 size={52} color="#2ECC71" fill="rgba(46,204,113,0.2)" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Corner brackets ── */}
            {(["tl", "tr", "bl", "br"] as const).map((pos) => (
              <motion.div
                key={pos}
                style={{ position: "absolute", zIndex: 15, inset: 0, pointerEvents: "none" }}
                animate={{ opacity: cornerPulse ? 1 : 0.75 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              >
                <CornerBracket position={pos} size={26} thickness={3.5} color="#2ECC71" />
              </motion.div>
            ))}
          </div>

          {/* Instruction text */}
          <div style={{ textAlign: "center", zIndex: 10 }}>
            <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "14px", fontWeight: 500 }}>
              Point camera at barcode
            </p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", marginTop: "5px" }}>
              Hold steady for best results
            </p>
          </div>

          {/* Simulate scan button (demo) */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSimulateScan}
            style={{
              background: "rgba(46,204,113,0.15)",
              border: "1px solid rgba(46,204,113,0.4)",
              borderRadius: "12px",
              padding: "9px 24px",
              cursor: "pointer",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <ScanLine size={15} color="#2ECC71" />
            <span style={{ color: "#2ECC71", fontSize: "13px", fontWeight: 600 }}>
              Simulate Scan
            </span>
          </motion.button>
        </div>

        {/* ════════ BOTTOM CARD ════════ */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
          style={{
            position: "relative",
            zIndex: 20,
            background: "white",
            borderRadius: "28px 28px 0 0",
            padding: "22px 20px 24px",
            boxShadow: "0 -8px 40px rgba(0,0,0,0.35)",
            flexShrink: 0,
          }}
        >
          {/* Drag handle */}
          <div
            style={{
              width: "36px",
              height: "4px",
              borderRadius: "2px",
              background: "#E5E7EB",
              margin: "0 auto 18px",
            }}
          />

          {/* Manual entry label */}
          <div className="flex items-center gap-2" style={{ marginBottom: "12px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "#E8FAF0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Search size={14} color="#2ECC71" />
            </div>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
              Or enter barcode manually
            </p>
          </div>

          {/* Input + Search row */}
          <div className="flex gap-2" style={{ marginBottom: "20px" }}>
            <div
              style={{
                flex: 1,
                height: "46px",
                borderRadius: "12px",
                border: "1.5px solid #E5E7EB",
                background: "#F9FAFB",
                display: "flex",
                alignItems: "center",
                padding: "0 14px",
                gap: "8px",
                transition: "border-color 0.2s",
              }}
            >
              {/* Barcode icon inline */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="2" height="16" rx="0.5" fill="#9CA3AF" />
                <rect x="6" y="4" width="1" height="16" rx="0.5" fill="#9CA3AF" />
                <rect x="9" y="4" width="2" height="16" rx="0.5" fill="#9CA3AF" />
                <rect x="13" y="4" width="1" height="16" rx="0.5" fill="#9CA3AF" />
                <rect x="16" y="4" width="2" height="16" rx="0.5" fill="#9CA3AF" />
                <rect x="20" y="4" width="2" height="16" rx="0.5" fill="#9CA3AF" />
              </svg>
              <input
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                placeholder="e.g. 012345678901"
                inputMode="numeric"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontSize: "13px",
                  color: "#111827",
                  background: "transparent",
                  letterSpacing: "0.5px",
                }}
              />
              {manualBarcode.length > 0 && (
                <button
                  onClick={() => setManualBarcode("")}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  <X size={14} color="#9CA3AF" />
                </button>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              style={{
                height: "46px",
                paddingLeft: "18px",
                paddingRight: "18px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #2ECC71 0%, #1BAB58 100%)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                boxShadow: "0 4px 14px rgba(46,204,113,0.38)",
                flexShrink: 0,
              }}
            >
              <Search size={15} color="white" />
              <span style={{ color: "white", fontSize: "13px", fontWeight: 700 }}>Search</span>
            </motion.button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3" style={{ marginBottom: "16px" }}>
            <div style={{ flex: 1, height: "1px", background: "#F3F4F6" }} />
            <div className="flex items-center gap-1.5">
              <Clock size={11} color="#9CA3AF" />
              <span style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: 500 }}>Recent scans</span>
            </div>
            <div style={{ flex: 1, height: "1px", background: "#F3F4F6" }} />
          </div>

          {/* Recent scan thumbnails */}
          <div className="flex flex-col gap-2.5">
            {RECENT.map((item) => (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#F9FAFB",
                  borderRadius: "12px",
                  padding: "9px 10px",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "#E5E7EB",
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
                      fontWeight: 600,
                      color: "#111827",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </p>
                  <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "1px" }}>{item.brand}</p>
                </div>

                {/* Score */}
                <div
                  style={{
                    background: item.scoreBg,
                    borderRadius: "8px",
                    padding: "4px 9px",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: "13px", fontWeight: 800, color: item.scoreColor }}>
                    {item.score}
                  </span>
                </div>

                <ChevronRight size={14} color="#D1D5DB" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </MobileFrame>
  );
}