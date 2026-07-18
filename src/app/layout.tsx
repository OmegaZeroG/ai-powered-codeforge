import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Instrument_Serif } from "next/font/google";
import { SessionProvider } from "@/components/SessionProvider";
import "./globals.css";

// Mono carries the product UI — editor, verdicts, terminal chrome.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// Inter + Instrument Serif are used only by the marketing landing page.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeForge",
  description: "Write, run, and get AI help with your code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}