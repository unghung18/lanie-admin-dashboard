import NextProgressBar from "@/components/NextProgressBar";
import { ThemeProvider } from "@/lib/ThemeProvider";
import ReduxProvider from "@/redux/provider";
import type { Metadata } from "next";
import { Slide, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

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
      <body>
        <ReduxProvider>
          <ThemeProvider
            themes={["light", "dark"]}
            enableSystem
            defaultTheme="light"
            disableTransitionOnChange
          >
            <main>
              <NextProgressBar>{children}</NextProgressBar>
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
