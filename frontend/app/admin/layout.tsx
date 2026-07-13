import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <div className="pt-24 flex min-h-screen">
        <AdminSidebar />

        <main className="flex-1 p-10 bg-gray-50 dark:bg-neutral-950">
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
}