import "./globals.css";
import type { Metadata } from "next";
import { ReduxProvider } from "@/redux/providers/ReduxProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "RTK Query + Next.js App Router",
  description: "Example using RTK Query in App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          <Toaster richColors position="top-center" />
        </ReduxProvider>
      </body>
    </html>
  );
}
