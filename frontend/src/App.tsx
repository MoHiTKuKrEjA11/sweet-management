import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Sweets";

export default function App() {
  const [page, setPage] = useState<"login" | "register" | "dashboard">(
    localStorage.getItem("token") ? "dashboard" : "login"
  );

  const handleLogin = () => setPage("dashboard");

  if (page === "login")
    return <Login onLogin={handleLogin} onSwitch={() => setPage("register")} />;
  if (page === "register")
    return (
      <Register onRegister={handleLogin} onSwitch={() => setPage("login")} />
    );
  return <Dashboard />;
}
