import { test, expect } from "vitest";
import { add } from "../src/js/add";

test("adds 1 + 2, equals 3", () => {
  const sum = add(1, 2);
  expect(sum).toBe(3);
});
