import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import { getCmsData } from "@/lib/cms";
import { getSiteBackgroundStyle } from "@/lib/siteBackground";
import { getGoogleFontHref, getSiteFontStyle } from "@/lib/siteFont";
import "./globals.css";

const anuphan = Anuphan({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-anuphan",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adsawin",
  description: "เลือกปลั๊กที่ใช่ ลายที่ชอบ",
};

export const dynamic = "force-dynamic";

type BodyStyle = CSSProperties & {
  "--site-font-family"?: string;
  "--site-font-weight"?: string;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const data = await getCmsData();

  const siteFontStyle = getSiteFontStyle(data.siteSettings);
  const googleFontHref = getGoogleFontHref(data.siteSettings.fontFamily);

  const bodyStyle: BodyStyle = {
    ...getSiteBackgroundStyle(data.siteSettings),
    "--site-font-family":
      siteFontStyle.fontFamily ||
      'var(--font-anuphan), "Anuphan", Arial, Helvetica, sans-serif',
    "--site-font-weight": String(siteFontStyle.fontWeight || 400),
  };

  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={googleFontHref} />
      </head>

      <body className={anuphan.variable} style={bodyStyle}>
        {children}
      </body>
    </html>
  );
}
