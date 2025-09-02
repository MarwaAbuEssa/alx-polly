import { MainNav } from '@/components/layout/main-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-green-500">
      <MainNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}