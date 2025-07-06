import React from "react";
import { getCurrentUser } from "../services/authService";

function Dashboard() {
  const user = getCurrentUser();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center"
    }}>
      {user ? (
        <>
        <h1>Giriş Başarılı!</h1>
          <h1>Hoş geldiniz, {user.firstName} {user.lastName}!</h1>          
        </>
      ) : (
        <h2>Giriş yapan kullanıcı bulunamadı.</h2>
      )}
    </div>
  );
}

export default Dashboard;
