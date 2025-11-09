"use client";

import { Provider } from "react-redux";
import { store } from "@/redux";
import { ThemeProvider } from "@/components/them-provider";
import { Toaster } from "@/components/ui/sooner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster position="top-center" />
      </ThemeProvider>
    </Provider>
  );
}
