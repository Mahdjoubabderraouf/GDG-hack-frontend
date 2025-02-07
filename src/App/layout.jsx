import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}
