import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Navbar({ role }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
        padding: "16px 30px",
        background: "#1e293b",
        color: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: "16px",
          marginRight: "20px",
          color: "#38bdf8",
        }}
      >
        Firebase RBAC
      </div>

      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          fontWeight: "500",
          background: "transparent",
        }}
      >
        Home
      </Link>

      <Link
        to="/user/profile"
        style={{
          color: "white",
          textDecoration: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          fontWeight: "500",
          background: "transparent",
        }}
      >
        Profile
      </Link>

      {role === "admin" && (
        <Link
          to="/admin/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            fontWeight: "500",
            background: "#ef4444",
          }}
        >
          Dashboard Admin
        </Link>
      )}

      <button
        onClick={handleLogout}
        style={{
          marginLeft: "auto",
          background: "#dc2626",
          border: "none",
          color: "white",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>
    </nav>
  );
}
