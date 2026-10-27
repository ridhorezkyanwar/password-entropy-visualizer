import assert from "node:assert/strict";
import test from "node:test";

import { analyzePassword } from "../app/lib/passwordAnalyzer.ts";

test("empty input returns the neutral empty-state analysis", () => {
  const result = analyzePassword("");
  assert.equal(result.entropy, 0);
  assert.equal(result.charsetSize, 0);
  assert.equal(result.strength, "weak");
  assert.equal(result.crackTime, "-");
  assert.equal(result.estimationSupported, true);
});

test("entropy uses the selected printable-ASCII character set", () => {
  const result = analyzePassword("abcd");
  assert.equal(result.charsetSize, 26);
  assert.ok(Math.abs(result.entropy - 4 * Math.log2(26)) < 1e-10);
  assert.deepEqual(result.characterSets, ["Lowercase (a-z)"]);
});

test("detects common patterns in ASCII input", () => {
  const result = analyzePassword("Password123!!!");
  assert.equal(result.estimationSupported, true);
  assert.equal(result.patterns.hasRepeating, true);
  assert.equal(result.patterns.hasSequence, true);
  assert.equal(result.patterns.hasCommonPattern, true);
  assert.ok(result.suggestions.some((suggestion) => suggestion.includes("berulang")));
  assert.ok(result.suggestions.some((suggestion) => suggestion.includes("kata umum")));
});

test("does not calculate ASCII entropy for Unicode or emoji passwords", () => {
  const result = analyzePassword("Coffee🔐123");
  assert.equal(result.estimationSupported, false);
  assert.equal(result.strength, "unsupported");
  assert.equal(result.entropy, 0);
  assert.equal(result.charsetSize, 0);
  assert.equal(result.crackTime, "Tidak diestimasi");
  assert.ok(result.suggestions.some((suggestion) => suggestion.includes("ASCII printable")));
});

test("does not calculate entropy for control characters", () => {
  const result = analyzePassword("line1\nline2");
  assert.equal(result.estimationSupported, false);
  assert.equal(result.strength, "unsupported");
  assert.equal(result.crackTime, "Tidak diestimasi");
});

test("longer ASCII input with the same character set gets a larger estimate", () => {
  const short = analyzePassword("abcdef");
  const longer = analyzePassword("abcdefgh");
  assert.ok(longer.entropy > short.entropy);
});
