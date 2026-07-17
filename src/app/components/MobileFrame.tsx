import { ReactNode } from "react";

interface MobileFrameProps {
  children: ReactNode;
  bg?: string;
  topColor?: string;
  lightStatusBar?: boolean;
}

export function MobileFrame({
  children,
  bg = "#ffffff",
  topColor,
  lightStatusBar = false,
}: MobileFrameProps) {
  const iconColor = lightStatusBar ? "white" : "#1A1A2E";
  const iconOpacity = lightStatusBar ? 0.92 : 0.82;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at 30% 20%, #1e3a5f 0%, #0f1923 45%, #0a0a14 100%)",
        padding: "20px 16px",
      }}
    >
      {/* Ambient glow behind phone */}
      <div
        style={{
          position: "absolute",
          width: "360px",
          height: "560px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(46,204,113,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Phone outer shell */}
      <div
        style={{
          position: "relative",
          padding: "8px",
          borderRadius: "50px",
          background:
            "linear-gradient(160deg, #323232 0%, #1e1e1e 50%, #161616 100%)",
          boxShadow:
            "0 60px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -1px 1px rgba(0,0,0,0.6)",
          flexShrink: 0,
        }}
      >
        {/* Left side: mute toggle + volume buttons */}
        <div
          style={{
            position: "absolute",
            left: "-3.5px",
            top: "130px",
            width: "3.5px",
            height: "30px",
            background:
              "linear-gradient(180deg, #2a2a2a 0%, #1e1e1e 100%)",
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-3.5px",
            top: "178px",
            width: "3.5px",
            height: "58px",
            background:
              "linear-gradient(180deg, #2a2a2a 0%, #1e1e1e 100%)",
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-3.5px",
            top: "248px",
            width: "3.5px",
            height: "58px",
            background:
              "linear-gradient(180deg, #2a2a2a 0%, #1e1e1e 100%)",
            borderRadius: "2px 0 0 2px",
          }}
        />

        {/* Right side: power button */}
        <div
          style={{
            position: "absolute",
            right: "-3.5px",
            top: "196px",
            width: "3.5px",
            height: "76px",
            background:
              "linear-gradient(180deg, #2a2a2a 0%, #1e1e1e 100%)",
            borderRadius: "0 2px 2px 0",
          }}
        />

        {/* Screen */}
        <div
          style={{
            width: "375px",
            height: "812px",
            background: bg,
            borderRadius: "42px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ── Status Bar ── */}
          <div
            style={{
              background: topColor || bg,
              flexShrink: 0,
              position: "relative",
              padding: "52px 24px 0",
            }}
          >
            {/* Punch-hole camera */}
            <div
              style={{
                position: "absolute",
                top: "22px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                background: "#060608",
                zIndex: 50,
                boxShadow: "0 0 0 1.5px rgba(0,0,0,0.35)",
              }}
            />

            {/* Status bar row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: iconColor,
                  opacity: iconOpacity,
                  letterSpacing: "-0.2px",
                }}
              >
                9:41
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {/* Signal bars */}
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                  <rect x="0" y="6" width="3" height="6" rx="1" fill={iconColor} fillOpacity={iconOpacity} />
                  <rect x="4.5" y="4" width="3" height="8" rx="1" fill={iconColor} fillOpacity={iconOpacity} />
                  <rect x="9" y="2" width="3" height="10" rx="1" fill={iconColor} fillOpacity={iconOpacity} />
                  <rect x="13.5" y="0" width="3" height="12" rx="1" fill={iconColor} fillOpacity={iconOpacity} />
                </svg>
                {/* WiFi */}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <circle cx="8" cy="11" r="1.5" fill={iconColor} fillOpacity={iconOpacity} />
                  <path d="M4.5 7.5C5.6 6.4 7 5.8 8.5 5.8C10 5.8 11.4 6.4 12.5 7.5" stroke={iconColor} strokeOpacity={iconOpacity} strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <path d="M1.5 4.5C3.4 2.6 5.8 1.5 8.5 1.5C11.2 1.5 13.6 2.6 15.5 4.5" stroke={iconColor} strokeOpacity={iconOpacity} strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </svg>
                {/* Battery */}
                <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                  <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={iconColor} strokeOpacity={iconOpacity} />
                  <rect x="2" y="2" width="17" height="8" rx="2" fill={iconColor} fillOpacity={iconOpacity} />
                  <path d="M23 4V8C23.83 7.67 24.5 6.9 24.5 6C24.5 5.1 23.83 4.33 23 4Z" fill={iconColor} fillOpacity={0.65} />
                </svg>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 flex flex-col overflow-hidden">{children}</div>

          {/* Home indicator (overlay, doesn't affect layout) */}
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "134px",
              height: "5px",
              borderRadius: "3px",
              background: lightStatusBar
                ? "rgba(255,255,255,0.22)"
                : "rgba(0,0,0,0.16)",
              pointerEvents: "none",
              zIndex: 98,
            }}
          />

          {/* Screen edge highlight glare */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "42px",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, transparent 35%)",
              pointerEvents: "none",
              zIndex: 97,
            }}
          />
        </div>

        {/* Shell outer glare */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50px",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, transparent 45%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
