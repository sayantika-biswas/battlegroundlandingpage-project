// app/layout.js
import "./globals.css";
import Header from "@/app/Navbar/page";
import Footer from "@/app/Footer/page";

export const metadata = {
  title: "Landing Page",
  description: "BGMI-style landing page built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <Header /> {/* single source of truth for the nav */}
        <main className="pt-20" id="home">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
