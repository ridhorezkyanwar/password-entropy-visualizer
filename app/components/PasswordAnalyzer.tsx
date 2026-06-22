"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Zap,
  Gauge,
  Binary,
  Fingerprint,
} from "lucide-react";
import { analyzePassword, type PasswordStrength } from "@/app/lib/passwordAnalyzer";

const strengthConfig: Record<PasswordStrength, { color: string; label: string; emoji: string }> = {
  weak: { color: "from-red-500 to-red-600", label: "WEAK", emoji: "😰" },
  fair: { color: "from-yellow-500 to-orange-500", label: "FAIR", emoji: "😐" },
  strong: { color: "from-green-500 to-emerald-500", label: "STRONG", emoji: "💪" },
  "very-strong": { color: "from-blue-500 to-purple-500", label: "VERY STRONG", emoji: "🛡️" },
};

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const analysis = analyzePassword(password);
  const config = strengthConfig[analysis.strength];

  return (
    <section className="min-h-screen py-24 px-6 bg-linear-to-b from-black via-gray-950 to-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Powered by Information Theory</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Password Entropy{" "}
            <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Visualizer
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Hitung kekuatan password menggunakan matematika, bukan tebakan
          </p>
        </motion.div>

        {/* Input dengan Lock Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-8"
        >
          <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ketik password untuk dianalisis..."
            className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-14 pr-14 py-5 text-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            autoFocus
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-2"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
          </button>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {password && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Strength Card */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className={`p-8 rounded-2xl border border-gray-800 bg-gradient-to-br ${config.color} bg-opacity-10`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300 text-lg">Password Strength</span>
                  <span className="text-4xl">{config.emoji}</span>
                </div>
                <div className={`text-4xl md:text-5xl font-bold bg-linear-to-r ${config.color} bg-clip-text text-transparent mb-4`}>
                  {config.label}
                </div>
                <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((analysis.entropy / 128) * 100, 100)}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`h-full bg-linear-to-r ${config.color}`}
                  />
                </div>
              </motion.div>

              {/* Stats Grid dengan Lucide Icons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  icon={<Binary className="w-5 h-5" />}
                  label="Entropy"
                  value={`${analysis.entropy.toFixed(1)}`}
                  unit="bits"
                />
                <StatCard
                  icon={<Zap className="w-5 h-5" />}
                  label="Crack Time"
                  value={analysis.crackTime}
                  unit="@ 10B/s"
                  highlight
                />
                <StatCard
                  icon={<Gauge className="w-5 h-5" />}
                  label="Length"
                  value={`${password.length}`}
                  unit="chars"
                />
                <StatCard
                  icon={<Fingerprint className="w-5 h-5" />}
                  label="Charset"
                  value={`${analysis.charsetSize}`}
                  unit="symbols"
                />
              </div>

              {/* Character Sets */}
              <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                  Character Sets Detected
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.characterSets.map((set) => (
                    <motion.span
                      key={set}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg text-sm text-green-300"
                    >
                      ✓ {set}
                    </motion.span>
                  ))}
                  {analysis.characterSets.length === 0 && (
                    <span className="text-gray-500 text-sm">Belum ada karakter</span>
                  )}
                </div>
              </div>

              {/* Warnings */}
              {(analysis.patterns.hasRepeating || analysis.patterns.hasSequence || analysis.patterns.hasCommonPattern) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl"
                >
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-red-300">
                    <AlertTriangle className="w-5 h-5" />
                    Weak Patterns Detected
                  </h3>
                  <ul className="space-y-2 text-red-200 text-sm">
                    {analysis.patterns.hasCommonPattern && <li>• Mengandung kata umum yang mudah ditebak</li>}
                    {analysis.patterns.hasRepeating && <li>• Karakter berulang terdeteksi (contoh: aaa, 111)</li>}
                    {analysis.patterns.hasSequence && <li>• Urutan berurutan terdeteksi (contoh: 123, abc)</li>}
                  </ul>
                </motion.div>
              )}

              {/* Suggestions */}
              {analysis.suggestions.length > 0 && (
                <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-yellow-300">
                    <Lightbulb className="w-5 h-5" />
                    Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {analysis.suggestions.map((suggestion, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2 text-gray-300 text-sm"
                      >
                        <span className="text-yellow-400 mt-0.5">→</span>
                        <span>{suggestion}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Helper component dengan Lucide icon
function StatCard({
  icon,
  label,
  value,
  unit,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-5 rounded-xl border ${
        highlight
          ? "bg-purple-500/10 border-purple-500/30"
          : "bg-gray-900/50 border-gray-800"
      }`}
    >
      <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-2">
        {icon}
        {label}
      </div>
      <div className={`text-2xl font-bold truncate ${highlight ? "text-purple-300" : "text-white"}`}>
        {value}
      </div>
      <div className="text-gray-500 text-xs mt-1">{unit}</div>
    </motion.div>
  );
}