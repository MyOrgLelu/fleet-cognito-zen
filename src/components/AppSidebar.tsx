import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Map, Users, Settings } from "lucide-react";
import fleetLogo from "@/assets/fleet-logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-secondary text-foreground font-medium" : "hover:bg-secondary/60";

  const items = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Routes", url: "/routes", icon: Map },
    { title: "Employees", url: "/employees", icon: Users },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  return (
    <Sidebar className="bg-card/90 backdrop-blur-md border-r border-border/60">
      <SidebarHeader className="px-4 py-3">
        <div className="flex items-center gap-2">
          <img src={fleetLogo} alt="Fleet logo" className="h-7 w-auto" />
          <span className="text-sm font-semibold tracking-wide">Fleet Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function DashboardContainer({ children }: { children: React.ReactNode }) {
  return <SidebarInset className="animate-fade-in">{children}</SidebarInset>;
}
