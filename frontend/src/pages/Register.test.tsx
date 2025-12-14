import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Register from "./Register";

describe("Register Page", () => {
  it("renders register form", () => {
    render(<Register />);

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });
});
