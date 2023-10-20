import { SidebarNav } from "@/components/dashboard/sidebar-nav";

const sidebarNavItems = [
  {
    title: "My Courses",
    href: "/dashboard",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 px-24">
      <aside className="-mx-4 lg:w-1/5">
        <SidebarNav items={sidebarNavItems} />
      </aside>
      {children}
    </div>
  );
}
