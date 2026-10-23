# Password Entropy Visualizer

> An educational, browser-based view of password-strength estimates and their assumptions.

<p>
  <a href="https://password-entropy-visualizer.vercel.app/"><img src="https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel" alt="Live demo" /></a>
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

These are the lint and production-build scripts currently defined in `package.json`. No dedicated automated test script is currently defined there.

## Important limitations and privacy

The entropy figure is an estimate, not a guarantee of real-world password strength. It assumes a character set and a level of randomness that human-chosen passwords often do not meet. Actual cracking time depends on the password-hashing algorithm, attack strategy, hardware, and rate limits; the displayed reference rate is illustrative, not a prediction of a specific attack.

The current analysis component calculates results in the browser and does not call an application API to submit the typed password. Still, use a sample password for demonstrations rather than a password you use for a real account.
