import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BackToTerminal } from "@/components/features/BackToTerminal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Pharande | Full Stack Developer & Computer Engineering Student",
  description: "Personal developer portfolio of Aditya Pharande, building reliable software systems and developer tools with React, Spring Boot, Node.js, and Java/C++.",
  keywords: ["Aditya Pharande", "Full Stack Developer", "Computer Engineering Student", "Software Engineer", "Portfolio", "Java", "Next.js", "Spring Boot"],
  authors: [{ name: "Aditya Pharande" }],
  creator: "Aditya Pharande",
  metadataBase: new URL("https://adityapharande.dev"), // Default placeholder domain, change if needed
  openGraph: {
    title: "Aditya Pharande | Full Stack Developer",
    description: "Personal portfolio of Aditya Pharande, building reliable software systems and developer tools.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Pharande | Full Stack Developer",
    description: "Personal portfolio of Aditya Pharande, building reliable software systems and developer tools.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-background text-foreground font-sans flex flex-col antialiased">
        {children}
        <BackToTerminal />
      </body>
    </html>
  );
}
