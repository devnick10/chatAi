"use client";
import { ThemeProvider } from "@/components/them-provider";
import { Toaster } from "@/components/ui/sooner";
import StoreProvider from "./storeProvider";
import Script from "next/script";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster position="top-center" />
                <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </ThemeProvider>
    </StoreProvider>
  );
}
