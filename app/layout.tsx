import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuthProvider from "@/Context/AuthProvider";
import LoaderProvider from "@/Context/LoaderProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider session={null}>
          <LoaderProvider>
            <Nav />
            {children}
            <Footer />
          </LoaderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
