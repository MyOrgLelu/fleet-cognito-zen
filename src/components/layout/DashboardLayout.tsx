import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar, DashboardContainer } from "@/components/AppSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <DashboardContainer>
          <header className="flex items-center h-14 border-b border-border/60 px-3">
            <SidebarTrigger className="mr-2" />
            <h1 className="text-base font-semibold">Admin Dashboard</h1>
          </header>
          <main className="p-6">{children}</main>
        </DashboardContainer>
      </div>
    </SidebarProvider>
  );
}
