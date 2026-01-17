import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import Preloader from "./components/Preloader";

export const metadata = {
  title: "NJ Tech Studio",
  description: "Professional web development and design services",
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
        <div className="min-h-screen w-full flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
