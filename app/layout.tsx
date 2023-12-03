import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuthProvider from "@/Context/AuthProvider";
import LoaderProvider from "@/Context/LoaderProvider";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="
          Modern T-shirt and Hoodies for your everyday style.
        "
        />
        <meta name="keywords" content="men-style" />
        <meta name="author" content="Gaurav Sah" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
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
