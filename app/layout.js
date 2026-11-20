import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import { TransitionProvider } from "./context/TransitionContext";
import { ContactModalProvider } from "./context/ContactModalContext";
import { getSiteConfig } from "@/lib/api";

const SITE_URL = "https://njtechstudio.in";

export async function generateMetadata() {
  const config = (await getSiteConfig()) || {};
  const siteName = config.brand_name || "NJTechStudio";
  const title = config.meta_title || "NJTechStudio | AI Automation & Web Development";
  const description = config.meta_description || "Professional web development, AI automation, and custom full-stack solutions.";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    manifest: "/site.webmanifest",
    openGraph: {
      type: "website",
      url: SITE_URL,
      siteName,
      title,
      description,
      images: [{ url: "/icon.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/icon.png"],
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

import SmoothScrolling from "./components/SmoothScrolling";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:wght@300;400;500;600;700&family=Jersey+10&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <SmoothScrolling>
          <ContactModalProvider>
            <TransitionProvider>
              <div className="min-h-screen w-full flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </TransitionProvider>
          </ContactModalProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
