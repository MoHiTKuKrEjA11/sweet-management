import React from "react";
import { API } from "../api";

type Props = {
  onRegister: () => void;
  onSwitch: () => void;
};

export default function Register({ onRegister, onSwitch }: Props) {
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const res = await fetch(`${API}/auth/register`, {
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
      onRegister();
    } else {
      const data = await res.json();
      alert(data.message || "Email already exists");
    }
  };

  return (
    <form onSubmit={submit}>
      <input name="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button>Register</button>
      <p onClick={onSwitch} style={{ cursor: "pointer", color: "blue" }}>
        Already have account? Login
      </p>
    </form>
  );
}
