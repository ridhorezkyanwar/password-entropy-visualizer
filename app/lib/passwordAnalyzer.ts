export type PasswordStrength = "weak" | "fair" | "strong" | "very-strong";

export type PasswordAnalysis = {
  entropy: number;
  crackTime: string;
  strength: PasswordStrength;
  characterSets: string[];
  charsetSize: number;
  suggestions: string[];
  patterns: {
    hasRepeating: boolean;
    hasSequence: boolean;
    hasCommonPattern: boolean;
  };
};

export function analyzePassword(password: string): PasswordAnalysis {
  if (!password) {
    return {
      entropy: 0,
      crackTime: "-",
      strength: "weak",
      characterSets: [],
      charsetSize: 0,
      suggestions: ["Mulai ketik password untuk analisis"],
      patterns: { hasRepeating: false, hasSequence: false, hasCommonPattern: false },
    };
  }

  // 1. Hitung Character Set Size
  let charsetSize = 0;
  const characterSets: string[] = [];

  if (/[a-z]/.test(password)) {
    charsetSize += 26;
    characterSets.push("Lowercase (a-z)");
  }
  if (/[A-Z]/.test(password)) {
    charsetSize += 26;
    characterSets.push("Uppercase (A-Z)");
  }
  if (/[0-9]/.test(password)) {
    charsetSize += 10;
    characterSets.push("Numbers (0-9)");
  }
  if (/[^a-zA-Z0-9]/.test(password)) {
    charsetSize += 33;
    characterSets.push("Symbols (!@#$...)");
  }

  // 2. Hitung Entropy: L × log₂(R)
  const entropy = password.length * Math.log2(charsetSize || 1);

  // 3. Deteksi Pola Buruk
  const hasRepeating = /(.)\1{2,}/.test(password);
  const hasSequence = /(?:012|123|234|345|456|567|678|789|abc|bcd|cde|def|xyz)/i.test(password);
  const commonPasswords = [
    "password", "123456", "qwerty", "admin", "letmein",
    "welcome", "monkey", "dragon", "master", "login"
  ];
  const hasCommonPattern = commonPasswords.some(p =>
    password.toLowerCase().includes(p)
  );

  // 4. Estimasi Crack Time (10 billion hashes/sec)
  const hashesPerSecond = 10_000_000_000;
  const combinations = Math.pow(2, entropy);
  const secondsToCrack = combinations / hashesPerSecond;
  const crackTime = formatCrackTime(secondsToCrack);

  // 5. Tentukan Strength Level
  let strength: PasswordStrength;
  if (entropy < 40) strength = "weak";
  else if (entropy < 60) strength = "fair";
  else if (entropy < 80) strength = "strong";
  else strength = "very-strong";

  // 6. Generate Suggestions
  const suggestions: string[] = [];
  if (password.length < 12) suggestions.push("Gunakan minimal 12 karakter");
  if (!/[A-Z]/.test(password)) suggestions.push("Tambahkan huruf kapital (A-Z)");
  if (!/[0-9]/.test(password)) suggestions.push("Tambahkan angka (0-9)");
  if (!/[^a-zA-Z0-9]/.test(password)) suggestions.push("Tambahkan simbol (!@#$%^&)");
  if (hasRepeating) suggestions.push("Hindari karakter berulang (aaa, 111)");
  if (hasSequence) suggestions.push("Hindari urutan berurutan (123, abc)");
  if (hasCommonPattern) suggestions.push("⚠️ Hindari kata umum (password, admin)");

  return {
    entropy,
    crackTime,
    strength,
    characterSets,
    charsetSize,
    suggestions,
    patterns: { hasRepeating, hasSequence, hasCommonPattern },
  };
}

function formatCrackTime(seconds: number): string {
  if (seconds < 0.001) return "Instant ⚡";
  if (seconds < 1) return `${Math.round(seconds * 1000)} ms`;
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000 * 1000) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 31536000 * 1e6) return `${Math.round(seconds / 31536000 / 1000)}K years`;
  if (seconds < 31536000 * 1e9) return `${Math.round(seconds / 31536000 / 1e6)}M years`;
  return "∞ Centuries+";
}