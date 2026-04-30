import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import StoreProvider from "@/providers/StoreProvider";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Cart System",
  description:
    "Mini Cart System, A simple cart system using Redux Toolkit and Next.js",
  keywords: [
    "cart",
    "redux",
    "nextjs",
    "mini cart system",
    "crud",
    "redux toolkit",
    "nextjs 14",
    "react",
    "reactjs",
    "react-redux",
    "react-redux-toolkit",
    "react-redux-toolkit-nextjs",
    "react-redux-toolkit-nextjs-14",
    "react-redux-toolkit-nextjs-14-crud",
    "react-redux-toolkit-nextjs-14-crud-cart",
    "react-redux-toolkit-nextjs-14-crud-cart-system",
  ],
};

import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StoreProvider>
            <Navbar />
            <div className="flex-1 min-h-0 flex flex-col">{children}</div>
            <Footer />
            <CartDrawer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "var(--background)",
                  color: "var(--foreground)",
                },
              }}
            />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
