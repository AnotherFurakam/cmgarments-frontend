import SidebarProvider from "@/components/SidebarContext";
import "@/styles/sidebar.css";
import "@/styles/navbar.css";
import "@/styles/global.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider>
      <Component {...pageProps} />
    </SidebarProvider>
  );
}
