import type { Metadata } from "next";
import { Karla } from "next/font/google";
import ReduxProvider from "@/redux/provider";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { ToastContainer, Slide } from "react-toastify";
import NextProgressBar from "@/components/NextProgressBar";

import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

const karla = Karla({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Lanie Dashboard",
  description: "Lanie Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={karla.className}>
        <ReduxProvider>
          <ThemeProvider
            themes={['light', 'dark']}
            enableSystem
            defaultTheme="light"
            disableTransitionOnChange>
            <main>
              <NextProgressBar>
                {children}
              </NextProgressBar>
            </main>
            <ToastContainer
              position="top-right"
              autoClose={1500}
              style={{ zIndex: 9999999 }}
              limit={5}
              transition={Slide}
            />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
