import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import IntroductionSection from "./_components/01-introduction-section";
import React18RecapSection from "./_components/02-react18-recap-section";
import RSCSection from "./_components/03-rsc-section";
import DirectivesSection from "./_components/04-directives-section";
import ActionsSection from "./_components/05-actions-section";
import HooksSection from "./_components/06-hooks-section";
import CompilerSection from "./_components/07-compiler-section";
import FeaturesSection from "./_components/08-features-section";
import SummarySection from "./_components/09-summary-section";

export default function PresentationPage() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>React 19 Presentation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>
        <div className=" mx-auto p-6 space-y-12">
          <IntroductionSection />
          <React18RecapSection />
          <RSCSection />
          <DirectivesSection />
          <ActionsSection />
          <HooksSection />
          <CompilerSection />
          <FeaturesSection />
          <SummarySection />
        </div>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
