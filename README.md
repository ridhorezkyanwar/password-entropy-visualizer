# 🔐 Password Entropy Visualizer

A real-time password strength analyzer that uses **information theory** (entropy calculation) instead of simple rule-based checks. Calculates crack time based on modern attack scenarios.

🌐 **Live:** [password-entropy-visualizer.vercel.app](https://password-entropy-visualizer.vercel.app)

![Demo](./screenshot.png)

## ✨ Features

- 🧮 **Real-time Entropy Calculation** - Uses formula: `Entropy = L × log₂(R)`
- ⚡ **Crack Time Estimation** - Based on 10 billion hashes/second attack scenario
- 🔍 **Pattern Detection** - Identifies weak patterns:
  - Repeating characters (aaa, 111)
  - Sequential patterns (123, abc)
  - Common passwords (password, admin)
- 💡 **Actionable Recommendations** - Specific suggestions to improve password strength
- 🎨 **Beautiful UI** - Smooth animations with Motion + Lucide icons

## 🛠️ Tech Stack (2026 Edition)

| Layer      | Technology              |
| ---------- | ----------------------- |
| Framework  | Next.js 16 (App Router) |
| Language   | TypeScript              |
| Styling    | Tailwind CSS v4         |
| Icons      | **Lucide React**        |
| Animation  | **Motion**              |
| Deployment | Vercel                  |

## 📊 How It Works

### Character Set Sizes

| Character Set         | Size (R) | Examples            |
| --------------------- | -------- | ------------------- |
| Lowercase only        | 26       | `a-z`               |
| Lowercase + Uppercase | 52       | `a-z, A-Z`          |
| + Numbers             | 62       | `a-z, A-Z, 0-9`     |
| + Symbols             | 95       | All printable ASCII |

### Strength Levels

| Entropy    | Strength       | Typical Crack Time |
| ---------- | -------------- | ------------------ |
| < 40 bits  | 😰 Weak        | Instant - minutes  |
| 40-60 bits | 😐 Fair        | Hours - days       |
| 60-80 bits | 💪 Strong      | Years              |
| 80+ bits   | 🛡️ Very Strong | Centuries+         |

## 🚀 Getting Started

```bash
# Clone repository
git clone https://github.com/ridhorezkyanwar/password-entropy-visualizer.git
cd password-entropy-visualizer

# Install dependencies
npm install

# Run development server
npm run dev

### Entropy Formula
```
