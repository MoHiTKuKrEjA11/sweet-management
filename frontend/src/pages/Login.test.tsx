import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Login Page", () => {
  it("renders login form", () => {
    render(<Login />);

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });
});
