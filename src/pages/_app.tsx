import SidebarProvider from "@/components/SidebarContext";
import "@/styles/sidebar.css";
import "@/styles/navbar.css";
import "@/styles/global.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <SidebarProvider>
      <Component {...pageProps} />
    </SidebarProvider>
  );
}
