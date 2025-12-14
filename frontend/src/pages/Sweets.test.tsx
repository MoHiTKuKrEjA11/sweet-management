import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Sweets from "./Sweets";

describe("Sweets Page", () => {
  it("renders sweets list", async () => {
    render(<Sweets />);

    const item = await screen.findByText("Chocolate Bar");
    expect(item).toBeInTheDocument();
  });
});
