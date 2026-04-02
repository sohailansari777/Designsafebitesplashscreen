import { ReactNode } from "react";

interface MobileFrameProps {
  children: ReactNode;
  bg?: string;
}

export function MobileFrame({ children, bg = "#ffffff" }: MobileFrameProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div
        className="relative overflow-hidden flex flex-col"
        style={{
          width: "375px",
          height: "812px",
          background: bg,
          borderRadius: "40px",
          boxShadow:
            "0 40px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06)",
          flexShrink: 0,
        }}
      >
        {/* Status Bar */}
        <div
          className="w-full flex items-center justify-between shrink-0"
          style={{ padding: "52px 28px 0" }}
        >
          <span style={{ color: "inherit", fontSize: "15px", fontWeight: 500, opacity: 0.85 }}>
            9:41
          </span>
          <div className="flex items-center gap-1.5">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="6" width="3" height="6" rx="1" fill="currentColor" fillOpacity="0.85" />
              <rect x="4.5" y="4" width="3" height="8" rx="1" fill="currentColor" fillOpacity="0.85" />
              <rect x="9" y="2" width="3" height="10" rx="1" fill="currentColor" fillOpacity="0.85" />
              <rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor" fillOpacity="0.85" />
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <circle cx="8" cy="11" r="1.5" fill="currentColor" fillOpacity="0.85" />
              <path d="M4.5 7.5C5.6 6.4 7 5.8 8.5 5.8C10 5.8 11.4 6.4 12.5 7.5" stroke="currentColor" strokeOpacity="0.85" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M1.5 4.5C3.4 2.6 5.8 1.5 8.5 1.5C11.2 1.5 13.6 2.6 15.5 4.5" stroke="currentColor" strokeOpacity="0.85" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.85" />
              <rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor" fillOpacity="0.85" />
              <path d="M23 4V8C23.83 7.67 24.5 6.9 24.5 6C24.5 5.1 23.83 4.33 23 4Z" fill="currentColor" fillOpacity="0.6" />
            </svg>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
