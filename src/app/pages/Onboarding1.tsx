import { useNavigate } from "react-router";
import { MobileFrame } from "../components/MobileFrame";

export default function Onboarding1() {
  const navigate = useNavigate();

  return (
    <MobileFrame bg="#FAFCFF">
      {/* Skip button */}
      <div className="flex justify-end px-6 pt-4 pb-0 shrink-0">
        <button
          onClick={() => navigate("/auth")}
          style={{ color: "#9CA3AF", fontSize: "14px", fontWeight: 600, background: "#F3F4F6", border: "none", cursor: "pointer", padding: "5px 14px", borderRadius: "20px" }}
        >
          Skip
        </button>
      </div>

      {/* Illustration */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{ flex: "0 0 auto", height: "380px", padding: "0 20px" }}
      >
        <ScanIllustration />
      </div>

      {/* Text content */}
      <div className="flex flex-col flex-1 px-8 pt-2">
        <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#1A1A2E", letterSpacing: "-0.5px", marginBottom: "14px", lineHeight: 1.15 }}>
          Scan Any Product
        </h2>
        <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.65, fontWeight: 400 }}>
          Point your camera at any packaged food barcode and get instant health analysis.
        </p>
      </div>

      {/* Bottom nav */}
      <div className="flex flex-col items-center px-8 shrink-0" style={{ paddingBottom: "48px", gap: "28px" }}>
        {/* Dots */}
        <div className="flex items-center gap-2">
          <div style={{ width: "24px", height: "8px", borderRadius: "4px", background: "#2ECC71" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "4px", background: "#E5E7EB" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "4px", background: "#E5E7EB" }} />
        </div>

        {/* Next button */}
        <button
          onClick={() => navigate("/onboarding/2")}
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

function ScanIllustration() {
  return (
    <svg width="320" height="360" viewBox="0 0 320 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background soft circle */}
      <circle cx="160" cy="175" r="145" fill="#F0FDF6" />

      {/* Food package box */}
      <rect x="78" y="80" width="164" height="210" rx="16" fill="white" stroke="#E5E7EB" strokeWidth="2" />
      {/* Package top color band */}
      <rect x="78" y="80" width="164" height="60" rx="16" fill="#2ECC71" />
      <rect x="78" y="120" width="164" height="20" fill="#2ECC71" />
      {/* Package label */}
      <text x="160" y="120" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="system-ui">HEALTHY</text>
      <text x="160" y="136" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="system-ui">ORGANIC SNACK</text>

      {/* Barcode area on package */}
      <rect x="98" y="158" width="124" height="72" rx="8" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1.5" />
      {/* Barcode lines */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map((i) => (
        <rect
          key={i}
          x={104 + i * 5.6}
          y="166"
          width={i % 3 === 0 ? 3.5 : i % 2 === 0 ? 2 : 1.5}
          height="48"
          rx="0.5"
          fill="#1A1A2E"
          opacity={i % 4 === 0 ? 1 : 0.7}
        />
      ))}
      <text x="160" y="238" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="system-ui">1234567890123</text>

      {/* Package bottom info */}
      <rect x="98" y="250" width="56" height="8" rx="4" fill="#F3F4F6" />
      <rect x="166" y="250" width="36" height="8" rx="4" fill="#F3F4F6" />
      <rect x="98" y="266" width="44" height="8" rx="4" fill="#F3F4F6" />

      {/* Phone body */}
      <rect x="172" y="190" width="110" height="148" rx="18" fill="#1A1A2E" />
      <rect x="176" y="194" width="102" height="140" rx="14" fill="#111827" />

      {/* Phone screen */}
      <rect x="178" y="196" width="98" height="136" rx="12" fill="#0F1923" />

      {/* Camera viewfinder on phone screen */}
      <rect x="184" y="202" width="86" height="86" rx="6" fill="#0D2818" />

      {/* Scan frame corners */}
      <path d="M194 212 L194 222 M194 212 L204 212" stroke="#2ECC71" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M260 212 L260 222 M260 212 L250 212" stroke="#2ECC71" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M194 278 L194 268 M194 278 L204 278" stroke="#2ECC71" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M260 278 L260 268 M260 278 L250 278" stroke="#2ECC71" strokeWidth="2.5" strokeLinecap="round" />

      {/* Scan laser line */}
      <rect x="186" y="243" width="82" height="2.5" rx="1.5" fill="#2ECC71" opacity="0.9" />
      {/* Laser glow */}
      <rect x="186" y="240" width="82" height="8" rx="4" fill="#2ECC71" opacity="0.18" />

      {/* Barcode lines visible through camera */}
      {[0,1,2,3,4,5,6,7].map((i) => (
        <rect key={i} x={195 + i * 9} y="220" width={i % 2 === 0 ? 4 : 2} height="52" rx="0.5" fill="white" opacity={0.15} />
      ))}

      {/* Phone bottom info area */}
      <rect x="184" y="294" width="38" height="6" rx="3" fill="#1F2937" />
      <rect x="228" y="294" width="22" height="6" rx="3" fill="#2ECC71" opacity="0.7" />
      <rect x="184" y="306" width="56" height="5" rx="2.5" fill="#1F2937" />
      <rect x="184" y="317" width="30" height="5" rx="2.5" fill="#1F2937" />

      {/* Phone notch */}
      <rect x="215" y="196" width="24" height="5" rx="2.5" fill="#0F1923" />

      {/* Success check badge */}
      <circle cx="270" cy="198" r="16" fill="#2ECC71" />
      <circle cx="270" cy="198" r="16" fill="white" fillOpacity="0" stroke="white" strokeWidth="2" />
      <path d="M263 198L268 203L277 193" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Floating signal dots */}
      <circle cx="82" cy="175" r="5" fill="#2ECC71" opacity="0.3" />
      <circle cx="72" cy="155" r="3.5" fill="#2ECC71" opacity="0.2" />
      <circle cx="63" cy="170" r="2.5" fill="#2ECC71" opacity="0.15" />

      {/* Scan beam connecting phone to package */}
      <line x1="172" y1="245" x2="242" y2="200" stroke="#2ECC71" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
    </svg>
  );
}