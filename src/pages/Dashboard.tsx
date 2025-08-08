import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, Route, Users, Truck } from "lucide-react";
import { SeoHead } from "@/components/Seo";

function KpiCard({ title, value, icon: Icon }: { title: string; value: string; icon: React.ElementType }) {
  return (
    <Card className="bg-card/80 border-border/60 hover-scale shadow-subtle">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
      </CardContent>
    </Card>
  );
}

function LiveRouteMapMock() {
  return (
    <Card className="bg-card/80 border-border/60 shadow-subtle">
      <CardHeader className="pb-2"><span className="text-sm text-muted-foreground">Live Route Map</span></CardHeader>
      <CardContent>
        <div className="relative h-80 rounded-lg overflow-hidden bg-secondary">
          <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {/* vehicle pings */}
          <div className="absolute left-1/3 top-1/4">
            <span className="block h-2 w-2 rounded-full bg-primary shadow-primary animate-pulse" />
          </div>
          <div className="absolute left-2/3 top-1/2">
            <span className="block h-2 w-2 rounded-full bg-primary shadow-primary animate-pulse" />
          </div>
          <div className="absolute left-1/5 top-2/3">
            <span className="block h-2 w-2 rounded-full bg-primary shadow-primary animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RecentActivity() {
  const items = [
    { id: 1, text: "Vehicle TRK-102 departed Depot A", time: "2m ago" },
    { id: 2, text: "Route 7 completed on time", time: "12m ago" },
    { id: 3, text: "Driver Maria L. checked in", time: "25m ago" },
    { id: 4, text: "Vehicle VAN-214 scheduled for maintenance", time: "1h ago" },
  ];
  return (
    <Card className="bg-card/80 border-border/60 shadow-subtle">
      <CardHeader className="pb-2"><span className="text-sm text-muted-foreground">Recent Activity</span></CardHeader>
      <CardContent>
        <ol className="relative border-l border-border/60 ml-3 space-y-6">
          {items.map((item) => (
            <li key={item.id} className="ml-4">
              <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-primary shadow-primary" />
              <p className="text-sm">{item.text}</p>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <>
      <SeoHead
        title="Fleet Dashboard | Fleet Management KPIs"
        description="Monitor active routes, vehicles, employees, and on-time performance with a real-time fleet dashboard."
        canonical={window.location.href}
      />
      <DashboardLayout>
        {/* KPI cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 animate-enter">
          <KpiCard title="Active Routes" value="24" icon={Route} />
          <KpiCard title="Available Vehicles" value="132" icon={Truck} />
          <KpiCard title="Total Employees" value="328" icon={Users} />
          <KpiCard title="On-Time Percentage" value="96%" icon={TrendingUp} />
        </section>

        {/* Main content split */}
        <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-in">
          <div className="lg:col-span-2">
            <LiveRouteMapMock />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </section>
      </DashboardLayout>
    </>
  );
}
