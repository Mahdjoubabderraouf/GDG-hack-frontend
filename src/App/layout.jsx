import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./sidebar";
import { Header } from "./Header";
import { createContext } from "react";
import { Outlet } from "react-router-dom";

export const SideBarGeneralLinks = createContext();

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
        <div className="py-0.5 rounded-xl bg-second mx-3"></div>
        <div className="pl-16 py-5 pr-3">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
