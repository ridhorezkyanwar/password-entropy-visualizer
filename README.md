# Password Entropy Visualizer

A browser-based password estimator that displays an entropy estimate, a strength category, character-set information, pattern warnings, recommendations, and an illustrative cracking-time estimate.

**Demo:** [password-entropy-visualizer.vercel.app](https://password-entropy-visualizer.vercel.app/)

## Features

- Calculates a simplified entropy estimate from password length and detected character-set size.
- Estimates cracking time using a fixed reference rate of 10 billion guesses per second.
- Flags repeated characters, selected sequential patterns, and common password fragments.
- Suggests ways to improve a password, such as increasing length and avoiding predictable patterns.
- Lets users toggle password visibility while testing.

## Technology

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Motion
- Lucide React

## Run locally

Install Node.js and npm, then run:

```bash
git clone https://github.com/ridhorezkyanwar/password-entropy-visualizer.git
cd password-entropy-visualizer
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful commands

```bash
npm run lint
npm run build
```

These commands use the scripts defined in `package.json`; whether they pass depends on the local environment and current code.

## Important limitations

This is an educational estimate, not a guarantee of real-world password strength. The formula assumes characters are selected from the detected character set in a way that can be modelled as random; manually chosen passwords often have less entropy than the estimate suggests. Actual cracking time varies with the hashing algorithm, attack method, hardware, and rate limits.

The current analyzer runs in the browser component and does not send the entered password to an application API. For demonstrations, use a sample password rather than a password you use for a real account.
