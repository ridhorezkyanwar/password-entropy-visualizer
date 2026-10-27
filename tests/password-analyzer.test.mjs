import assert from "node:assert/strict";
import test from "node:test";

import { analyzePassword } from "../app/lib/passwordAnalyzer.ts";

test("empty input returns the safe empty-state analysis", () => {
  const result = analyzePassword("");
  assert.equal(result.entropy, 0);
  assert.equal(result.charsetSize, 0);
  assert.equal(result.strength, "weak");
  assert.equal(result.crackTime, "-");
});

test("entropy reflects detected ASCII character sets and password length", () => {
  const result = analyzePassword("abcd");
  assert.equal(result.charsetSize, 26);
  assert.ok(Math.abs(result.entropy - 4 * Math.log2(26)) < 1e-10);
  assert.deepEqual(result.characterSets, ["Lowercase (a-z)"]);
});

test("detects uppercase, numbers, and symbols without sending input remotely", () => {
  const result = analyzePassword("A9!");
  assert.equal(result.charsetSize, 26 + 10 + 33);
  assert.ok(result.characterSets.includes("Uppercase (A-Z)"));
  assert.ok(result.characterSets.includes("Numbers (0-9)"));
  assert.ok(result.characterSets.includes("Symbols (!@#$...)"));
});

test("flags repeated characters, sequences, and common password fragments", () => {
  const result = analyzePassword("Password123!!!");
  assert.equal(result.patterns.hasRepeating, true);
  assert.equal(result.patterns.hasSequence, true);
  assert.equal(result.patterns.hasCommonPattern, true);
  assert.ok(result.suggestions.some((s) => s.includes("berulang")));
  assert.ok(result.suggestions.some((s) => s.includes("kata umum")));
});

test("longer input is not assigned less entropy when the character set is unchanged", () => {
  const short = analyzePassword("abcdef");
  const longer = analyzePassword("abcdefgh");
  assert.ok(longer.entropy > short.entropy);
});
