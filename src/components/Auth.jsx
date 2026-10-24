import { useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password minimal harus 6 karakter.");
      return;
    }

    setLoading(true);
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          role: "user",
          createdAt: new Date().toISOString(),
        });
        alert("Registrasi berhasil! Silakan login.");
        setIsRegister(false);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #6EE7B7 0%, #3B82F6 50%, #9333EA 100%)",
        fontFamily: "sans-serif",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
          padding: "40px 30px",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: "30px",
            marginTop: "0",
          }}
        >
          {isRegister ? "Signup Form" : "Login Form"}
        </h2>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#991b1b",
              padding: "10px 14px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              Email or Phone
            </label>
            <input
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
            {!isRegister && (
              <div style={{ textAlign: "left", marginTop: "8px" }}>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#3b82f6",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password?
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 100%)",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
              marginTop: "10px",
            }}
          >
            {loading ? "MEMPROSES..." : isRegister ? "SIGNUP" : "LOGIN"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          {isRegister ? (
            <span>
              Sudah punya akun?{" "}
              <span
                style={{
                  color: "#3b82f6",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                onClick={() => setIsRegister(false)}
              >
                Login di sini
              </span>
            </span>
          ) : (
            <span>
              Not a member?{" "}
              <span
                style={{
                  color: "#3b82f6",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                onClick={() => setIsRegister(true)}
              >
                Signup now
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
