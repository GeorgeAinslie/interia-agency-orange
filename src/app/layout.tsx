import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { defaultDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

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

/** Alliance No.1 — Light (300) for header nav; Semibold (600) elsewhere. */
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
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName}, Lead generation for business growth`,
    template: `%s · ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "lead generation agency",
    "B2B lead gen",
    "landing page design",
    "conversion funnel",
    "Meta ads creative",
    "unlimited design subscription",
    "funnel development",
    "performance marketing creative",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName,
    title: `${siteName}, Lead generation for business growth`,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName}, Lead generation for business growth`,
    description: defaultDescription,
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
    icon: "/assets/favicon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteName,
  description: defaultDescription,
  url: siteUrl,
  serviceType: [
    "Lead generation",
    "Landing page design",
    "Web development",
    "Performance marketing creative",
  ],
  areaServed: "Worldwide",
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
        <div className="page-shell">{children}</div>
      </body>
    </html>
  );
}
