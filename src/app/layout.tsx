import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FunSwap | Swap Crypto Tokens Instantly",
  description:
    "Easily swap crypto tokens and monitor real-time prices. Fast, secure, and decentralized token swaps for DeFi users.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const domain = process.env.HOSTING_DOMAIN;
  return (
    <html lang="en">
      <head>
        {/* Primary Meta Tags */}
        <title>Swap Crypto Tokens Instantly | Real-Time Prices</title>
        <meta
          name="title"
          content="Swap Crypto Tokens Instantly | Real-Time Prices"
        />
        <meta
          name="description"
          content="Easily swap crypto tokens and monitor real-time prices. Fast, secure, and decentralized token swaps for DeFi users."
        />
        <meta
          name="keywords"
          content="crypto swap, token swap, real-time crypto prices, DeFi, decentralized exchange, crypto trading, DEX, token exchange"
        />
        <meta name="author" content="Ashraf Omar" />
        <meta name="robots" content="index, follow" />

        {/* Basic Meta Tags */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1, maximum-scale=5"></meta>

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${domain}`} />
        <meta
          property="og:title"
          content="Swap Crypto Tokens Instantly | Real-Time Prices"
        />
        <meta
          property="og:description"
          content="Swap crypto tokens with real-time price tracking. Fast, secure, and easy-to-use decentralized platform."
        />
        <meta property="og:image" content={`${domain}/images/og-image.png`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${domain}/`} />
        <meta
          name="twitter:title"
          content="Swap Crypto Tokens Instantly | Real-Time Prices"
        />
        <meta
          name="twitter:description"
          content="Easily swap crypto tokens and monitor live prices. Fast and secure token swapping for DeFi users."
        />
        <meta
          name="twitter:image"
          content={`${domain}/images/twitter-image.png`}
        />

        {/* Favicons */}
        <link
          rel="icon"
          type="image/png"
          href="/icons/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/icons/favicon/favicon.svg"
        />
        <link rel="shortcut icon" href="/icons/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/icons/favicon/site.webmanifest" />
        <link rel="canonical" href={`${domain}/`} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
