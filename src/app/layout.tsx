import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { defaultDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";
import "./funnel.css";

const satoshi = localFont({
  src: [
    {
      path: "../fonts/satoshi/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/satoshi/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/satoshi/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/satoshi/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/satoshi/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/satoshi/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const allianceNo1 = localFont({
  src: [
    {
      path: "../fonts/alliance-no1/AllianceNo1-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/alliance-no1/AllianceNo1-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-alliance-no1",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0c0b0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName}, Grow your business faster`,
    template: `%s · ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "Meta ads",
    "Google ads",
    "performance ads",
    "lead generation",
    "no retainer ads",
    "Interia Studios",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName,
    title: `${siteName}, Grow your business faster`,
    description: defaultDescription,
    images: [
      {
        url: "/assets/og.png",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName}, Grow your business faster`,
    description: defaultDescription,
    images: ["/assets/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/assets/interia-icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/assets/apple-touch.png", type: "image/png", sizes: "180x180" }],
    shortcut: "/assets/interia-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteName,
  description: defaultDescription,
  url: siteUrl,
  serviceType: ["Meta ads", "Google ads", "Performance marketing"],
  areaServed: "United Kingdom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${satoshi.variable} ${allianceNo1.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <div className="page-shell">
          <Header />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
