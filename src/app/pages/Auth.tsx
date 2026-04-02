import { useState } from "react";
import { useNavigate } from "react-router";
import { MobileFrame } from "../components/MobileFrame";

type Tab = "login" | "signup";

export default function Auth() {
  const [activeTab, setActiveTab] = useState<Tab>("login");
  const navigate = useNavigate();

  return (
    <MobileFrame bg="#ffffff">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* ── Header ── */}
        <div
          className="flex flex-col items-center shrink-0"
          style={{ paddingTop: "32px", paddingBottom: "24px" }}
        >
          {/* Logo mark */}
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #34D979 0%, #2ECC71 60%, #27AE60 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(46,204,113,0.32)",
              marginBottom: "12px",
            }}
          >
            <ShieldCheck />
          </div>
          {/* App name */}
          <p
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#1A1A2E",
              letterSpacing: "-0.5px",
              lineHeight: 1,
            }}
          >
            SafeBite
          </p>
          <p style={{ fontSize: "13px", color: "#9CA3AF", marginTop: "4px" }}>
            Know Before You Bite
          </p>
        </div>

        {/* ── Tab Switcher ── */}
        <div
          className="shrink-0 mx-6"
          style={{
            background: "#F3F4F6",
            borderRadius: "14px",
            padding: "4px",
            display: "flex",
            marginBottom: "24px",
          }}
        >
          {(["login", "signup"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                height: "40px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: 700,
                transition: "all 0.2s ease",
                background: activeTab === tab ? "white" : "transparent",
                color: activeTab === tab ? "#1A1A2E" : "#9CA3AF",
                boxShadow: activeTab === tab ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {tab === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* ── Scrollable Form Area ── */}
        <div className="flex-1 overflow-y-auto" style={{ padding: "0 24px" }}>
          {activeTab === "login" ? (
            <LoginForm onSuccess={() => navigate("/home")} />
          ) : (
            <SignupForm onSuccess={() => navigate("/home")} />
          )}
        </div>

        {/* ── Bottom hint ── */}
        <div
          className="shrink-0 flex justify-center"
          style={{ paddingBottom: "40px", paddingTop: "16px" }}
        >
          {activeTab === "login" ? (
            <p style={{ fontSize: "14px", color: "#6B7280" }}>
              Don't have an account?{" "}
              <button
                onClick={() => setActiveTab("signup")}
                style={{
                  color: "#2ECC71",
                  fontWeight: 700,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p style={{ fontSize: "14px", color: "#6B7280" }}>
              Already have an account?{" "}
              <button
                onClick={() => setActiveTab("login")}
                style={{
                  color: "#2ECC71",
                  fontWeight: 700,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </MobileFrame>
  );
}

/* ─────────────────────────── Login Form ─────────────────────────── */
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {/* Email */}
      <InputField
        label="Email Address"
        type="email"
        placeholder="hello@example.com"
        value={email}
        onChange={setEmail}
        focused={focusedField === "email"}
        onFocus={() => setFocusedField("email")}
        onBlur={() => setFocusedField(null)}
        icon={<EmailIcon />}
      />

      {/* Password */}
      <div>
        <InputField
          label="Password"
          type={showPass ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          focused={focusedField === "password"}
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
          icon={<LockIcon />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "#9CA3AF" }}
            >
              {showPass ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          }
        />
        {/* Forgot password */}
        <div className="flex justify-end" style={{ marginTop: "8px" }}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#2ECC71",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Login Button */}
      <button
        onClick={onSuccess}
        style={{
          width: "100%",
          height: "54px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, #34D979 0%, #2ECC71 60%, #27AE60 100%)",
          color: "white",
          fontSize: "17px",
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(46,204,113,0.38)",
          letterSpacing: "0.2px",
          marginTop: "4px",
        }}
      >
        Login
      </button>

      {/* Divider */}
      <Divider />

      {/* Social Buttons */}
      <SocialButtons />
    </div>
  );
}

/* ─────────────────────────── Signup Form ─────────────────────────── */
function SignupForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {/* Full Name */}
      <InputField
        label="Full Name"
        type="text"
        placeholder="John Doe"
        value={name}
        onChange={setName}
        focused={focusedField === "name"}
        onFocus={() => setFocusedField("name")}
        onBlur={() => setFocusedField(null)}
        icon={<UserIcon />}
      />

      {/* Email */}
      <InputField
        label="Email Address"
        type="email"
        placeholder="hello@example.com"
        value={email}
        onChange={setEmail}
        focused={focusedField === "email"}
        onFocus={() => setFocusedField("email")}
        onBlur={() => setFocusedField(null)}
        icon={<EmailIcon />}
      />

      {/* Password */}
      <InputField
        label="Create Password"
        type={showPass ? "text" : "password"}
        placeholder="Min. 8 characters"
        value={password}
        onChange={setPassword}
        focused={focusedField === "password"}
        onFocus={() => setFocusedField("password")}
        onBlur={() => setFocusedField(null)}
        icon={<LockIcon />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPass((p) => !p)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "#9CA3AF" }}
          >
            {showPass ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
      />

      {/* Password strength */}
      {password.length > 0 && <PasswordStrength password={password} />}

      {/* Terms note */}
      <p style={{ fontSize: "12px", color: "#9CA3AF", textAlign: "center", lineHeight: 1.6 }}>
        By signing up, you agree to our{" "}
        <span style={{ color: "#2ECC71", fontWeight: 600 }}>Terms of Service</span> and{" "}
        <span style={{ color: "#2ECC71", fontWeight: 600 }}>Privacy Policy</span>
      </p>

      {/* Sign Up Button */}
      <button
        onClick={onSuccess}
        style={{
          width: "100%",
          height: "54px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, #34D979 0%, #2ECC71 60%, #27AE60 100%)",
          color: "white",
          fontSize: "17px",
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(46,204,113,0.38)",
          letterSpacing: "0.2px",
        }}
      >
        Create Account
      </button>

      {/* Divider */}
      <Divider />

      {/* Social Buttons */}
      <SocialButtons />
    </div>
  );
}

/* ─────────────────────────── Shared Components ─────────────────────────── */

function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  focused,
  onFocus,
  onBlur,
  icon,
  rightIcon,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  icon: React.ReactNode;
  rightIcon?: React.ReactNode;
}) {
  const isActive = focused || value.length > 0;

  return (
    <div style={{ position: "relative" }}>
      {/* Floating label */}
      <label
        style={{
          position: "absolute",
          left: "48px",
          top: isActive ? "9px" : "50%",
          transform: isActive ? "none" : "translateY(-50%)",
          fontSize: isActive ? "11px" : "15px",
          fontWeight: isActive ? 600 : 400,
          color: focused ? "#2ECC71" : "#9CA3AF",
          transition: "all 0.18s ease",
          pointerEvents: "none",
          zIndex: 1,
          letterSpacing: isActive ? "0.3px" : "0",
        }}
      >
        {label}
      </label>

      {/* Left icon */}
      <div
        style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          color: focused ? "#2ECC71" : "#9CA3AF",
          transition: "color 0.18s ease",
          display: "flex",
          zIndex: 1,
        }}
      >
        {icon}
      </div>

      {/* Input */}
      <input
        type={type}
        placeholder={isActive ? placeholder : ""}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          width: "100%",
          height: "60px",
          borderRadius: "14px",
          border: `1.5px solid ${focused ? "#2ECC71" : "#E5E7EB"}`,
          background: focused ? "#F0FDF6" : "#F9FAFB",
          paddingLeft: "48px",
          paddingRight: rightIcon ? "48px" : "16px",
          paddingTop: isActive ? "20px" : "0",
          paddingBottom: isActive ? "6px" : "0",
          fontSize: "15px",
          color: "#1A1A2E",
          outline: "none",
          boxSizing: "border-box",
          transition: "all 0.18s ease",
          boxShadow: focused ? "0 0 0 4px rgba(46,204,113,0.1)" : "none",
        }}
      />

      {/* Right icon */}
      {rightIcon && (
        <div
          style={{
            position: "absolute",
            right: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            zIndex: 1,
          }}
        >
          {rightIcon}
        </div>
      )}
    </div>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };
  const strength = getStrength();
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#EF4444", "#F97316", "#EAB308", "#2ECC71"];

  return (
    <div>
      <div className="flex gap-1.5" style={{ marginBottom: "6px" }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "4px",
              borderRadius: "2px",
              background: i <= strength ? colors[strength] : "#E5E7EB",
              transition: "background 0.2s ease",
            }}
          />
        ))}
      </div>
      <p style={{ fontSize: "12px", color: colors[strength], fontWeight: 600 }}>
        {strength > 0 ? `${labels[strength]} password` : ""}
      </p>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3" style={{ margin: "4px 0" }}>
      <div style={{ flex: 1, height: "1px", background: "#E5E7EB" }} />
      <span style={{ fontSize: "13px", color: "#9CA3AF", fontWeight: 500 }}>OR</span>
      <div style={{ flex: 1, height: "1px", background: "#E5E7EB" }} />
    </div>
  );
}

function SocialButtons() {
  return (
    <div className="flex flex-col gap-3" style={{ paddingBottom: "8px" }}>
      {/* Google */}
      <button
        style={{
          width: "100%",
          height: "52px",
          borderRadius: "14px",
          background: "white",
          border: "1.5px solid #E5E7EB",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          fontSize: "15px",
          fontWeight: 600,
          color: "#1A1A2E",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        <GoogleIcon />
        Continue with Google
      </button>

      {/* Phone */}
      <button
        style={{
          width: "100%",
          height: "52px",
          borderRadius: "14px",
          background: "white",
          border: "1.5px solid #E5E7EB",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          fontSize: "15px",
          fontWeight: 600,
          color: "#1A1A2E",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        <PhoneIcon />
        Continue with Phone
      </button>
    </div>
  );
}

/* ─────────────────────────── SVG Icons ─────────────────────────── */

function ShieldCheck() {
  return (
    <svg width="32" height="36" viewBox="0 0 32 36" fill="none">
      <path d="M16 1L2 6.5V16C2 24.5 8.4 32.3 16 34C23.6 32.3 30 24.5 30 16V6.5L16 1Z" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 17L14 21L22 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
    </svg>
  );
}
