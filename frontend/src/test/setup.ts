import "@testing-library/jest-dom";
import { beforeEach, vi } from "vitest";

beforeEach(() => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: async () => [
        {
          id: 1,
          name: "Chocolate Bar",
          category: "Chocolate",
          price: 10,
          quantity: 5,
        },
      ],
    } as Response)
  );
});
