import React from "react";
import { API } from "../api";

type Props = { onLogin: () => void; onSwitch: () => void };

export default function Login({ onLogin, onSwitch }: Props) {
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: target.email.value,
        password: target.password.value,
      }),
    });
    if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      onLogin();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={submit}>
      <input name="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button>Login</button>
      <p onClick={onSwitch} style={{ cursor: "pointer", color: "blue" }}>
        No account? Register
      </p>
    </form>
  );
}
