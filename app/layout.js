import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import Preloader from "./components/Preloader";
import { TransitionProvider } from "./context/TransitionContext";

const SITE_URL = "https://njtechstudio.in";
const SITE_TITLE = "NJ Tech Studio";
const SITE_DESCRIPTION = "Professional web development and design services";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
    apple: "/Logo.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/Logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/Logo.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:wght@300;400;500;600;700&family=Jersey+10&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Preloader />
        <TransitionProvider>
          <div className="min-h-screen w-full flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </TransitionProvider>
      </body>
    </html>
  );
}
