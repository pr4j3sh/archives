import { test, expect } from "vitest";
import { add } from "../index.js";

test("return sum", () => {
  const res = add(1, 2);
  expect(res).toBe(3);
});
