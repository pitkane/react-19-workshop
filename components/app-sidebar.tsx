"use client";

import type * as React from "react";
import { usePathname } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// Navigation data
const navigation = {
  main: [
    {
      title: "Home",
      url: "/",
      items: [],
    },
    {
      title: "Presentation",
      url: "/presentation",
      items: [
        {
          title: "Introduction",
          url: "/presentation#introduction",
        },
        {
          title: "React 19 Recap",
          url: "/presentation#react18",
        },
        {
          title: "React 19 Server Components",
          url: "/presentation#rsc",
        },
        {
          title: "React 19 Directives",
          url: "/presentation#directives",
        },
        {
          title: "React 19 Server Actions",
          url: "/presentation#actions",
        },
        {
          title: "React 19 New Hooks",
          url: "/presentation#hooks",
        },
        {
          title: "React 19 Compiler",
          url: "/presentation#compiler",
        },
        {
          title: "Other React 19 Features",
          url: "/presentation#features",
        },
        {
          title: "Summary",
          url: "/presentation#summary",
        },
      ],
    },
    {
      title: "Workshop Tasks",
      url: "/tasks",
      items: [
        {
          title: "Task 1: Server Components",
          url: "/tasks/1",
        },
        {
          title: "Task 2: Client Components",
          url: "/tasks/2",
        },
        {
          title: "Task 3: Server Actions",
          url: "/tasks/3",
        },
        {
          title: "Task 4: Optimistic UI",
          url: "/tasks/4",
        },
        {
          title: "Task 5: React Compiler",
          url: "/tasks/5",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  // Check if a URL is active
  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }

    // For hash links, check if the pathname matches the base URL
    if (url.includes("#")) {
      const baseUrl = url.split("#")[0];
      return pathname === baseUrl || pathname.startsWith(`${baseUrl}/`);
    }

    return pathname === url || pathname.startsWith(`${url}/`);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">React 19</span>
                  <span className="">Workshop</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <a href={item.url} className="font-medium">
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length > 0 && (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={isActive(subItem.url)}>
                            <a href={subItem.url}>{subItem.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
