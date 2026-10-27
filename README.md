# Password Entropy Visualizer

> An educational, browser-based view of password-strength estimates and their assumptions.

<p>
  <a href="https://password-entropy-visualizer-phi.vercel.app/"><img src="https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Motion-FF4154?style=flat-square" alt="Motion" />
</p>

This app estimates password entropy from its length and detected character set, then visualizes a strength category, pattern warnings, suggestions, and an illustrative cracking-time estimate.

## Features

- Estimates entropy in bits using a simplified character-set model.
- Shows the password length and detected character-set size.
- Flags selected repeated, sequential, and common-fragment patterns.
- Suggests improvements such as increasing length and avoiding predictable patterns.
- Lets users toggle password visibility while typing.
- Calculates a sample cracking-time estimate using a fixed reference rate of 10 billion guesses per second.

## Stack

- Next.js App Router and React 19
- TypeScript
- Tailwind CSS 4
- Motion
- Lucide React

## Run locally

Requirements: Node.js 22 or newer and npm.

```bash
git clone https://github.com/ridhorezkyanwar/password-entropy-visualizer.git
cd password-entropy-visualizer
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification commands

```bash
npm run lint
npm run build
```

Run the automated checks with `npm run lint`, `npm test`, `npx tsc --noEmit`, and `npm run build`. The tests cover empty input, ASCII entropy, selected patterns, and unsupported Unicode/control-character inputs.

## Important limitations and privacy

The entropy figure is a simplified estimate, not a guarantee of real-world password strength. It assumes independent, uniformly random printable-ASCII characters; human-chosen passwords often violate that assumption. Inputs containing Unicode or control characters are explicitly marked as unsupported rather than assigned a misleading ASCII estimate. The displayed time is an illustrative expected-average brute-force estimate at a fixed 10-billion-guesses-per-second reference rate, not a prediction for a particular hashing algorithm, hardware, attacker, or account.

The current analysis component calculates results in the browser and does not call an application API to submit the typed password. Still, use a sample password for demonstrations rather than a password you use for a real account.
