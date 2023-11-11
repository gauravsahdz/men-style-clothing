import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/Context/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Nav />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
