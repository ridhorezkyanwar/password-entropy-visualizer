import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Password Entropy Visualizer | Ridho Rezky Anwar",
  description: "Calculate password strength using information theory. Real-time analysis with crack time estimation. Built by Ridho Rezky Anwar.",
  keywords: ["password", "entropy", "security", "cybersecurity", "strength checker"],
  authors: [{ name: "Ridho Rezky Anwar" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}