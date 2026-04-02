import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Splash() {
  const [progress, setProgress] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    const dotTimer = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);

    const navTimer = setTimeout(() => {
      navigate("/onboarding/1");
    }, 2800);

    return () => {
      clearInterval(progressTimer);
      clearInterval(dotTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div
        className="relative overflow-hidden flex flex-col items-center justify-between"
        style={{
          width: "375px",
          height: "812px",
          background: "linear-gradient(160deg, #34D979 0%, #2ECC71 45%, #27AE60 100%)",
          borderRadius: "40px",
          boxShadow: "0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute" style={{ width: "500px", height: "500px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: "-180px", right: "-140px" }} />
        <div className="absolute" style={{ width: "320px", height: "320px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", bottom: "-100px", left: "-80px" }} />

        {/* Status Bar */}
        <div className="w-full flex items-center justify-between px-8 z-10" style={{ paddingTop: "52px" }}>
          <span className="text-white text-sm font-medium" style={{ opacity: 0.9, fontSize: "15px" }}>9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="6" width="3" height="6" rx="1" fill="white" fillOpacity="0.9" />
              <rect x="4.5" y="4" width="3" height="8" rx="1" fill="white" fillOpacity="0.9" />
              <rect x="9" y="2" width="3" height="10" rx="1" fill="white" fillOpacity="0.9" />
              <rect x="13.5" y="0" width="3" height="12" rx="1" fill="white" fillOpacity="0.9" />
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <circle cx="8" cy="11" r="1.5" fill="white" fillOpacity="0.9" />
              <path d="M4.5 7.5C5.6 6.4 7 5.8 8.5 5.8C10 5.8 11.4 6.4 12.5 7.5" stroke="white" strokeOpacity="0.9" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M1.5 4.5C3.4 2.6 5.8 1.5 8.5 1.5C11.2 1.5 13.6 2.6 15.5 4.5" stroke="white" strokeOpacity="0.9" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.9" />
              <rect x="2" y="2" width="17" height="8" rx="2" fill="white" fillOpacity="0.9" />
              <path d="M23 4V8C23.83 7.67 24.5 6.9 24.5 6C24.5 5.1 23.83 4.33 23 4Z" fill="white" fillOpacity="0.7" />
            </svg>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center justify-center z-10 flex-1">
          <div className="mb-8 relative" style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))" }}>
            <svg width="110" height="126" viewBox="0 0 110 126" fill="none">
              <path d="M55 4L8 22V58C8 84.4 28.4 109.2 55 116C81.6 109.2 102 84.4 102 58V22L55 4Z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M55 14L18 29.5V58C18 80.5 34.4 101.2 55 107.2C75.6 101.2 92 80.5 92 58V29.5L55 14Z" fill="rgba(255,255,255,0.1)" />
              <path d="M36 62L48 74L74 48" stroke="white" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-white text-center" style={{ fontSize: "52px", fontWeight: 800, letterSpacing: "-1px", textShadow: "0 2px 16px rgba(0,0,0,0.12)", lineHeight: 1, marginBottom: "14px" }}>
            SafeBite
          </h1>
          <p className="text-center" style={{ color: "rgba(255,255,255,0.82)", fontSize: "17px", fontWeight: 400, letterSpacing: "0.8px", textTransform: "uppercase" }}>
            Know Before You Bite
          </p>
        </div>

        {/* Loading */}
        <div className="flex flex-col items-center z-10" style={{ marginBottom: "64px", gap: "18px" }}>
          <div style={{ width: "140px", height: "3px", background: "rgba(255,255,255,0.2)", borderRadius: "100px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "white", borderRadius: "100px", transition: "width 0.05s linear", boxShadow: "0 0 8px rgba(255,255,255,0.6)" }} />
          </div>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", letterSpacing: "0.5px", fontWeight: 400 }}>
            Loading{".".repeat(dotCount)}
          </p>
        </div>
      </div>
    </div>
  );
}
