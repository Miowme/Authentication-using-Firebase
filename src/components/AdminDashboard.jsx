export default function AdminDashboard({ role }) {
  if (role !== "admin") {
    return (
      <div
        style={{
          background: "#fee2e2",
          color: "#991b1b",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #f87171",
        }}
      >
        <h3>Akses Ditolak (403 Forbidden)</h3>
        <p>
          Anda tidak memiliki izin role <strong>admin</strong> untuk mengakses
          halaman ini.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fef2f2",
        padding: "25px",
        borderRadius: "8px",
        border: "1px solid #fca5a5",
      }}
    >
      <h2 style={{ color: "#b91c1c" }}>Admin Dashboard (/admin/dashboard)</h2>
      <p style={{ color: "#7f1d1d", marginBottom: "20px" }}>
        Panel khusus kontrol penuh sistem. Hanya role admin yang dapat melihat
        halaman ini.
      </p>

      <div
        style={{
          background: "white",
          padding: "15px",
          borderRadius: "6px",
          border: "1px solid #fecaca",
        }}
      >
        <h4>Statistik Sistem Terbatas:</h4>
        <ul>
          <li>Manajemen Pengguna Terdaftar</li>
          <li>Pengaturan Keamanan Database</li>
          <li>Log Aktivitas Sistem</li>
        </ul>
      </div>
    </div>
  );
}
