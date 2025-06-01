"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbSegment {
  href: string;
  label: string;
  isLast: boolean;
}

// Define custom labels for specific routes
const routeLabels: Record<string, string> = {
  "/": "React 19 Workshop",
  "/tasks": "Workshop Tasks",
  "/tasks/1": "Task 1: Server Components",
  "/tasks/2": "Task 2: Client Components",
  "/tasks/3": "Task 3: Server Actions",
  "/tasks/4": "Task 4: React 19 Improvements",
  "/tasks/5": "Task 5: React Compiler",
  "/tasks/1/work": "Work Area",
  "/tasks/1/solution": "Solution",
  "/tasks/2/work": "Work Area",
  "/tasks/2/solution": "Solution",
  "/tasks/3/work": "Work Area",
  "/tasks/3/solution": "Solution",
  "/tasks/4/work": "Work Area",
  "/tasks/4/solution": "Solution",
  "/tasks/5/work": "Work Area",
  "/tasks/5/solution": "Solution",
  "/presentation": "Presentation",
  "/dashboard": "Dashboard",
};

function generateBreadcrumbs(pathname: string): BreadcrumbSegment[] {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbSegment[] = [];

  // Always add home
  breadcrumbs.push({
    href: "/",
    label: routeLabels["/"] || "Home",
    isLast: pathname === "/",
  });

  // Build up path progressively
  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    // Get custom label or format the segment
    const label = routeLabels[currentPath] || formatSegment(segment);

    breadcrumbs.push({
      href: currentPath,
      label,
      isLast,
    });
  });

  return breadcrumbs;
}

function formatSegment(segment: string): string {
  // Convert slug to title case
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.href} className="flex items-center">
            {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
              {breadcrumb.isLast ? (
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
