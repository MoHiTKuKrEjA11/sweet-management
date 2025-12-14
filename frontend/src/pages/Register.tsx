import React from "react";
import { API } from "../api";

type Props = {
  onRegister?: () => void;
  onSwitch?: () => void;
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
    if (res.status === 201) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      if (onRegister) onRegister();
    } else {
      const data = await res.json();
      alert(data.message || "Email already exists");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create an Account</h2>
        <form className="auth-form" onSubmit={submit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            className="input-field"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            className="input-field"
          />
          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>
        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={onSwitch} className="switch-link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
