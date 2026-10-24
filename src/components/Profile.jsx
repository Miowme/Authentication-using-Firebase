export default function Profile({ user, role }) {
  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "15px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#1e293b", margin: "0 0 5px 0", fontSize: "22px" }}>
          User Profile{" "}
          <span
            style={{ fontSize: "14px", color: "#64748b", fontWeight: "normal" }}
          >
            (/user/profile)
          </span>
        </h2>
        <p style={{ color: "#475569", margin: 0, fontSize: "14px" }}>
          Halaman ini terlindungi dan hanya bisa diakses oleh pengguna yang
          sudah terotentikasi.
        </p>
      </div>

      <div
        style={{
          background: "#f8fafc",
          padding: "24px",
          borderRadius: "12px",
          border: "1px solid #cbd5e1",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          <span
            style={{
              display: "block",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#475569",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Email Akun
          </span>
          <span
            style={{ fontSize: "16px", color: "#0f172a", fontWeight: "600" }}
          >
            {user.email}
          </span>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <span
            style={{
              display: "block",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#475569",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            UID Firebase
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "#334155",
              fontFamily: "monospace",
              background: "#e2e8f0",
              padding: "4px 8px",
              borderRadius: "4px",
              display: "inline-block",
            }}
          >
            {user.uid}
          </span>
        </div>

        <div>
          <span
            style={{
              display: "block",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#475569",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Hak Akses Role
          </span>
          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "bold",
              color: role === "admin" ? "#991b1b" : "#166534",
              background: role === "admin" ? "#fee2e2" : "#dcfce7",
              border:
                role === "admin" ? "1px solid #f87171" : "1px solid #86efac",
            }}
          >
            {role ? role.toUpperCase() : "USER"}
          </span>
        </div>
      </div>
    </div>
  );
}
