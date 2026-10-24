import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setRole(userDoc.data().role);
          } else {
            setRole("user");
          }
        } catch (err) {
          console.error("Gagal mengambil role:", err);
          setRole("user");
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8fafc",
          fontFamily: "sans-serif",
          color: "#64748b",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        Memuat Keamanan Sistem...
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        fontFamily: "sans-serif",
        paddingBottom: "40px",
      }}
    >
      <Navbar role={role} />

      <div
        style={{
          maxWidth: "850px",
          margin: "30px auto",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            padding: "35px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
            border: "1px solid #e2e8f0",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h2
                    style={{
                      color: "#1e293b",
                      marginTop: 0,
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    Selamat Datang,{" "}
                    <span style={{ color: "#3b82f6" }}>{user.email}</span>! 👋
                  </h2>
                  <p
                    style={{
                      color: "#475569",
                      fontSize: "15px",
                      lineHeight: "1.6",
                      marginBottom: "20px",
                    }}
                  >
                    Aplikasi ini sekarang menggunakan React Router, sehingga URL
                    berubah secara nyata sesuai halaman yang dikunjungi.
                  </p>
                </div>
              }
            />
            <Route
              path="/user/profile"
              element={<Profile user={user} role={role} />}
            />
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard role={role} />}
            />
            {/* Redirect jika rute tidak ditemukan */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
