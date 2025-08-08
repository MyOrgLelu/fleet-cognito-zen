import { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Pencil, Trash } from "lucide-react";
import { SeoHead } from "@/components/Seo";

interface RouteRow {
  id: string;
  name: string;
  status: "Active" | "Paused" | "Draft";
  driver: string;
  vehicle: string;
  employees: number;
}

const initialData: RouteRow[] = [
  { id: "r1", name: "Route 7 - Downtown", status: "Active", driver: "Maria Lopez", vehicle: "TRK-102", employees: 24 },
  { id: "r2", name: "Airport Shuttle", status: "Paused", driver: "James Carter", vehicle: "BUS-45", employees: 40 },
  { id: "r3", name: "Warehouse Loop", status: "Active", driver: "Aiko Tanaka", vehicle: "VAN-214", employees: 12 },
  { id: "r4", name: "University Express", status: "Draft", driver: "Liam O'Neil", vehicle: "MINI-08", employees: 15 },
  { id: "r5", name: "Harbor Line", status: "Active", driver: "Sara Khan", vehicle: "TRK-334", employees: 20 },
];

export default function RoutesPage() {
  const [query, setQuery] = useState("");

  const data = useMemo(() => {
    const q = query.toLowerCase();
    return initialData.filter((r) =>
      [r.name, r.status, r.driver, r.vehicle].some((v) => v.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <>
      <SeoHead
        title="Route Management | Fleet Routes"
        description="Manage routes with a data-dense table including drivers, vehicles, employee counts, and actions."
        canonical={window.location.href}
      />
      <DashboardLayout>
        <section className="space-y-4 animate-enter">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1">
              <Input
                placeholder="Search routes, drivers, vehicles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search routes"
              />
            </div>
            <Button variant="login" className="sm:w-auto">+ Create New Route</Button>
          </div>

          <Card className="bg-card/80 border-border/60 shadow-subtle">
            <CardHeader className="pb-2">
              <h1 className="text-base font-semibold">All Routes</h1>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Route Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead className="text-right">Employee Count</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="whitespace-nowrap">{r.name}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground">
                            {r.status}
                          </span>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{r.driver}</TableCell>
                        <TableCell className="whitespace-nowrap">{r.vehicle}</TableCell>
                        <TableCell className="text-right tabular-nums">{r.employees}</TableCell>
                        <TableCell className="text-right">
                          <div className="inline-flex items-center gap-2 text-muted-foreground">
                            <button className="hover:text-foreground" aria-label={`View ${r.name}`}><Eye className="h-4 w-4"/></button>
                            <button className="hover:text-foreground" aria-label={`Edit ${r.name}`}><Pencil className="h-4 w-4"/></button>
                            <button className="hover:text-destructive" aria-label={`Delete ${r.name}`}><Trash className="h-4 w-4"/></button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>
      </DashboardLayout>
    </>
  );
}
