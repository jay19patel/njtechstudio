import { Fraunces, IBM_Plex_Sans_Condensed } from "next/font/google";
import "./globals.css";
import DashedGrid from "./components/DashedGrid";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const ibmPlexSansCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-ibm-plex-sans-condensed",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "NJ Tech Studio",
  description: "Professional web development and design services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${ibmPlexSansCondensed.variable} antialiased`}
      >
        <div 
          className="min-h-screen w-full relative flex flex-col"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(139, 92, 246, 0.08) 0%, transparent 30%),
              linear-gradient(to left, rgba(139, 92, 246, 0.08) 0%, transparent 30%)
            `,
          }}
        >
          <DashedGrid />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
