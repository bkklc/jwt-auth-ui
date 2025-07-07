import React from "react";
import { useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../services/authService";

function Dashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser(); // Token'dan gelen user bilgisi

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1> Giriş Başarılı! </h1>

      <h1> Hoş geldiniz {user?.firstName} {user?.lastName}! </h1>
      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#e74c3c",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Çıkış Yap
      </button>
    </div>
  );
}

export default Dashboard;
