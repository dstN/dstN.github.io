import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "dstN. | Frontend Developer",
  description:
    "Portfolio of dstN — Frontend Developer from Hamburg. Building clean, performant, and accessible web experiences.",
  metadataBase: new URL("https://dstn.github.io"),
  openGraph: {
    title: "dstN. | Frontend Developer",
    description:
      "Frontend Developer from Hamburg. Building clean, performant, and accessible web experiences.",
    url: "https://dstn.github.io",
    siteName: "dstN Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "dstN. | Frontend Developer",
    description:
      "Frontend Developer from Hamburg. Clean code, modern web.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "apple-mobile-web-app-title": "dstN",
  },
}

export const viewport: Viewport = {
  themeColor: "#111111",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
